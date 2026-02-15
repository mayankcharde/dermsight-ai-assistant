import { Plus, MessageSquare, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
  onNewChat: () => void;
}

export function ChatSidebar({ dark, onToggleDark, onNewChat }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-primary flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">D</span>
          DermSight
        </h1>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <Button onClick={onNewChat} variant="outline" className="w-full justify-start gap-2 border-dashed">
          <Plus className="w-4 h-4" /> New Chat
        </Button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3 scrollbar-thin">
        <p className="text-xs text-muted-foreground uppercase tracking-wider px-2 mb-2">History</p>
        {["Skin rash on arm", "Acne treatment tips", "Dry skin remedies"].map((t, i) => (
          <button key={i} className="w-full text-left px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors flex items-center gap-2 mb-1">
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{t}</span>
          </button>
        ))}
      </div>

      {/* Dark mode & Logout */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Button variant="ghost" size="sm" onClick={onToggleDark} className="w-full justify-start gap-2">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {dark ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout} 
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
