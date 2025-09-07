import { Link, useLocation } from "react-router-dom";
import { Bot, CalendarDays, Home, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Menú Semanal", icon: CalendarDays },
    { href: "/recipes", label: "Recetas", icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen w-full flex">
      <aside className="w-64 flex-col border-r border-white/10 p-4 hidden md:flex">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-background" />
          </div>
          <h1 className="text-xl font-bold text-foreground">VeggieMind</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:text-foreground hover:bg-white/5",
                location.pathname === item.href && "bg-brand-green/20 text-brand-green"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;