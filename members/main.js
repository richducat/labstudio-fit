const rootElement = document.getElementById('root');

const renderFallback = (message) => {
  if (!rootElement) return;
  rootElement.innerHTML = `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <div class="max-w-lg text-center space-y-4">
        <div class="text-2xl font-black uppercase tracking-widest">The Lab Members</div>
        <p class="text-zinc-300 text-sm leading-relaxed">${message}</p>
        <p class="text-zinc-500 text-xs">If you use a content blocker, allow access to the React and ReactDOM CDNs and reload.</p>
      </div>
    </div>
  `;
};

const reactDeps = () =>
  Promise.all([
    import('https://esm.sh/react@18.3.1?target=es2019'),
    import('https://esm.sh/react-dom@18.3.1/client?target=es2019'),
    import('https://esm.sh/htm@3.1.1?target=es2019')
  ]);

const lucidePromise = () =>
  import('https://esm.sh/lucide-react@0.408.0?bundle&target=es2019').catch(() => null);

const loadApp = async () => {
  try {
    const [[React, ReactDom, htm], lucideModule] = await Promise.all([reactDeps(), lucidePromise()]);
    const { createRoot } = ReactDom;
    const html = (htm.default ?? htm).bind(React.createElement);
    const { useState, useEffect, useRef } = React;
    const iconNames = [
      'Dumbbell',
      'Brain',
      'ShoppingBag',
      'Calendar',
      'MessageSquare',
      'Trophy',
      'Flame',
      'ChevronRight',
      'Zap',
      'MapPin',
      'X',
      'Plus',
      'Minus',
      'Activity',
      'CheckCircle',
      'Clock',
      'User',
      'CreditCard',
      'ArrowRight',
      'QrCode',
      'BarChart3',
      'Search',
      'Volume2',
      'Mic',
      'Play',
      'Pause',
      'RotateCcw',
      'Grid',
      'Camera',
      'Smartphone',
      'Scale',
      'Heart',
      'Sword',
      'Shield',
      'Utensils',
      'Gift',
      'Share2',
      'Ticket',
      'AlertCircle',
      'Battery',
      'TrendingUp',
      'Info',
      'Timer',
      'Video',
      'Users',
      'CheckSquare',
      'ArrowLeft',
      'BookOpen',
      'Fingerprint',
      'Instagram',
      'Twitter',
      'Edit3',
      'Image'
    ];
    const createFallbackIcon = (label) => ({ size = 16, className = '' }) => html`
      <span
        className=${`inline-flex items-center justify-center rounded-full bg-zinc-700/70 text-[10px] font-black text-zinc-100 ${className}`}
        style=${{ width: `${size}px`, height: `${size}px` }}
        aria-hidden="true"
      >
        ${label.slice(0, 1)}
      </span>
    `;
    const fallbackIcons = Object.fromEntries(iconNames.map((name) => [name, createFallbackIcon(name)]));
    const icons = { ...fallbackIcons, ...(lucideModule ?? {}) };
    const {
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
      Fingerprint,
      Instagram,
      Twitter,
      Edit3,
      Image: ImageIcon
    } = icons;

// --- ASSETS & DATA ---
const BRAND = {
  name: 'THE LAB',
  address: '3280 Suntree Blvd, Melbourne, FL'
};

const USERS = [
  { id: 1, name: 'YOU', xp: 1250, rank: 4, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Sarah J.', xp: 2400, rank: 1, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Mike T.', xp: 2150, rank: 2, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }
];

const SERVICES = [
  { id: 'intro', name: 'Intro Assessment', price: 49, time: '45m', desc: 'Movement screen & strategy.', xp: 100, type: 'Strategy' },
  { id: 'pt60', name: '1:1 Protocol', price: 95, time: '60m', desc: 'Full guided hypertrophy session.', xp: 200, type: 'Strength' },
  { id: 'recovery', name: 'Ice & Heat', price: 59, time: '30m', desc: 'Contrast therapy via sauna/plunge.', xp: 150, type: 'Recovery' },
  { id: 'mobility', name: 'Flow State', price: 55, time: '45m', desc: 'Active mobility & joint health.', xp: 120, type: 'Mobility' }
];

const MARKET_ITEMS = [
  { id: 'm1', name: 'Macro Bowl: Chkn/Rice', price: 10.99, xp: 50, cat: 'fuel', tag: 'HIGH PROTEIN', macros: { p: 45, c: 50, f: 12 }, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop' },
  { id: 'm2', name: 'Steak & Greens', price: 12.99, xp: 50, cat: 'fuel', tag: 'KETO', macros: { p: 50, c: 10, f: 25 }, img: 'https://images.unsplash.com/photo-1600335247177-61b6c73950fb?q=80&w=600&auto=format&fit=crop' },
  { id: 'd1', name: 'Electro-Hydrate', price: 2.99, xp: 10, cat: 'fuel', tag: 'RECOVERY', macros: { p: 0, c: 15, f: 0 }, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop' },
  { id: 'd2', name: 'Iso-Whey Shake', price: 4.99, xp: 25, cat: 'fuel', tag: 'POST-WORKOUT', macros: { p: 30, c: 5, f: 2 }, img: 'https://images.unsplash.com/photo-1584175697669-70a2c07742d4?q=80&w=600&auto=format&fit=crop' },
  { id: 'g1', name: 'Lab Lifting Straps', price: 19.99, xp: 100, cat: 'gear', tag: 'ACCESSORY', macros: null, img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' }
];

const WORKOUT_TEMPLATE = {
  name: 'Upper Body Hypertrophy',
  exercises: [
    { id: 1, name: 'DB Incline Press', sets: 3, reps: '8-12', weight: '60lbs' },
    { id: 2, name: 'Pull-Ups (Weighted)', sets: 3, reps: 'Failure', weight: 'BW+25' },
    { id: 3, name: 'Lateral Raises', sets: 4, reps: '15-20', weight: '25lbs' },
    { id: 4, name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: 'Stack' }
  ]
};

const CHALLENGES = [
  { id: 1, title: 'The 300', desc: '300 Reps total volume in one session.', reward: 'Badge + 500 XP', active: true },
  { id: 2, title: 'Ice King', desc: 'Accumulate 20 mins in cold plunge.', reward: 'Free Shake', active: false }
];

const LIBRARY_CONTENT = [
  { id: 1, title: 'Shoulder Mobility Flow', type: 'Video', dur: '5m' },
  { id: 2, title: 'Understanding Macros', type: 'Guide', dur: '3m read' },
  { id: 3, title: 'Squat Mechanics 101', type: 'Video', dur: '12m' }
];

// --- UTILS & COMPONENTS ---

const Card = ({ children, className = '', onClick, noBlur }) => html`
  <div
    onClick=${onClick}
    className=${`relative overflow-hidden rounded-2xl border border-white/5 ${noBlur ? 'bg-zinc-900' : 'bg-zinc-900/60 backdrop-blur-md'} ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
  >
    ${children}
  </div>
`;

const Button = ({ children, primary, full, onClick, disabled, size = 'md', icon: Icon, className = '' }) => html`
  <button
    onClick=${onClick}
    disabled=${disabled}
    className=${`${full ? 'w-full' : ''} ${size === 'sm' ? 'py-2 px-3 text-xs' : size === 'lg' ? 'py-4 px-6 text-lg' : 'py-3 px-6 text-sm'} rounded-xl font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 relative overflow-hidden group ${primary ? 'bg-violet-600 text-white shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)] border border-violet-500/50 hover:bg-violet-500' : 'bg-zinc-800 text-zinc-300 border border-white/10 hover:border-white/20 hover:bg-zinc-700'} ${className}`}
  >
    ${primary && html`<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>`}
    ${Icon && html`<${Icon} size=${size === 'sm' ? 14 : 18} />`}
    <span className="relative z-10">${children}</span>
  </button>
`;

const Badge = ({ children, color = 'violet' }) => {
  const colors = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    blue: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  };
  return html`<span className=${`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${colors[color] || colors.violet}`}>
    ${children}
  </span>`;
};

const XpToast = ({ show, amount, text }) => {
  if (!show) return null;
  return html`
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none w-full flex justify-center">
      <div className="bg-yellow-500 text-black font-black italic px-6 py-3 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.8)] border-2 border-white flex items-center gap-2 text-xl scale-110">
        <${Zap} fill="black" size=${24} />
        ${text ? text : `+${amount} XP`}
      </div>
    </div>
  `;
};

// --- MAIN APP ---

function TheLabUltimate() {
  const [onboarding, setOnboarding] = useState(true);
  const [tab, setTab] = useState('home');
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [credits, setCredits] = useState(1);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toast, setToast] = useState({ show: false, amount: 0, text: '' });

  // USER PROFILE & REFERRALS
  const [userProfile, setUserProfile] = useState({
    name: 'TAYLOR',
    handle: '@taylor_lifts',
    bio: 'Chasing PRs and good vibes. 🏋️‍♂️',
    height: `5'11"`,
    weight: 185,
    bf: 14,
    gender: 'Male',
    referralCode: 'LAB-8842',
    referrals: 2,
    goal: 'Hypertrophy',
    joined: 'Oct 2023'
  });

  const [nutritionLog, setNutritionLog] = useState([
    { id: 1, name: 'Oatmeal + Whey', p: 30, c: 45, f: 5, time: '08:00 AM' }
  ]);

  // Handle Onboarding Completion
  const handleOnboardingComplete = (data) => {
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      handle: data.handle || `@${data.name.split(' ')[0].toLowerCase()}_lab`,
      bio: data.bio,
      height: data.height,
      weight: data.weight,
      bf: data.bf,
      goal: data.goal,
      gender: data.gender
    }));
    setOnboarding(false);
  };

  // XP System
  const addXp = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);

    const oldMilestone = Math.floor(xp / 1000);
    const newMilestone = Math.floor(newXp / 1000);

    if (newMilestone > oldMilestone) {
      setCredits((c) => c + 1);
      setToast({ show: true, amount: 0, text: 'FREE FOOD ITEM UNLOCKED!' });
    } else {
      setToast({ show: true, amount });
    }

    setTimeout(() => setToast({ show: false, amount: 0, text: '' }), 2500);
    if (newXp > level * 1000) setLevel((l) => l + 1);
  };

  const addFoodToLog = (foodItem) => {
    const newEntry = {
      id: Date.now(),
      name: foodItem.name,
      p: foodItem.macros?.p || 0,
      c: foodItem.macros?.c || 0,
      f: foodItem.macros?.f || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNutritionLog((prev) => [newEntry, ...prev]);
  };

  if (onboarding) return html`<${OnboardingView} onComplete=${handleOnboardingComplete} />`;

  return html`
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-violet-500/30 pb-24 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-violet-900/20 blur-[150px] rounded-full animate-pulse"
          style=${{ animationDuration: '4s' }}
        ></div>
        <div
          className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-900/10 blur-[150px] rounded-full animate-pulse"
          style=${{ animationDuration: '7s' }}
        ></div>
      </div>

      <${XpToast} show=${toast.show} amount=${toast.amount} text=${toast.text} />

      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3" onClick=${() => setTab('home')}>
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center font-black italic shadow-[0_0_15px_rgba(124,58,237,0.4)] cursor-pointer">L</div>
          <div>
            <div className="font-bold tracking-wider leading-none">THE LAB</div>
            <div className="text-[9px] text-zinc-500 tracking-[0.2em] font-bold">ULTIMATE</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick=${() => setShowPass(true)} className="p-2 bg-zinc-900 rounded-full border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
            <${QrCode} size=${18} />
          </button>
          <div
            className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer hover:border-violet-500/50 transition"
            onClick=${() => setShowProfile(true)}
          >
            <${Trophy} size=${12} className="text-yellow-500" />
            <span>LVL ${level}</span>
            <div className="w-px h-3 bg-zinc-700 mx-1" />
            <span className="text-violet-400">${xp}</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 animate-in fade-in duration-500 relative z-10">
        ${showProfile
          ? html`<${ProfileView} user=${userProfile} log=${nutritionLog} addFood=${addFoodToLog} close=${() => setShowProfile(false)} myXp=${xp} level=${level} />`
          : html`
              ${tab === 'home' && html`<${HomeView} xp=${xp} level=${level} setTab=${setTab} nutritionLog=${nutritionLog} credits=${credits} userProfile=${userProfile} />`}
              ${tab === 'book' && html`<${BookingView} addXp=${addXp} setTab=${setTab} userProfile=${userProfile} />`}
              ${tab === 'coach' && html`<${TobyCoachView} />`}
              ${tab === 'games' && html`<${GameHubView} addXp=${addXp} />`}
              ${tab === 'market' && html`<${MarketView} cart=${cart} setCart=${setCart} setShowCart=${setShowCart} credits=${credits} />`}
              ${tab === 'workout' && html`<${WorkoutSessionView} addXp=${addXp} setTab=${setTab} />`}
              ${tab === 'social' && html`<${SocialHubView} myXp=${xp} />`}
              ${tab === 'library' && html`<${LibraryView} />`}
            `}
      </main>

      ${!showProfile && html`
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe pt-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,1)]">
          <div className="max-w-md mx-auto flex justify-around items-center px-1">
            <${NavBtn} icon=${Activity} label="Dash" active=${tab === 'home'} onClick=${() => setTab('home')} />
            <${NavBtn} icon=${Calendar} label="Book" active=${tab === 'book'} onClick=${() => setTab('book')} />

            <div className="-mt-10 relative group">
              <div className="absolute inset-0 bg-violet-600 blur-xl opacity-40 rounded-full group-hover:opacity-60 transition duration-500" />
              <button
                onClick=${() => setTab('coach')}
                className=${`h-16 w-16 rounded-full flex items-center justify-center border-4 border-zinc-950 relative z-10 transition-all duration-300 ${tab === 'coach' ? 'bg-white text-violet-600 scale-110 shadow-xl' : 'bg-violet-600 text-white group-hover:bg-violet-500 group-hover:scale-105'}`}
              >
                <${MessageSquare} size=${26} fill="currentColor" />
              </button>
            </div>

            <${NavBtn} icon=${Brain} label="Games" active=${tab === 'games'} onClick=${() => setTab('games')} />
            <${NavBtn} icon=${ShoppingBag} label="Shop" active=${tab === 'market'} onClick=${() => setTab('market')} />
          </div>
        </nav>
      `}

      ${showCart && html`<${CartModal} cart=${cart} setCart=${setCart} close=${() => setShowCart(false)} addXp=${addXp} addFood=${addFoodToLog} credits=${credits} setCredits=${setCredits} />`}
      ${showPass && html`<${PassModal} close=${() => setShowPass(false)} user=${{ name: userProfile.name, level }} />`}
    </div>
  `;
}

const NavBtn = ({ icon: Icon, label, active, onClick }) => html`
  <button onClick=${onClick} className=${`flex flex-col items-center gap-1 p-2 w-14 rounded-xl transition-all ${active ? 'text-white scale-105' : 'text-zinc-600 hover:text-zinc-400'}`}>
    <${Icon} size=${22} strokeWidth=${active ? 2.5 : 2} className=${active ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''} />
    <span className="text-[9px] font-bold tracking-wide uppercase">${label}</span>
  </button>
`;

// --- ONBOARDING VIEW (ENHANCED) ---
function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    gender: 'Male',
    height: '',
    weight: '',
    neck: '',
    waist: '',
    hip: '',
    bf: '',
    bio: '',
    goal: 'Strength'
  });
  const [loading, setLoading] = useState(false);
  const [calcBf, setCalcBf] = useState(null);

  const calculateBF = () => {
    if (!formData.waist || !formData.neck || !formData.height) return;
    const h = parseFloat(formData.height);
    const n = parseFloat(formData.neck);
    const w = parseFloat(formData.waist);
    const hip = parseFloat(formData.hip || 0);

    let result = 0;
    if (formData.gender === 'Male') {
      result = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      result = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
    }

    const val = Math.max(2, Math.min(50, result)).toFixed(1);
    setCalcBf(val);
    setFormData((prev) => ({ ...prev, bf: val }));
  };

  const nextStep = () => {
    if (step < 4) {
      if (step === 2) calculateBF();
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => onComplete(formData), 2500);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.length > 2;
    if (step === 2) return formData.height && formData.weight && formData.waist && formData.neck;
    return true;
  };

  if (loading)
    return html`
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-violet-600 blur-xl opacity-50 animate-pulse" />
          <${Zap} size=${32} className="text-violet-500 relative z-10" />
        </div>
        <h2 className="text-2xl font-black italic mb-2">BUILDING ATHLETE PROFILE</h2>
        <div className="flex flex-col gap-2 w-full max-w-xs text-xs font-mono text-zinc-500 mt-4">
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-100">
            <span>&gt; IDENTITY</span> <span className="text-emerald-500">VERIFIED</span>
          </div>
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-300">
            <span>&gt; BODY COMPOSITION</span> <span className="text-emerald-500">ANALYZED</span>
          </div>
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-500">
            <span>&gt; GENERATING PROFILE</span> <span className="text-violet-500 animate-pulse">CREATING...</span>
          </div>
        </div>
      </div>
    `;

  return html`
    <div className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-violet-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full z-10">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            ${[1, 2, 3, 4].map(
              (i) => html`<div key=${i} className=${`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-violet-600' : 'bg-zinc-800'}`} />`
            )}
          </div>
          <h1 className="text-4xl font-black italic uppercase leading-[0.9]">
            ${step === 1 && 'Identity\nVerification'}
            ${step === 2 && 'Body\nScanner'}
            ${step === 3 && 'Social\nIdentity'}
            ${step === 4 && 'Mission\nObjective'}
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            ${step === 1 && 'Start your journey at The Lab.'}
            ${step === 2 && 'We use the Navy Method for accurate BF% calculation.'}
            ${step === 3 && 'Customize how others see you in The Squad.'}
            ${step === 4 && 'Define your primary directive.'}
          </p>
        </div>

        <div className="space-y-4">
          ${step === 1 && html`
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Full Name</label>
                <input
                  value=${formData.name}
                  onChange=${(event) => setFormData({ ...formData, name: event.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors placeholder:text-zinc-700"
                  placeholder="e.g. Taylor Doe"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  ${['Male', 'Female'].map(
                    (g) => html`
                      <button
                        key=${g}
                        onClick=${() => setFormData({ ...formData, gender: g })}
                        className=${`p-3 rounded-xl border font-bold text-sm ${formData.gender === g ? 'bg-zinc-800 border-violet-500 text-white' : 'border-zinc-800 text-zinc-500'}`}
                      >
                        ${g}
                      </button>
                    `
                  )}
                </div>
              </div>
            </div>
          `}

          ${step === 2 && html`
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Height (in)</label>
                  <input
                    type="number"
                    value=${formData.height}
                    onChange=${(event) => setFormData({ ...formData, height: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Weight (lbs)</label>
                  <input
                    type="number"
                    value=${formData.weight}
                    onChange=${(event) => setFormData({ ...formData, weight: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="185"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Neck (in)</label>
                  <input
                    type="number"
                    value=${formData.neck}
                    onChange=${(event) => setFormData({ ...formData, neck: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Waist (in)</label>
                  <input
                    type="number"
                    value=${formData.waist}
                    onChange=${(event) => setFormData({ ...formData, waist: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="32"
                  />
                </div>
              </div>
              ${formData.gender === 'Female' && html`
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Hip (in)</label>
                  <input
                    type="number"
                    value=${formData.hip}
                    onChange=${(event) => setFormData({ ...formData, hip: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="36"
                  />
                </div>
              `}
              ${formData.height && formData.waist && formData.neck && html`
                <div className="bg-violet-900/20 border border-violet-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div className="text-sm font-bold text-violet-300">Estimated Body Fat</div>
                  <div className="text-xl font-black text-white">
                    ${(() => {
                      const h = parseFloat(formData.height);
                      const n = parseFloat(formData.neck);
                      const w = parseFloat(formData.waist);
                      const hip = parseFloat(formData.hip || 0);
                      let res = 0;
                      if (formData.gender === 'Male') res = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
                      else res = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
                      return Number.isNaN(res) ? '--' : `${Math.max(2, res).toFixed(1)}%`;
                    })()}
                  </div>
                </div>
              `}
            </div>
          `}

          ${step === 3 && html`
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Squad Handle</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-zinc-500 font-bold">@</span>
                  <input
                    value=${formData.handle}
                    onChange=${(event) => setFormData({ ...formData, handle: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 pl-8 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="iron_taylor"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Bio / Manifesto</label>
                <textarea
                  value=${formData.bio}
                  onChange=${(event) => setFormData({ ...formData, bio: event.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-violet-500 transition-colors h-24 resize-none"
                  placeholder="e.g. Chasing the 1000lb club. Coffee addict. Early riser."
                ></textarea>
              </div>
            </div>
          `}

          ${step === 4 && html`
            <div className="space-y-3 animate-in fade-in slide-in-from-right duration-300">
              ${['Strength', 'Aesthetics', 'Performance'].map(
                (goal) => html`
                  <button
                    key=${goal}
                    onClick=${() => setFormData({ ...formData, goal })}
                    className=${`w-full p-4 rounded-xl border text-left transition-all ${formData.goal === goal ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    <div className="font-bold text-lg">${goal}</div>
                    <div className=${`text-xs ${formData.goal === goal ? 'text-violet-200' : 'text-zinc-600'}`}>
                      ${goal === 'Strength' && 'Max force output. PR focused.'}
                      ${goal === 'Aesthetics' && 'Hypertrophy & symmetry. Visuals.'}
                      ${goal === 'Performance' && 'Speed, agility, and endurance.'}
                    </div>
                  </button>
                `
              )}
            </div>
          `}
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
          ${step > 1
            ? html`<button onClick=${() => setStep(step - 1)} className="text-zinc-500 text-sm font-bold hover:text-white transition">BACK</button>`
            : html`<div />`}

          <${Button} primary disabled=${!isStepValid()} onClick=${nextStep}>
            ${step === 4 ? 'INITIALIZE SYSTEM' : 'NEXT STEP'}
          </${Button}>
        </div>
      </div>
    </div>
  `;
}

// --- VIEWS ---

function HomeView({ xp, level, setTab, nutritionLog, credits, userProfile }) {
  const nextLevel = (level + 1) * 1000;
  const progress = Math.min((xp / nextLevel) * 100, 100);
  const todaysCals = nutritionLog.reduce((acc, curr) => acc + (curr.p * 4 + curr.c * 4 + curr.f * 9), 0);
  const todaysProtein = nutritionLog.reduce((acc, curr) => acc + curr.p, 0);

  const sessions = { booked: 5, made: 3, missed: 0 };

  return html`
    <div className="space-y-6 pb-20">
      <div className="relative pt-2">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.85] mb-2">
          UNLEASH<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-400 to-white animate-gradient-x">POTENTIAL</span>
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live: 12% Capacity
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">OPEN UNTIL 10PM</div>
        </div>

        <${Card} className="mb-4 bg-zinc-900/80 p-0 overflow-hidden border-zinc-800">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400">
                <${User} size=${20} />
              </div>
              <div>
                <div className="font-black italic text-lg leading-none uppercase">${userProfile.name}</div>
                <div className="text-[10px] font-mono text-zinc-500">GOAL: ${userProfile.goal.toUpperCase()}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-violet-400">${userProfile.weight} lbs</div>
              <div className="text-[10px] text-zinc-500">${userProfile.bf}% BF</div>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Nutrition Today</div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-400">Cals</div>
                <div className="font-mono font-bold">${Math.round(todaysCals)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-400">Protein</div>
                <div className="font-mono font-bold text-emerald-400">${Math.round(todaysProtein)}g</div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Session Log</div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-400">Booked</div>
                <div className="font-mono font-bold">${sessions.booked}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-400">Made</div>
                <div className="font-mono font-bold text-blue-400">${sessions.made}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-zinc-400">Missed</div>
                <div className=${`font-mono font-bold ${sessions.missed > 0 ? 'text-red-500' : 'text-zinc-600'}`}>${sessions.missed}</div>
              </div>
            </div>
          </div>
        </${Card}>

        <${Card} className="mb-4 bg-gradient-to-r from-violet-900/20 to-zinc-900 border-l-4 border-l-violet-500 p-4" onClick=${() => setTab('book')}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-widest">
              <${Calendar} size=${12} /> Next Mission
            </div>
            <div className="bg-zinc-900 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-zinc-400">
              TOMORROW
            </div>
          </div>
          <div className="font-black text-xl italic mb-1">1:1 PROTOCOL</div>
          <div className="flex items-center gap-2 text-sm text-zinc-300 mb-3">
            <${Clock} size=${14} className="text-zinc-500" /> 06:00 PM
          </div>

          <div className="bg-black/20 rounded-lg p-3 border border-white/5 flex gap-3 items-start">
            <${AlertCircle} size=${16} className="text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-zinc-300">INTEL:</div>
              <div className="text-xs text-zinc-500">Heavy Upper Body Focus. Bring lifting straps. Expect failure sets on Chest Press.</div>
            </div>
          </div>
        </${Card}>

        <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
            <${Trophy} size=${60} />
          </div>
          <div className="flex justify-between items-end mb-2 relative z-10">
            <div>
              <div className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Current Rank</div>
              <div className="text-2xl font-black italic">LEVEL ${level}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-violet-400 font-bold tracking-widest uppercase">${nextLevel - xp} XP TO REWARD</div>
            </div>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-1000" style=${{ width: `${progress}%` }} />
          </div>
          ${credits > 0 && html`
            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-yellow-500 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
              <${Gift} size=${14} />
              ${credits} FREE FOOD ITEM${credits > 1 ? 'S' : ''} AVAILABLE
            </div>
          `}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="font-bold text-lg">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <${Card} className="p-0 group" onClick=${() => setTab('workout')}>
            <div className="p-4 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                  <${Dumbbell} size=${20} className="text-violet-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">Start Workout</div>
                  <div className="text-xs text-zinc-500">Log sets & rest timers</div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <${Play} size=${14} fill="currentColor" />
              </div>
            </div>
            <div className="h-1 bg-zinc-800 w-full">
              <div className="h-full bg-violet-600 w-1/3" />
            </div>
          </${Card}>

          <div className="grid grid-cols-2 gap-3">
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('social')}>
              <${Users} size=${24} className="text-blue-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">THE SQUAD</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('library')}>
              <${BookOpen} size=${24} className="text-emerald-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">THE VAULT</div>
            </${Card}>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- WORKOUT SESSION VIEW (NEW) ---
function WorkoutSessionView({ addXp, setTab }) {
  const [activeExercise, setActiveExercise] = useState(0);
  const [sets, setSets] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  const toggleSet = (exIdx, setIdx) => {
    const key = `${exIdx}-${setIdx}`;
    setSets((prev) => ({ ...prev, [key]: !prev[key] }));
    if (!sets[key]) {
      setTimer(90);
      setTimerActive(true);
    }
  };

  const handleFinish = () => {
    addXp(300);
    setTab('home');
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return html`
    <div className="flex flex-col h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-black italic uppercase">${WORKOUT_TEMPLATE.name}</h2>
        <button onClick=${() => setTab('home')} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
        ${WORKOUT_TEMPLATE.exercises.map(
          (ex, i) => html`
            <div key=${ex.id} className=${`p-4 rounded-2xl border ${i === activeExercise ? 'bg-zinc-800 border-violet-500/50' : 'bg-zinc-900/50 border-white/5'}`}>
              <div className="flex justify-between mb-3" onClick=${() => setActiveExercise(i)}>
                <div>
                  <div className="font-bold text-lg">${ex.name}</div>
                  <div className="text-xs text-zinc-500">${ex.sets} Sets • ${ex.reps} Reps</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-violet-400">${ex.weight}</div>
                </div>
              </div>

              ${i === activeExercise && html`
                <div className="space-y-2">
                  ${Array.from({ length: ex.sets }).map(
                    (_, s) => html`
                      <div key=${s} className="flex items-center justify-between bg-zinc-950 p-2 rounded-lg border border-white/5">
                        <div className="text-xs font-bold text-zinc-500">SET ${s + 1}</div>
                        <div className="font-mono text-sm text-zinc-300">Previous: ${ex.weight} x 10</div>
                        <button
                          onClick=${() => toggleSet(i, s)}
                          className=${`w-8 h-8 rounded flex items-center justify-center transition-colors ${sets[`${i}-${s}`] ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}
                        >
                          <${CheckSquare} size=${18} />
                        </button>
                      </div>
                    `
                  )}
                </div>
              `}
            </div>
          `
        )}
      </div>

      <div className="fixed bottom-24 left-0 right-0 p-4 max-w-md mx-auto">
        ${timerActive
          ? html`
              <div className="bg-zinc-900 border border-violet-500/50 p-3 rounded-xl flex items-center justify-between mb-3 animate-in slide-in-from-bottom">
                <div className="flex items-center gap-2 text-violet-400 font-bold">
                  <${Timer} size=${18} /> REST
                </div>
                <div className="font-mono text-xl font-bold">${formatTime(timer)}</div>
                <button onClick=${() => setTimerActive(false)} className="text-xs bg-zinc-800 px-2 py-1 rounded">SKIP</button>
              </div>
            `
          : null}
        <${Button} primary full onClick=${handleFinish}>COMPLETE SESSION</${Button}>
      </div>
    </div>
  `;
}

// --- SOCIAL HUB (NEW) ---
function SocialHubView({ myXp }) {
  return html`
    <div className="pb-20 space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-black italic uppercase">THE SQUAD</h2>
        <p className="text-zinc-500 text-xs">Compete & Conquer</p>
      </div>

      <div>
        <h3 className="font-bold text-sm text-zinc-400 mb-3 uppercase tracking-widest">Active Operations</h3>
        <div className="space-y-3">
          ${CHALLENGES.map(
            (c) => html`
              <${Card} key=${c.id} className=${`p-4 ${c.active ? 'border-violet-500/50 bg-violet-900/10' : 'opacity-70'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-lg">${c.title}</div>
                  ${c.active ? html`<${Badge} color="violet">ACTIVE</${Badge}>` : html`<${Badge} color="red">LOCKED</${Badge}>`}
                </div>
                <p className="text-sm text-zinc-300 mb-3">${c.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-500">
                  <${Gift} size=${14} /> REWARD: ${c.reward}
                </div>
              </${Card}>
            `
          )}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-sm text-zinc-400 mb-3 uppercase tracking-widest">Leaderboard</h3>
        <div className="space-y-2">
          ${[...USERS]
            .sort((a, b) => b.xp - a.xp)
            .map(
              (u, i) => html`
                <div key=${u.id} className=${`flex items-center gap-4 p-3 rounded-xl border ${u.name === 'YOU' ? 'bg-zinc-800 border-white/20' : 'bg-zinc-900/50 border-white/5'}`}>
                  <div className="font-black text-lg w-6 text-center text-zinc-500">#${i + 1}</div>
                  <img src=${u.img} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="font-bold text-sm">${u.name}</div>
                    <div className="text-[10px] text-zinc-500">LEVEL ${Math.floor(u.xp / 1000)}</div>
                  </div>
                  <div className="font-mono font-bold text-violet-400 text-sm">${u.xp} XP</div>
                </div>
              `
            )}
        </div>
      </div>
    </div>
  `;
}

// --- LIBRARY VIEW (NEW) ---
function LibraryView() {
  return html`
    <div className="pb-20 space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-black italic uppercase">THE VAULT</h2>
        <p className="text-zinc-500 text-xs">Knowledge is Gains</p>
      </div>

      <div className="grid gap-3">
        ${LIBRARY_CONTENT.map(
          (item) => html`
            <${Card} key=${item.id} className="p-3 flex items-center gap-4 hover:bg-zinc-800 transition">
              <div className="w-16 h-16 bg-zinc-950 rounded-lg flex items-center justify-center shrink-0 border border-white/5">
                ${item.type === 'Video' ? html`<${Play} size=${24} className="text-violet-400" />` : html`<${BookOpen} size=${24} className="text-emerald-400" />`}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">${item.type} • ${item.dur}</div>
                <div className="font-bold leading-tight">${item.title}</div>
              </div>
              <div className="ml-auto">
                <${ChevronRight} size=${18} className="text-zinc-600" />
              </div>
            </${Card}>
          `
        )}
      </div>
    </div>
  `;
}

// --- BOOKING VIEW ---
function BookingView({ setTab, addXp, userProfile }) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({});

  const recScore = 88;
  const suggestedServiceId = 'pt60';
  const suggestedReason = 'High protein intake detected. Recovery optimal. Prime time for Hypertrophy.';

  const handleBook = () => {
    setStep(3);
    addXp(selection.service.xp);
  };

  const recommendedService = SERVICES.find((s) => s.id === suggestedServiceId);
  const otherServices = SERVICES.filter((s) => s.id !== suggestedServiceId);

  if (step === 3)
    return html`
      <div className="text-center py-10 space-y-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 mb-4 border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]">
          <${CheckCircle} size=${48} className="animate-in zoom-in delay-200 duration-500" />
        </div>
        <div>
          <h2 className="text-3xl font-black italic mb-2">LOCKED IN.</h2>
          <p className="text-zinc-400">You earned <span className="text-yellow-400 font-mono font-bold">+${selection.service.xp} XP</span> for committing.</p>
        </div>

        <div className="p-6 bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 max-w-xs mx-auto text-sm text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
          <div className="text-xs font-bold text-zinc-500 mb-2 tracking-widest">SESSION DETAILS</div>
          <div className="font-black text-xl text-white mb-1">${selection.service?.name}</div>
          <div className="flex items-center gap-2 text-violet-400 font-mono mb-4">
            <${Clock} size=${14} />
            <span>Tomorrow @ ${selection.time}</span>
          </div>
          <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-zinc-400 text-xs">
            <${MapPin} size=${12} /> ${BRAND.address}
          </div>
        </div>

        <${Button} primary full onClick=${() => setTab('home')}>Return to Base</${Button}>
      </div>
    `;

  return html`
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Book Session</h2>
        <button className="text-xs text-zinc-500 underline" onClick=${() => setTab('home')}>Cancel</button>
      </div>

      ${step === 1 && html`
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">
              <${Zap} size=${14} /> Bio-Analysis
            </div>
            <div className="flex gap-4">
              <div>
                <div className="text-[10px] text-zinc-500 mb-1">RECOVERY SCORE</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">${recScore}%</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 mb-1">LAST WORKOUT</div>
                <div className="text-sm font-bold">Upper Body (48h)</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 mb-1">CURRENT WEIGHT</div>
                <div className="text-sm font-bold">${userProfile.weight} lbs</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">TOBY’S PICK</div>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>

            <${Card}
              onClick=${() => {
                setSelection({ ...selection, service: recommendedService });
                setStep(2);
              }}
              className="cursor-pointer border-violet-500/40 bg-violet-900/10 hover:bg-violet-900/20 transition group active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg z-10">OPTIMAL</div>
              <div className="p-4 pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-lg text-white group-hover:text-violet-300 transition">${recommendedService.name}</div>
                    <${Badge} color="violet">${recommendedService.type}</${Badge}>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-white font-bold">$${recommendedService.price}</span>
                    <span className="text-[10px] text-violet-400 font-mono">+${recommendedService.xp} XP</span>
                  </div>
                </div>

                <div className="flex gap-2 items-start mt-3 bg-black/20 p-2 rounded-lg">
                  <${Info} size=${14} className="text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-400 leading-tight">
                    <span className="text-violet-400 font-bold">Insight: </span>
                    ${suggestedReason}
                  </p>
                </div>
              </div>
            </${Card}>
          </div>

          <div>
            <div className="text-xs font-bold text-zinc-500 mb-3 tracking-widest uppercase">Other Protocols</div>
            <div className="space-y-3">
              ${otherServices.map(
                (s) => html`
                  <${Card}
                    key=${s.id}
                    onClick=${() => {
                      setSelection({ ...selection, service: s });
                      setStep(2);
                    }}
                    className="p-4 cursor-pointer hover:bg-zinc-800 transition group active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-bold text-lg group-hover:text-zinc-300 transition">${s.name}</div>
                        <div className="flex gap-2 mt-1">
                          <${Badge} color="blue">${s.type}</${Badge}>
                          <span className="text-xs text-zinc-500 flex items-center gap-1"><${Clock} size=${10} /> ${s.time}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block font-mono text-zinc-400 font-bold">$${s.price}</span>
                      </div>
                    </div>
                  </${Card}>
                `
              )}
            </div>
          </div>
        </div>
      `}

      ${step === 2 && html`
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <button onClick=${() => setStep(1)} className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-1">
            <${ChevronRight} className="rotate-180" size=${12} /> BACK TO PROTOCOLS
          </button>

          <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <div>
              <div className="text-xs text-zinc-500">SELECTED PROTOCOL</div>
              <div className="font-bold">${selection.service.name}</div>
            </div>
            <div className="font-mono text-violet-400">$${selection.service.price}</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-yellow-500/10 rounded"><${Zap} size=${12} className="text-yellow-500" /></div>
              <div className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Morning Ops</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              ${['6:00 AM', '7:30 AM', '9:00 AM'].map(
                (t) => html`
                  <button
                    key=${t}
                    onClick=${() => setSelection({ ...selection, time: t })}
                    className=${`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${selection.time === t ? 'bg-violet-600 border-violet-500 text-white shadow-lg scale-105' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-400'}`}
                  >
                    ${t}
                  </button>
                `
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-blue-500/10 rounded"><${Zap} size=${12} className="text-blue-500" /></div>
              <div className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Evening Ops</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              ${['4:30 PM', '6:00 PM', '7:30 PM'].map(
                (t) => html`
                  <button
                    key=${t}
                    onClick=${() => setSelection({ ...selection, time: t })}
                    className=${`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${selection.time === t ? 'bg-violet-600 border-violet-500 text-white shadow-lg scale-105' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-400'}`}
                  >
                    ${t}
                  </button>
                `
              )}
            </div>
          </div>

          <div className="pt-4">
            <${Button} primary full disabled=${!selection.time} onClick=${handleBook} icon=${CheckCircle}>Confirm Booking</${Button}>
            <p className="text-center text-[10px] text-zinc-600 mt-4">No charge until check-in. 12h Cancellation policy applies.</p>
          </div>
        </div>
      `}
    </div>
  `;
}

// --- PROFILE & STATS VIEW (NEW SOCIAL STYLE) ---
function ProfileView({ user, log, addFood, close, myXp, level }) {
  const [subTab, setSubTab] = useState('journey');

  return html`
    <div className="pb-20 relative">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-violet-900/40 to-zinc-950 z-0" />

      <div className="relative z-10 flex justify-between items-center mb-4">
        <button onClick=${close} className="p-2 bg-black/20 backdrop-blur rounded-full hover:bg-black/40"><${ArrowLeft} size=${20} /></button>
        <button className="p-2 bg-black/20 backdrop-blur rounded-full hover:bg-black/40"><${Edit3} size=${18} /></button>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-950 relative mb-3">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-800">
            <${User} size=${40} className="text-zinc-600" />
          </div>
          <div className="absolute bottom-0 right-0 bg-zinc-950 p-1 rounded-full">
            <div className="bg-violet-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-zinc-900">
              ${level}
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-black italic uppercase leading-none mb-1">${user.name}</h2>
        <div className="text-zinc-500 text-sm font-medium mb-3">${user.handle}</div>

        <div className="flex gap-4 text-sm mb-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-white">12</span>
            <span className="text-xs text-zinc-500">Workouts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-white">${myXp}</span>
            <span className="text-xs text-zinc-500">Total XP</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-white">4</span>
            <span className="text-xs text-zinc-500">Streak</span>
          </div>
        </div>

        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed mb-4">
          ${user.bio || 'No bio yet.'}
        </p>

        <div className="flex gap-3">
          <${Button} size="sm" className="bg-zinc-800 border-zinc-700">Edit Profile</${Button}>
          <${Button} size="sm" className="bg-zinc-800 border-zinc-700"><${Share2} size=${14} /></${Button}>
        </div>
      </div>

      <div className="flex border-b border-white/10 mb-6 relative z-10">
        <button
          onClick=${() => setSubTab('journey')}
          className=${`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${subTab === 'journey' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500'}`}
        >
          Journey
        </button>
        <button
          onClick=${() => setSubTab('vitals')}
          className=${`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${subTab === 'vitals' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500'}`}
        >
          Vitals
        </button>
        <button
          onClick=${() => setSubTab('badges')}
          className=${`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${subTab === 'badges' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500'}`}
        >
          Badges
        </button>
      </div>

      ${subTab === 'journey' && html`
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          <${Card} className="p-4 bg-zinc-900 border-zinc-800">
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center text-violet-400"><${Dumbbell} size=${18} /></div>
              <div>
                <div className="font-bold text-sm">Crushed Upper Body</div>
                <div className="text-xs text-zinc-500">Yesterday at 6:00 PM</div>
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-3 text-sm text-zinc-300 mb-3 border border-white/5">
              <div className="flex justify-between mb-1"><span>DB Incline</span> <span className="font-mono font-bold">60lbs x 12</span></div>
              <div className="flex justify-between"><span>Pull-Ups</span> <span className="font-mono font-bold">BW+25 x 8</span></div>
            </div>
            <div className="flex gap-4 text-zinc-500 text-xs font-bold">
              <button className="flex items-center gap-1 hover:text-white"><${Heart} size=${14} /> 12</button>
              <button className="flex items-center gap-1 hover:text-white"><${MessageSquare} size=${14} /> 4</button>
            </div>
          </${Card}>

          <${Card} className="p-4 bg-zinc-900 border-zinc-800">
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-400"><${Trophy} size=${18} /></div>
              <div>
                <div className="font-bold text-sm">Rank Up: Level ${level}</div>
                <div className="text-xs text-zinc-500">2 days ago</div>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-3">Unlocked "Iron Disciple" status. Consistency is key.</p>
          </${Card}>
        </div>
      `}

      ${subTab === 'vitals' && html`
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
          <div className="grid grid-cols-2 gap-3">
            <${Card} className="p-4 bg-zinc-900 border-zinc-800">
              <div className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">Weight</div>
              <div className="text-2xl font-black">${user.weight} <span className="text-sm text-zinc-500 font-medium">lbs</span></div>
            </${Card}>
            <${Card} className="p-4 bg-zinc-900 border-zinc-800">
              <div className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">Body Fat</div>
              <div className="text-2xl font-black text-emerald-400">${user.bf}%</div>
            </${Card}>
            <${Card} className="p-4 bg-zinc-900 border-zinc-800">
              <div className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">Height</div>
              <div className="text-xl font-bold">${user.height}</div>
            </${Card}>
            <${Card} className="p-4 bg-zinc-900 border-zinc-800">
              <div className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">Joined</div>
              <div className="text-xl font-bold">${user.joined}</div>
            </${Card}>
          </div>

          <${Card} className="p-4 bg-zinc-900 border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-sm">Weight History</div>
              <${TrendingUp} size=${16} className="text-emerald-500" />
            </div>
            <div className="h-24 flex items-end gap-2">
              ${[40, 35, 50, 45, 60, 55, 30].map(
                (h, i) => html`
                  <div key=${i} className="flex-1 bg-zinc-800 rounded-t-sm relative group">
                    <div className="absolute inset-x-0 bottom-0 bg-violet-600 rounded-t-sm group-hover:bg-violet-500 transition-colors" style=${{ height: `${h}%` }} />
                  </div>
                `
              )}
            </div>
          </${Card}>
        </div>
      `}

      ${subTab === 'badges' && html`
        <div className="grid grid-cols-3 gap-3 animate-in slide-in-from-right duration-300">
          <div className="aspect-square bg-zinc-900 rounded-xl border border-white/5 flex flex-col items-center justify-center p-2 text-center">
            <${Trophy} size=${24} className="text-yellow-500 mb-2" />
            <div className="text-[10px] font-bold">Early Adopter</div>
          </div>
          <div className="aspect-square bg-zinc-900 rounded-xl border border-white/5 flex flex-col items-center justify-center p-2 text-center">
            <${Flame} size=${24} className="text-orange-500 mb-2" />
            <div className="text-[10px] font-bold">7 Day Streak</div>
          </div>
          <div className="aspect-square bg-zinc-900 rounded-xl border border-white/5 flex flex-col items-center justify-center p-2 text-center opacity-50 grayscale">
            <${Dumbbell} size=${24} className="text-zinc-500 mb-2" />
            <div className="text-[10px] font-bold">1000 Club</div>
          </div>
        </div>
      `}
    </div>
  `;
}

// --- COACH VIEW ---
function TobyCoachView() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'toby', text: 'Toby 2.0 Online. I’ve analyzed your recovery data. Your CNS is primed. Do we push for a PR today?' }
  ]);
  const [isListening, setIsListening] = useState(false);

  const addMsg = (text, from = 'user') => {
    setMessages((prev) => [...prev, { id: Date.now(), from, text }]);
  };

  const handleAction = (action) => {
    addMsg(action, 'user');
    setTimeout(() => {
      let resp = '';
      if (action.includes('Push')) resp = 'Love that energy. Let’s hit a Heavy Upper Body session. Warm up with the Neuro Drill first.';
      if (action.includes('Recovery')) resp = 'Smart. Active recovery. 20 min Sauna + 10 min Ice Bath. Book it now?';
      if (action.includes('Surprise')) resp = "Generating 'The Gauntlet' protocol... 4 Rounds, High Intensity. Prepare yourself.";
      addMsg(resp, 'toby');
    }, 1000);
  };

  return html`
    <div className="flex flex-col h-[80vh]">
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <${Zap} size=${20} className="text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div>
            <div className="font-bold leading-none">COACH TOBY</div>
            <div className="text-[10px] text-cyan-500 font-mono mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> SYSTEM ONLINE
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide">
        ${messages.map(
          (m) => html`
            <div key=${m.id} className=${`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className=${`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${m.from === 'user' ? 'bg-violet-600 text-white rounded-tr-sm' : 'bg-zinc-800 text-zinc-200 rounded-tl-sm border border-white/5'}`}>
                ${m.text}
              </div>
            </div>
          `
        )}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        ${['Push for PR 🏋️', 'Recovery Day 🧊', 'Surprise Me 🎲'].map(
          (action) => html`
            <button
              key=${action}
              onClick=${() => handleAction(action)}
              className="whitespace-nowrap px-4 py-2 bg-zinc-900 border border-white/10 rounded-full text-xs font-bold hover:bg-zinc-800 hover:border-violet-500/50 transition-colors"
            >
              ${action}
            </button>
          `
        )}
      </div>

      <div className="relative">
        <div className=${`absolute inset-0 bg-violet-600/20 blur-xl transition-opacity duration-300 ${isListening ? 'opacity-100' : 'opacity-0'}`} />
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex items-center gap-2">
          <input
            className="bg-transparent flex-1 px-3 text-sm focus:outline-none placeholder:text-zinc-600"
            placeholder="Ask Toby..."
            onKeyDown=${(event) => {
              if (event.key === 'Enter') {
                handleAction(event.target.value);
                event.target.value = '';
              }
            }}
          />
          <button
            onClick=${() => setIsListening(!isListening)}
            className=${`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
          >
            <${Mic} size=${18} />
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- GAME HUB (Restored) ---
function GameHubView({ addXp }) {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === 'reaction') return html`<${ReactionGame} onExit=${() => setActiveGame(null)} addXp=${addXp} />`;
  if (activeGame === 'memory') return html`<${MemoryGame} onExit=${() => setActiveGame(null)} addXp=${addXp} />`;

  return html`
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Neuro Lab</h2>
        <p className="text-zinc-400 text-sm max-w-xs mx-auto">Prime your CNS before heavy lifting.</p>
      </div>

      <div className="grid gap-4">
        <${Card} className="group p-0 overflow-hidden" onClick=${() => setActiveGame('reaction')}>
          <div className="h-32 bg-emerald-900/20 relative flex items-center justify-center">
            <${Zap} size=${48} className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>
          <div className="p-4 relative top-[-20px]">
            <div className="flex justify-between items-start mb-1">
              <div className="font-bold text-xl">Reaction Drill</div>
              <${Badge} color="green">SPEED</${Badge}>
            </div>
            <p className="text-xs text-zinc-500 mb-3">Test your raw reaction speed against the clock.</p>
            <${Button} full size="sm">START DRILL</${Button}>
          </div>
        </${Card}>

        <${Card} className="group p-0 overflow-hidden" onClick=${() => setActiveGame('memory')}>
          <div className="h-32 bg-blue-900/20 relative flex items-center justify-center">
            <${Grid} size=${48} className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>
          <div className="p-4 relative top-[-20px]">
            <div className="flex justify-between items-start mb-1">
              <div className="font-bold text-xl">Pattern Grid</div>
              <${Badge} color="blue">FOCUS</${Badge}>
            </div>
            <p className="text-xs text-zinc-500 mb-3">Memorize the pattern and replicate it.</p>
            <${Button} full size="sm">START DRILL</${Button}>
          </div>
        </${Card}>
      </div>
    </div>
  `;
}

function ReactionGame({ onExit, addXp }) {
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const timeRef = useRef(0);

  const start = () => {
    setState('waiting');
    setTimeout(() => {
      setState('go');
      timeRef.current = Date.now();
    }, 2000 + Math.random() * 2000);
  };

  const handleTap = () => {
    if (state === 'waiting') {
      setState('idle');
      setResult('TOO EARLY!');
    } else if (state === 'go') {
      const ms = Date.now() - timeRef.current;
      setResult(`${ms}ms`);
      setState('idle');
      if (ms < 300) addXp(50);
    }
  };

  return html`
    <div className="h-[75vh] flex flex-col relative">
      <button onClick=${onExit} className="absolute top-0 right-0 p-2 z-20 bg-black/20 rounded-full"><${X} /></button>
      <div
        onPointerDown=${handleTap}
        className=${`flex-1 rounded-3xl flex items-center justify-center flex-col gap-4 cursor-pointer transition-colors duration-100 ${state === 'idle' ? 'bg-zinc-900' : state === 'waiting' ? 'bg-red-900/50' : 'bg-emerald-500'}`}
      >
        ${state === 'idle' && html`
          <div className="text-center">
            ${result && html`<div className="text-5xl font-black mb-4">${result}</div>`}
            <${Button} onClick=${(event) => {
              event.stopPropagation();
              start();
            }} primary>START</${Button}>
          </div>
        `}
        ${state === 'waiting' && html`<div className="font-black text-2xl tracking-widest text-red-500">WAIT...</div>`}
        ${state === 'go' && html`<div className="font-black text-6xl italic text-black">TAP!</div>`}
      </div>
    </div>
  `;
}

function MemoryGame({ onExit, addXp }) {
  const [sequence, setSequence] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [flash, setFlash] = useState(-1);

  const playRound = () => {
    const next = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(next);
    setUserSeq([]);
    setPlaying(true);

    next.forEach((idx, i) => {
      setTimeout(() => {
        setFlash(idx);
        setTimeout(() => setFlash(-1), 300);
      }, (i + 1) * 600);
    });
    setTimeout(() => setPlaying(false), (next.length + 1) * 600);
  };

  const handleTap = (idx) => {
    if (playing) return;
    setFlash(idx);
    setTimeout(() => setFlash(-1), 150);

    const nextUser = [...userSeq, idx];
    setUserSeq(nextUser);

    if (nextUser[nextUser.length - 1] !== sequence[nextUser.length - 1]) {
      alert(`Game Over! Score: ${sequence.length}`);
      setSequence([]);
      return;
    }

    if (nextUser.length === sequence.length) {
      addXp(10 * sequence.length);
      setTimeout(playRound, 1000);
    }
  };

  return html`
    <div className="h-[75vh] flex flex-col items-center justify-center relative">
      <button onClick=${onExit} className="absolute top-0 right-0 p-2 z-20 bg-zinc-800 rounded-full"><${X} /></button>
      <div className="mb-8 text-center">
        <h3 className="font-bold text-xl">Memory Grid</h3>
        <p className="text-zinc-500 text-sm">Round: ${sequence.length}</p>
      </div>

      ${sequence.length === 0 && html`<${Button} onClick=${playRound} primary>Start Game</${Button}>`}

      <div className=${`grid grid-cols-2 gap-4 mt-8 ${sequence.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
        ${[0, 1, 2, 3].map(
          (i) => html`
            <button
              key=${i}
              onClick=${() => handleTap(i)}
              className=${`w-32 h-32 rounded-2xl transition-all duration-100 border border-white/5 ${flash === i ? 'bg-white shadow-[0_0_30px_white]' : 'bg-zinc-800'}`}
            />
          `
        )}
      </div>
    </div>
  `;
}

// --- MARKET VIEW ---
function MarketView({ cart, setCart, setShowCart, credits }) {
  const [cat, setCat] = useState('all');

  const filtered = MARKET_ITEMS.filter((m) => cat === 'all' || m.cat === cat);

  return html`
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black italic">MARKET</h2>
        <div className="flex gap-2">
          ${['all', 'fuel', 'gear'].map(
            (c) => html`
              <button
                key=${c}
                onClick=${() => setCat(c)}
                className=${`px-3 py-1 rounded-lg text-xs font-bold uppercase ${cat === c ? 'bg-violet-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
              >
                ${c}
              </button>
            `
          )}
        </div>
      </div>

      ${credits > 0 && html`
        <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-3">
          <${Ticket} className="text-yellow-500" size=${20} />
          <div>
            <div className="text-sm font-bold text-yellow-500">${credits} FREE FOOD CREDITS</div>
            <div className="text-xs text-zinc-400">Apply at checkout to get item for free.</div>
          </div>
        </div>
      `}

      <div className="grid grid-cols-2 gap-3 pb-20">
        ${filtered.map(
          (item, i) => html`
            <div key=${item.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 group animate-in zoom-in duration-500" style=${{ animationDelay: `${i * 50}ms` }}>
              <div className="h-32 bg-zinc-800 relative overflow-hidden">
                <img src=${item.img} alt=${item.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition duration-700" />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[8px] font-bold text-white tracking-wide border border-white/10">
                  ${item.tag}
                </div>
              </div>
              <div className="p-3">
                <div className="font-bold text-sm leading-tight mb-1 truncate">${item.name}</div>
                <div className="flex justify-between items-center">
                  <div className="text-zinc-500 text-xs font-mono">$${item.price}</div>
                  <div className="text-[10px] text-yellow-500 font-bold">+${item.xp} XP</div>
                </div>
                <button
                  onClick=${() => {
                    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
                    setShowCart(true);
                  }}
                  className="mt-3 w-full py-2 bg-zinc-800 hover:bg-white hover:text-black transition rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 border border-white/5"
                >
                  ADD <${Plus} size=${12} />
                </button>
              </div>
            </div>
          `
        )}
      </div>
    </div>
  `;
}

function CartModal({ cart, setCart, close, addXp, addFood, credits, setCredits }) {
  const [eatingNow, setEatingNow] = useState(false);
  const [useCredit, setUseCredit] = useState(false);

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MARKET_ITEMS.find((m) => m.id === id);
    return sum + item.price * qty;
  }, 0);

  let finalTotal = total;
  if (useCredit && credits > 0) {
    let maxPrice = 0;
    Object.keys(cart).forEach((id) => {
      const item = MARKET_ITEMS.find((m) => m.id === id);
      if (item.price > maxPrice) maxPrice = item.price;
    });
    finalTotal = Math.max(0, total - maxPrice);
  }

  const handleCheckout = () => {
    addXp(100);

    if (useCredit && credits > 0) {
      setCredits((c) => c - 1);
    }

    if (eatingNow) {
      Object.entries(cart).forEach(([id, qty]) => {
        const item = MARKET_ITEMS.find((m) => m.id === id);
        if (item.cat === 'fuel') {
          for (let i = 0; i < qty; i += 1) addFood(item);
        }
      });
      alert('Fuel logged to your stats!');
    } else {
      alert('Order sent to desk!');
    }

    setCart({});
    close();
  };

  return html`
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-zinc-950 w-full max-w-md rounded-3xl border border-white/10 p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black italic uppercase">Your Stash</h3>
          <button onClick=${close}><${X} size=${20} /></button>
        </div>
        <div className="space-y-4 mb-8">
          ${Object.entries(cart).map(([id, qty]) => {
            const item = MARKET_ITEMS.find((m) => m.id === id);
            return html`
              <div key=${id} className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-xl">
                <div className="font-bold text-sm">${item.name} <span className="text-zinc-500">x${qty}</span></div>
                <div className="font-mono text-sm">$${(item.price * qty).toFixed(2)}</div>
              </div>
            `;
          })}
        </div>

        ${credits > 0 && html`
          <div className="mb-4 flex items-center gap-3 bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 cursor-pointer" onClick=${() => setUseCredit(!useCredit)}>
            <div className=${`w-5 h-5 rounded border flex items-center justify-center ${useCredit ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-zinc-600'}`}>
              ${useCredit && html`<${CheckCircle} size=${14} />`}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm text-yellow-500">Redeem Free Item Credit</div>
              <div className="text-xs text-zinc-400">Balance: ${credits} Credits</div>
            </div>
          </div>
        `}

        <div className="mb-6 flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-white/5 cursor-pointer" onClick=${() => setEatingNow(!eatingNow)}>
          <div className=${`w-5 h-5 rounded border flex items-center justify-center ${eatingNow ? 'bg-violet-600 border-violet-500' : 'border-zinc-600'}`}>
            ${eatingNow && html`<${CheckCircle} size=${14} />`}
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">Consume Now?</div>
            <div className="text-xs text-zinc-500">Automatically add to nutrition log</div>
          </div>
        </div>

        <${Button} primary full onClick=${handleCheckout} disabled=${total === 0} icon=${CreditCard}>
          Pay $${finalTotal.toFixed(2)}
        </${Button}>
      </div>
    </div>
  `;
}

function PassModal({ close, user }) {
  return html`
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
      <div className="bg-white text-black w-full max-w-sm rounded-3xl overflow-hidden relative animate-in zoom-in duration-300">
        <button onClick=${close} className="absolute top-4 right-4 z-10 bg-black/10 p-2 rounded-full"><${X} size=${20} /></button>

        <div className="h-32 bg-zinc-900 relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-black italic text-white">L</div>
            <span className="font-bold text-white tracking-widest">THE LAB</span>
          </div>
          <div className="text-zinc-400 text-xs font-mono uppercase">Access Pass</div>
        </div>

        <div className="p-8 flex flex-col items-center -mt-10">
          <div className="bg-white p-2 rounded-2xl shadow-xl mb-6">
            <div className="w-48 h-48 bg-zinc-900 rounded-xl flex items-center justify-center">
              <${QrCode} size=${100} className="text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-black italic uppercase mb-1">${user.name}</h3>
          <${Badge} color="violet">LEVEL ${user.level} ATHLETE</${Badge}>

          <div className="mt-8 w-full border-t border-zinc-100 pt-4 flex justify-between text-xs font-mono text-zinc-500">
            <span>ID: 884-299</span>
            <span>VALID: TODAY</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

    if (!rootElement) return;
    const root = createRoot(rootElement);
    root.render(html`<${TheLabUltimate} />`);
    document.documentElement.dataset.membersLoaded = 'true';
    window.dispatchEvent(new Event('members-app-loaded'));
  } catch (error) {
    console.error('Unable to load core modules.', error);
    renderFallback('Unable to load core modules. Please allow scripts from esm.sh and reload.');
  }
};

loadApp();
