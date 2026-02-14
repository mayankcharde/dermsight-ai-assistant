import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Stethoscope, ImagePlus, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { streamChat, type Message } from "@/lib/chat";
import { downloadReport } from "@/lib/report";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WELCOME = "Hello! I'm **DermSight**, your AI dermatology assistant. Describe your skin concern or **upload an image** of the affected area for analysis.\n\n*Remember: I provide general information only — always consult a certified dermatologist for proper diagnosis.*";

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ file: File; preview: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("skin-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("skin-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if ((!text && !pendingImage) || loading) return;

    setInput("");
    setLoading(true);

    let imageUrl: string | undefined;
    let userContent: Message["content"];

    // Upload image if present
    if (pendingImage) {
      setUploading(true);
      try {
        imageUrl = await uploadImage(pendingImage.file);
      } catch (e) {
        toast.error("Failed to upload image. Please try again.");
        setLoading(false);
        setUploading(false);
        return;
      }
      setUploading(false);

      // Build multimodal content
      const parts: Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }> = [];
      parts.push({ type: "image_url", image_url: { url: imageUrl } });
      parts.push({
        type: "text",
        text: text || "Please analyze this skin image. Identify the condition, provide a detailed diagnosis, treatment recommendations, and prescription suggestions.",
      });
      userContent = parts;
      setPendingImage(null);
    } else {
      userContent = text;
    }

    const userMsg: Message = { role: "user", content: userContent, imageUrl };
    setMessages((prev) => [...prev, userMsg]);

    let assistantText = "";
    const allMessages = [...messages, userMsg];

    await streamChat({
      messages: allMessages,
      onDelta: (chunk) => {
        assistantText += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.content !== WELCOME) {
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
  }, [input, loading, messages, pendingImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    const preview = URL.createObjectURL(file);
    setPendingImage({ file, preview });
    e.target.value = "";
  };

  const newChat = () => {
    setMessages([{ role: "assistant", content: WELCOME }]);
    setInput("");
    setPendingImage(null);
  };

  const hasAssessment = messages.some((m) => m.role === "assistant" && m.content !== WELCOME);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar dark={dark} onToggleDark={() => setDark(!dark)} onNewChat={newChat} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center">
            <Stethoscope className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold text-foreground">DermSight AI Assistant</span>
          </div>
          {hasAssessment && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadReport(messages)}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              Download Report
            </Button>
          )}
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
            {/* Pending image preview */}
            {pendingImage && (
              <div className="mb-3 relative inline-block">
                <img src={pendingImage.preview} alt="Preview" className="h-20 rounded-lg border border-border object-cover" />
                <button
                  onClick={() => { URL.revokeObjectURL(pendingImage.preview); setPendingImage(null); }}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex gap-2 items-end">
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileRef.current?.click()}
                disabled={loading}
                className="rounded-xl h-12 w-12 flex-shrink-0"
                title="Upload skin image"
              >
                <ImagePlus className="w-5 h-5" />
              </Button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={pendingImage ? "Add a description (optional)..." : "Describe your skin problem or upload an image..."}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[48px] max-h-[120px]"
                style={{ height: "auto", overflow: "auto" }}
              />
              <Button
                onClick={send}
                disabled={(!input.trim() && !pendingImage) || loading}
                size="icon"
                className="rounded-xl h-12 w-12 bg-primary hover:bg-primary/90"
              >
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
