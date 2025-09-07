import { Bot } from "lucide-react";

export const KaiaAvatar = () => {
  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full blur-lg opacity-75 animate-pulse"></div>
      <div className="relative w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-neon-cyan/50">
        <Bot className="w-12 h-12 text-neon-cyan" />
      </div>
    </div>
  );
};