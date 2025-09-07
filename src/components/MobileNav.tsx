import { cn } from "@/lib/utils";
import { CalendarDays, UtensilsCrossed, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Menú", icon: CalendarDays },
    { href: "/recipes", label: "Recetas", icon: UtensilsCrossed },
    { href: "/profile", label: "Mi Cocina", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="grid h-full grid-cols-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-foreground/70 transition-colors",
              location.pathname === item.href && "text-brand-green"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;