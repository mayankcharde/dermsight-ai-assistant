import { Stethoscope } from "lucide-react";

export function ThinkingIndicator() {
  return (
    <div className="flex gap-3 animate-in fade-in duration-300">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary">
        <Stethoscope className="w-4 h-4 text-secondary-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
