import ReactMarkdown from "react-markdown";
import { User, Stethoscope } from "lucide-react";
import type { Message } from "@/lib/chat";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const textContent = typeof message.content === "string"
    ? message.content
    : message.content.filter((c) => c.type === "text").map((c) => (c as { type: "text"; text: string }).text).join("\n");

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary" : "bg-secondary"}`}>
        {isUser ? <User className="w-4 h-4 text-primary-foreground" /> : <Stethoscope className="w-4 h-4 text-secondary-foreground" />}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
        {/* Show uploaded image */}
        {message.imageUrl && (
          <img src={message.imageUrl} alt="Uploaded skin image" className="rounded-lg mb-2 max-w-[280px] max-h-[200px] object-cover" />
        )}
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{textContent}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
            <ReactMarkdown>{textContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
