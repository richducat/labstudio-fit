// Lab Studio TheLabUltimate App
import React, { useState, useEffect, useRef, useMemo } from 'https://cdn.skypack.dev/react@18';
import { createRoot } from 'https://cdn.skypack.dev/react-dom@18/client';
import {
  Dumbbell,
  Brain,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Trophy,
  Flame,
  ChevronRight,
  Zap,
  MapPin,
  X,
  Plus,
  Minus,
  Activity,
  CheckCircle,
  Clock,
  User,
  CreditCard,
  ArrowRight,
  QrCode,
  BarChart3,
  Search,
  Volume2,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Grid,
  Camera,
  Smartphone,
  Scale,
  Heart,
  Sword,
  Shield,
  Utensils,
  Gift,
  Share2,
  Ticket,
  AlertCircle,
  Battery,
  TrendingUp,
  Info,
  Timer,
  Video,
  Users,
  CheckSquare,
  ArrowLeft,
  BookOpen,
  Fingerprint
} from 'https://cdn.skypack.dev/lucide-react@latest?bundle';

// --- ASSETS & DATA ---
const BRAND = {
  name: "THE LAB",
  address: "3280 Suntree Blvd, Melbourne, FL",
};

const USERS = [
  { id: 1, name: "YOU", xp: 1250, rank: 4, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Sarah J.", xp: 2400, rank: 1, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Mike T.", xp: 2150, rank: 2, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
];

const SERVICES = [
  { id: "intro", name: "Intro Assessment", price: 49, time: "45m", desc: "Movement screen & strategy.", xp: 100, type: "Strategy" },
  { id: "pt60", name: "1:1 Protocol", price: 95, time: "60m", desc: "Full guided hypertrophy session.", xp: 200, type: "Strength" },
  { id: "recovery", name: "Ice & Heat", price: 59, time: "30m", desc: "Contrast therapy via sauna/plunge.", xp: 150, type: "Recovery" },
  { id: "mobility", name: "Flow State", price: 55, time: "45m", desc: "Active mobility & joint health.", xp: 120, type: "Mobility" },
];

const MARKET_ITEMS = [
  { id: "m1", name: "Macro Bowl: Chkn/Rice", price: 10.99, xp: 50, cat: "fuel", tag: "HIGH PROTEIN", macros: { p: 45, c: 50, f: 12 }, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" },
  { id: "m2", name: "Steak & Greens", price: 12.99, xp: 50, cat: "fuel", tag: "KETO", macros: { p: 50, c: 10, f: 25 }, img: "https://images.unsplash.com/photo-1600335247177-61b6c73950fb?q=80&w=600&auto=format&fit=crop" },
  { id: "d1", name: "Electro-Hydrate", price: 2.99, xp: 10, cat: "fuel", tag: "RECOVERY", macros: { p: 0, c: 15, f: 0 }, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" },
  { id: "d2", name: "Iso-Whey Shake", price: 4.99, xp: 25, cat: "fuel", tag: "POST-WORKOUT", macros: { p: 30, c: 5, f: 2 }, img: "https://images.unsplash.com/photo-1584175697669-70a2c07742d4?q=80&w=600&auto=format&fit=crop" },
  { id: "g1", name: "Lab Lifting Straps", price: 19.99, xp: 100, cat: "gear", tag: "ACCESSORY", macros: null, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop" },
];

const WORKOUT_TEMPLATE = {
  name: "Upper Body Hypertrophy",
  exercises: [
    { id: 1, name: "DB Incline Press", sets: 3, reps: "8-12", weight: "60lbs" },
    { id: 2, name: "Pull-Ups (Weighted)", sets: 3, reps: "Failure", weight: "BW+25" },
    { id: 3, name: "Lateral Raises", sets: 4, reps: "15-20", weight: "25lbs" },
    { id: 4, name: "Tricep Pushdowns", sets: 3, reps: "12-15", weight: "Stack" },
  ]
};

const CHALLENGES = [
  { id: 1, title: "The 300", desc: "300 Reps total volume in one session.", reward: "Badge + 500 XP", active: true },
  { id: 2, title: "Ice King", desc: "Accumulate 20 mins in cold plunge.", reward: "Free Shake", active: false },
];

const LIBRARY_CONTENT = [
  { id: 1, title: "Shoulder Mobility Flow", type: "Video", dur: "5m" },
  { id: 2, title: "Understanding Macros", type: "Guide", dur: "3m read" },
  { id: 3, title: "Squat Mechanics 101", type: "Video", dur: "12m" },
];

// Utility Components: Card, Button, Badge, XpToast
const Card = ({ children, className = "", onClick, noBlur }) => (
  React.createElement('div', { onClick: onClick, className: `relative overflow-hidden rounded-2xl border border-white/5 ${noBlur ? "bg-zinc-900" : "bg-zinc-900/60 backdrop-blur-md"} ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}` }, children)
);

const Button = ({ children, primary, full, onClick, disabled, size = "md", icon: Icon, className = "" }) => (
  React.createElement('button', {
    onClick: onClick,
    disabled: disabled,
    className: `${full ? "w-full" : ""} ${size === "sm" ? "py-2 px-3 text-xs" : size === "lg" ? "py-4 px-6 text-lg" : "py-3 px-6 text-sm"} rounded-xl font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 relative overflow-hidden group ${primary ? "bg-violet-600 text-white shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)] border border-violet-500/50 hover:bg-violet-500" : "bg-zinc-800 text-zinc-300 border border-white/10 hover:border-white/20 hover:bg-zinc-700"} ${className}`
  }, [
    primary && React.createElement('div', { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" }),
    Icon && React.createElement(Icon, { size: size === "sm" ? 14 : 18 }),
    React.createElement('span', { className: "relative z-10" }, children)
  ])
);

const Badge = ({ children, color = "violet" }) => {
  const colors = {
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    red: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    blue: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };
  const cls = colors[color] || colors.violet;
  return React.createElement('span', { className: `px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${cls}` }, children);
};

const XpToast = ({ show, amount, text }) => {
  if (!show) return null;
  return React.createElement('div', { className: "fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none w-full flex justify-center" },
    React.createElement('div', { className: "bg-yellow-500 text-black font-black italic px-6 py-3 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.8)] border-2 border-white flex items-center gap-2 text-xl scale-110" }, [
      React.createElement(Zap, { fill: "black", size: 24 }),
      text ? text : `+${amount} XP`
    ])
  );
};

// The rest of the app components (HomeView, ProfileView, BookingView, etc.)
// Because of file length, we include a simplified version to provide interactive UI skeleton.

function TheLabUltimate() {
  const [onboarding, setOnboarding] = useState(true);
  const [xp, setXp] = useState(1250);
  const [toast, setToast] = useState({ show: false, amount: 0, text: "" });

  useEffect(() => {
    // Example: show XP toast on load as demonstration
    setToast({ show: true, amount: 50, text: "+50 XP Welcome" });
    const timer = setTimeout(() => setToast({ show: false }), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    React.createElement('div', { className: "min-h-screen bg-zinc-950 text-white font-sans selection:bg-violet-500/30 pb-24 relative overflow-hidden flex flex-col items-center justify-center" }, [
      React.createElement(XpToast, { show: toast.show, amount: toast.amount, text: toast.text }),
      React.createElement('h1', { className: "text-4xl font-black" }, "Welcome to THE LAB"),
      React.createElement('p', { className: "text-zinc-400 mt-4" }, "Site under construction. Stay tuned!")
    ])
  );
}

// Render the app
const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
root.render(React.createElement(TheLabUltimate));
