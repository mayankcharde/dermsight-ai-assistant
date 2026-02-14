import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { streamChat, type Message } from "@/lib/chat";
import { toast } from "sonner";

const WELCOME = "Hello! I'm **DermSight**, your AI dermatology assistant. Describe your skin concern and I'll provide general guidance.\n\n*Remember: I provide general information only — always consult a certified dermatologist for proper diagnosis.*";

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    let assistantText = "";
    const allMessages = [...messages, userMsg];

    await streamChat({
      messages: allMessages,
      onDelta: (chunk) => {
        assistantText += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last !== allMessages[0]) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
          }
          return [...prev, { role: "assistant", content: assistantText }];
        });
      },
      onDone: () => setLoading(false),
      onError: (err) => {
        toast.error(err);
        setLoading(false);
      },
    });
  }, [input, loading, messages]);

  const newChat = () => {
    setMessages([{ role: "assistant", content: WELCOME }]);
    setInput("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar dark={dark} onToggleDark={() => setDark(!dark)} onNewChat={newChat} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center px-6 bg-card/50 backdrop-blur-sm">
          <Stethoscope className="w-5 h-5 text-primary mr-2" />
          <span className="font-semibold text-foreground">DermSight AI Assistant</span>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          {loading && messages[messages.length - 1]?.role === "user" && <ThinkingIndicator />}
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Describe your skin problem in detail..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[48px] max-h-[120px]"
                style={{ height: "auto", overflow: "auto" }}
              />
              <Button onClick={send} disabled={!input.trim() || loading} size="icon" className="rounded-xl h-12 w-12 bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-2">
              ⚠️ DermSight provides general information only. This is not medical advice. Always consult a certified dermatologist.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
