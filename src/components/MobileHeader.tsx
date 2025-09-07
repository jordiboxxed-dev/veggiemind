import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-4 border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-background" />
        </div>
        <h1 className="text-xl font-bold text-foreground">VeggieMind</h1>
      </Link>
    </header>
  );
};

export default MobileHeader;