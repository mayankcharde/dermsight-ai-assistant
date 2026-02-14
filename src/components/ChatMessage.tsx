import ReactMarkdown from "react-markdown";
import { User, Stethoscope } from "lucide-react";
import type { Message } from "@/lib/chat";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary" : "bg-secondary"}`}>
        {isUser ? <User className="w-4 h-4 text-primary-foreground" /> : <Stethoscope className="w-4 h-4 text-secondary-foreground" />}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
