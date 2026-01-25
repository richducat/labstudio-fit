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

const loadApp = async () => {
  try {
    const [[React, ReactDom, htm]] = await Promise.all([reactDeps()]);
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
    const icons = { ...fallbackIcons };
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

const TOBY_INTERNAL_LLM = {
  description: 'Internal coaching protocol + intake NLU reference for Toby AI.',
  coachingProtocolModules: [
    {
      title: 'Motivation + outcomes',
      prompts: ['What motivated you to sign up?', 'What would you like to get out of working together?']
    },
    {
      title: 'Current habits + context',
      prompts: ['Current eating habits, movement habits, what has worked before, what failed before.']
    },
    {
      title: 'Stress, energy, recovery',
      prompts: ['Stress high/low moments, what fills/empties energy, sleep goals.']
    },
    {
      title: 'Barriers / pain points',
      prompts: ['Time, motivation, confusion, injury/pain, equipment, budget, etc. (these become your “pain point” taxonomy).']
    },
    {
      title: 'Goals with time horizons',
      prompts: [
        'Some forms literally structure goals as Month 1 / Month 2 / Month 3 / Beyond categories (sleep, self-care, stress, fitness, nutrition).'
      ]
    },
    {
      title: 'Coaching relationship expectations + readiness',
      prompts: ['Expectations, what they’ll commit to, willingness to change, etc.']
    }
  ],
  sessionStructureFramework: 'GROW (Topic → Goal → Reality → Options → Will Do).',
  intakePipelineOverview: [
    'Intake ingestion: user can write anything.',
    'NLU extraction layer (hybrid): LLM JSON extraction, deterministic safety scan, embedding + taxonomy mapping.',
    'Canonical profile output: structured JSON for goals, pain points, constraints, preferences.',
    'Follow-up question generator for low confidence or ambiguity.',
    'Program matching / protocol routing based on canonical profile.'
  ],
  dataModelStandardsNote: [
    'Represent goals in a formal way (FHIR Goal resource).',
    'Represent intake answers using a form/response pattern (FHIR QuestionnaireResponse).',
    'FHIR is optional but a useful reference for durable schemas.'
  ],
  privacyWarning:
    'Collecting pain, injuries, and health goals is sensitive health-related data. Review HHS resources and state consumer health data laws; even if HIPAA does not apply, privacy obligations may.',
  fitTrackProIntakeBrain: {
    purpose:
      'Capture the core FitTrack Pro intake logic for Toby AI without shipping a separate app UI.',
    intakeSignals: [
      'goal',
      'activity_level',
      'injuries',
      'schedule',
      'nutrition',
      'firstName',
      'lastName',
      'email',
      'phone'
    ],
    intakeStages: ['landing', 'intake', 'report', 'payment', 'dashboard'],
    coachingGuidance: [
      'Use goal + activity level to set baseline intensity and split selection.',
      'Route injury responses through safety triage and corrective exercise planning.',
      'Leverage schedule answers to prioritize consistency and realistic frequency.',
      'Use nutrition rating to set macro guidance and follow-up prompts.'
    ],
    conversionFlow: [
      'Multi-step assessment with guided insights.',
      'Reveal report summary with plan highlights.',
      'Offer subscription gate to activate plan.',
      'Unlock dashboard experience for ongoing coaching.'
    ],
    safetyNote:
      'If users disclose pain or red-flag symptoms, trigger triage and recommend human review before vigorous training.'
  },
  llmExtractionPromptTemplate: `# LLM Extraction Prompt (Template)

Use this prompt for an LLM step that converts **messy, layman, unstructured** text into a structured JSON profile.

---

## System / Developer (recommended)

You are an extraction engine for a fitness/health coaching intake.
- Output **only** valid JSON.
- Never provide medical diagnosis.
- If the user mentions any possible red flags (e.g., chest pain, fainting, pregnancy, severe dizziness, heart condition, serious joint issues), set \`triage.requires_human_review = true\` and add appropriate \`triage.recommendations\`.
- Prefer *asking follow-up questions* when uncertain rather than guessing.
- Map layman phrases to canonical codes using the provided taxonomy.

---

## Inputs

### User text
{{USER_TEXT}}

### Taxonomy (JSON)
{{TAXONOMY_JSON}}

---

## Output JSON schema (high level)

Return an object with:
- raw_input: { text, locale?, channel? }
- extractions: { goals[], pain_points[], constraints{}, preferences{} }
- triage: { safety_flags[], recommendations[], requires_human_review }
- followups[] (0-5 questions)
- meta: { model, created_at, confidence_overall, trace_id }

### Rules
- \`confidence\` must be between 0 and 1.
- \`goals[].priority\`: 1 = most important.
- Include \`user_phrase\` to show *exactly* what you matched.
- If the user gives a numeric target ("lose 20 lbs"), store it in \`goals[].target.value/unit\` and also keep the original phrase.

---

## Example (mini)

User: "I want to tone up, but my knee hurts when I run. I only have dumbbells at home and can train 3 days/week."

Expected goal mapping:
- "tone up" -> body_recomposition
Pain point:
- "knee hurts when I run" -> pain_or_injury
Constraints:
- equipment: "dumbbells at home"
- schedule: "3 days/week"`,
  referenceImplementationSkeleton: `"""Intake NLU pipeline (reference implementation skeleton)

This file is intentionally dependency-light and framework-agnostic.
Plug in your chosen LLM + embedding model provider.

Key ideas:
- taxonomy-first normalization
- LLM JSON extraction (structured output)
- safety/triage pass (deterministic + LLM)
- confidence + follow-up generation
"""

from __future__ import annotations
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple
import json
import uuid
from datetime import datetime, timezone


@dataclass
class AnalyzeRequest:
    text: str
    channel: str = "chat"
    locale: str = "en-US"
    user_id: Optional[str] = None
    session_id: Optional[str] = None


def load_taxonomy(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def deterministic_safety_scan(text: str, taxonomy: Dict[str, Any]) -> List[Dict[str, str]]:
    """Fast keyword scan for safety flags. Keep it conservative."""
    text_l = text.lower()
    hits: List[Dict[str, str]] = []
    for flag in taxonomy.get("safety_flags", []):
        for phrase in flag.get("trigger_phrases", []):
            if phrase.lower() in text_l:
                hits.append({"code": flag["code"], "evidence": phrase})
                break
    return hits


def call_llm_extract_json(text: str, taxonomy: Dict[str, Any]) -> Dict[str, Any]:
    """Replace this with your LLM call. Must return a dict matching the schema."""
    # PSEUDO:
    # prompt = render_template("llm_extraction_prompt.md", USER_TEXT=text, TAXONOMY_JSON=json.dumps(taxonomy))
    # raw = llm.complete(prompt, response_format="json")
    # return json.loads(raw)
    raise NotImplementedError


def analyze_intake(req: AnalyzeRequest, taxonomy: Dict[str, Any]) -> Dict[str, Any]:
    trace_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    # 1) Deterministic safety scan (fast)
    safety_hits = deterministic_safety_scan(req.text, taxonomy)

    # 2) LLM extraction into structured JSON
    profile = call_llm_extract_json(req.text, taxonomy)

    # 3) Merge/override triage with deterministic safety
    triage = profile.setdefault("triage", {})
    triage_flags = triage.setdefault("safety_flags", [])
    existing_codes = {f.get("code") for f in triage_flags}

    for h in safety_hits:
        if h["code"] not in existing_codes:
            triage_flags.append(h)

    if triage_flags:
        triage["requires_human_review"] = True
        triage.setdefault("recommendations", []).append(
            "Possible health/safety flags detected; route to human review and consider recommending medical clearance."
        )
    else:
        triage.setdefault("requires_human_review", False)

    # 4) Add meta
    meta = profile.setdefault("meta", {})
    meta.setdefault("model", "your-llm-name")
    meta.setdefault("created_at", created_at)
    meta.setdefault("trace_id", trace_id)

    # 5) Ensure raw_input recorded
    profile.setdefault("raw_input", {})
    profile["raw_input"].setdefault("text", req.text)
    profile["raw_input"].setdefault("channel", req.channel)
    profile["raw_input"].setdefault("locale", req.locale)

    return profile`,
  webDataCollectionPlaybook: `# Web Data Collection Playbook (Ethical + Practical)

This playbook is for gathering *inspiration data* (e.g., common intake question topics, common goal phrases, common objections)
to build your own coaching intake and NLU taxonomy.

This is **not legal advice**.

---

## 1) Prefer licensed / open sources first
Before scraping, look for:
- Official APIs
- Downloadable PDFs with explicit reuse permission
- Open datasets (e.g., academic corpora, Kaggle/Hugging Face datasets)
- Content you authored or have explicit rights to use

---

## 2) Always respect site rules + consent signals
At minimum:
- Read \`robots.txt\` and follow it
- Follow site Terms of Service and any explicit data access policies
- Do not bypass paywalls, logins, or technical restrictions
- Avoid scraping personal data

Good industry guidance (start here):
- Zyte: https://www.zyte.com/learn/web-scraping-best-practices/
- PromptCloud (robots.txt + ethics): https://www.promptcloud.com/blog/robots-txt-scraping-compliance-guide/

---

## 3) Be a good web citizen (operational etiquette)
- Rate limit (per-domain + global)
- Add jitter (randomized small delays)
- Identify your crawler with a stable User-Agent + contact info
- Cache responses so you don't hit the same pages repeatedly
- Stop or reduce load if you see elevated error rates

---

## 4) Don’t collect what you don’t need
For building a goals/pain-points detector, you usually only need:
- Short phrases or paraphrases ("tone up", "get less winded")
- Non-identifying examples
- Category counts (how common is a phrase)

You typically do NOT need:
- Full articles
- User names/emails/phone numbers
- Full forum threads

---

## 5) Copyright and “cloning” risk
Avoid storing or reproducing full page copy (marketing pages, articles, ebooks).
Instead:
- Extract *facts* and *signals* (e.g., section headings, CTA types, form field names)
- Transform content into abstract representations (taxonomies, embeddings, statistics)
- Generate your own original copy

---

## 6) Health data privacy (important)
If your product collects anything that can reveal a person’s physical/mental condition, treat it as sensitive.
In the US, some health apps may not be covered by HIPAA but can still be regulated by state privacy laws.

Start here:
- HHS resources for mobile health app developers: https://www.hhs.gov/hipaa/for-professionals/special-topics/health-apps/index.html

You should talk to counsel about:
- Consent flows
- Data retention/deletion
- Vendor contracts (DPAs/BAAs where relevant)
- Security controls (encryption, access logging)

---

## 7) Minimal crawler outline (pseudo)
- Seed list of URLs (only allowed domains)
- Fetch \`robots.txt\`, parse with a real parser
- Crawl only allowed paths
- Extract only what you need (headings, short phrases, form labels)
- Store hashed URLs + timestamps + extracted snippets`,
  taxonomy: {
    version: '1.0.0',
    updated_at: '2026-01-25',
    domain: 'fitness_health_coaching_intake',
    notes: [
      'This taxonomy is intended for intent + slot extraction from free text (layman phrasing included).',
      'All items are self-reported; nothing here is diagnostic or medical advice.',
      'You should customize categories/phrases for your niche (e.g., postpartum, strength sport, runners, etc.).'
    ],
    goal_categories: [
      {
        code: 'fat_loss',
        label: 'Fat loss',
        common_phrases: [
          'lose fat',
          'burn fat',
          'trim down',
          'lean out',
          'drop body fat',
          'get rid of belly fat',
          'lose my love handles',
          'slim down'
        ],
        related: ['body_recomposition', 'weight_loss', 'cardio_endurance']
      },
      {
        code: 'weight_loss',
        label: 'Weight loss',
        common_phrases: ['lose weight', 'drop pounds', 'get to a healthier weight', 'cut down', 'be lighter'],
        related: ['fat_loss', 'body_recomposition']
      },
      {
        code: 'weight_gain',
        label: 'Weight gain',
        common_phrases: ['gain weight', 'put on weight', 'bulk up', 'get bigger'],
        related: ['muscle_gain']
      },
      {
        code: 'muscle_gain',
        label: 'Muscle gain',
        common_phrases: [
          'build muscle',
          'put on muscle',
          'get stronger muscles',
          'hypertrophy',
          'grow my glutes',
          'add lean mass',
          'get more muscle definition'
        ],
        related: ['strength', 'body_recomposition']
      },
      {
        code: 'strength',
        label: 'Strength',
        common_phrases: ['get stronger', 'increase my lifts', 'be stronger', 'lift heavier', 'powerlifting'],
        related: ['muscle_gain', 'athletic_performance']
      },
      {
        code: 'cardio_endurance',
        label: 'Cardio & endurance',
        common_phrases: [
          'get less winded',
          'better stamina',
          'endurance',
          'cardio',
          'run longer',
          'walk without getting tired',
          'keep up with my kids'
        ],
        related: ['general_fitness', 'heart_health']
      },
      {
        code: 'mobility_flexibility',
        label: 'Mobility & flexibility',
        common_phrases: ['be more flexible', 'mobility', 'move better', 'less stiff', 'stretching'],
        related: ['pain_reduction', 'posture_movement_quality']
      },
      {
        code: 'pain_reduction',
        label: 'Reduce aches & pains',
        common_phrases: ['back pain', 'knee pain', 'hip pain', 'shoulder pain', 'aches and pains', 'I hurt when I move', 'nagging pain'],
        related: ['injury_rehab', 'mobility_flexibility']
      },
      {
        code: 'injury_rehab',
        label: 'Injury rehab / return to activity',
        common_phrases: ['recover from an injury', 'return to running', 'get back to training', 'PT', 'rehab'],
        related: ['pain_reduction', 'athletic_performance']
      },
      {
        code: 'body_recomposition',
        label: 'Body recomposition',
        common_phrases: ['tone up', 'get lean and strong', 'lose fat and build muscle', 'tighten up', 'look more defined'],
        related: ['fat_loss', 'muscle_gain']
      },
      {
        code: 'general_fitness',
        label: 'General fitness & health',
        common_phrases: ['get in shape', 'be healthier', 'improve my health', 'feel better', 'be fit'],
        related: ['energy_vitality', 'cardio_endurance', 'strength']
      },
      {
        code: 'energy_vitality',
        label: 'Energy & vitality',
        common_phrases: ['more energy', 'less tired', 'fatigue', 'feel energized', 'stop feeling exhausted'],
        related: ['sleep', 'stress_management']
      },
      {
        code: 'sleep',
        label: 'Sleep improvement',
        common_phrases: ['sleep better', 'insomnia', 'sleep quality', 'wake up tired'],
        related: ['stress_management', 'energy_vitality']
      },
      {
        code: 'stress_management',
        label: 'Stress & mental wellbeing',
        common_phrases: ['stress', 'anxiety', 'overwhelmed', 'burned out', 'better mindset', 'mental health'],
        related: ['sleep', 'emotional_eating']
      },
      {
        code: 'nutrition_habits',
        label: 'Nutrition habits',
        common_phrases: ['eat better', 'improve my diet', 'meal prep', 'stop snacking', 'nutrition', 'healthy eating'],
        related: ['weight_loss', 'fat_loss', 'energy_vitality']
      },
      {
        code: 'athletic_performance',
        label: 'Sport / performance',
        common_phrases: ['get faster', 'jump higher', 'sports performance', 'train for a race', 'improve performance'],
        related: ['strength', 'cardio_endurance', 'mobility_flexibility']
      }
    ],
    pain_points: [
      {
        code: 'time_constraints',
        label: 'Time constraints',
        common_phrases: [
          'no time',
          'busy schedule',
          'work is crazy',
          'kids schedule',
          "can't fit workouts in",
          'too many responsibilities'
        ]
      },
      {
        code: 'low_motivation',
        label: 'Low motivation / consistency',
        common_phrases: ['I can\'t stay consistent', 'I start and stop', 'I fall off', 'no motivation', 'I get bored', 'hard to stick to it']
      },
      {
        code: 'confusion',
        label: 'Confusion about what to do',
        common_phrases: [
          "I don't know what to do",
          'too much information',
          'confused by conflicting advice',
          'what should I eat',
          'what workouts should I do',
          'I need a plan'
        ]
      },
      {
        code: 'plateau',
        label: 'Plateau / not seeing results',
        common_phrases: ['nothing is working', 'stuck', 'plateau', 'not seeing progress', "my weight won't budge", 'my lifts stopped going up']
      },
      {
        code: 'pain_or_injury',
        label: 'Pain or injury limiting activity',
        common_phrases: ['knee hurts', 'back hurts', 'shoulder pain', 'injury', "I can't do squats", 'pain when I run']
      },
      {
        code: 'stress_or_overwhelm',
        label: 'Stress / overwhelm',
        common_phrases: ['stressed', 'overwhelmed', 'burnt out', 'I stress eat', 'too much going on']
      },
      {
        code: 'sleep_deprivation',
        label: 'Poor sleep',
        common_phrases: ["I don't sleep", 'up at night', 'new baby', 'wake up tired', 'insomnia']
      },
      {
        code: 'dietary_restrictions',
        label: 'Dietary restrictions or preferences',
        common_phrases: ['vegetarian', 'vegan', 'gluten free', 'dairy free', 'food allergies', 'religious diet']
      },
      {
        code: 'budget_constraints',
        label: 'Budget constraints',
        common_phrases: ["can't afford", 'budget', 'too expensive', 'low cost']
      },
      {
        code: 'equipment_constraints',
        label: 'Limited equipment / space',
        common_phrases: ['no gym', 'work out at home', 'small apartment', 'only dumbbells', 'no equipment']
      }
    ],
    preference_slots: {
      training_environment: {
        allowed: ['home', 'gym', 'outdoors', 'hybrid', 'unknown'],
        layman_phrases: {
          home: ['at home', 'in my living room', 'garage gym', "I don't go to the gym"],
          gym: ['at the gym', 'lifting gym', 'fitness center', 'weight room'],
          outdoors: ['outside', 'park', 'trail', 'running outside'],
          hybrid: ['mix of home and gym', 'some days home some gym']
        }
      },
      schedule: {
        examples: ['3 days/week, 45 minutes', 'weekday mornings', 'weekends only', 'travel 2 weeks/month']
      },
      diet_style: {
        allowed: ['no_preference', 'calorie_tracking', 'macro_tracking', 'keto_low_carb', 'high_protein', 'mediterranean_style', 'plant_based', 'other'],
        layman_phrases: {
          calorie_tracking: ['count calories', 'track calories', 'calories in calories out'],
          macro_tracking: ['track macros', 'protein carbs fat', 'macros'],
          keto_low_carb: ['keto', 'low carb', 'cut carbs'],
          high_protein: ['more protein', 'high protein'],
          plant_based: ['vegan', 'plant based', 'vegetarian']
        }
      }
    },
    safety_flags: [
      {
        code: 'chest_pain',
        label: 'Chest pain (at rest or with activity)',
        trigger_phrases: ['chest pain', 'tightness in chest', 'pressure in chest', 'pain in my chest']
      },
      {
        code: 'dizziness_fainting',
        label: 'Dizziness / fainting / loss of consciousness',
        trigger_phrases: ['I fainted', 'passed out', 'blackout', 'dizzy spells', 'lose balance from dizziness']
      },
      {
        code: 'heart_condition_or_bp',
        label: 'Heart condition or high blood pressure (self-reported)',
        trigger_phrases: ['heart condition', 'heart disease', 'high blood pressure', 'hypertension', 'cardiovascular disease']
      },
      {
        code: 'pregnancy',
        label: 'Pregnancy',
        trigger_phrases: ['pregnant', 'expecting', 'due in', 'postpartum', 'just had a baby']
      },
      {
        code: 'bone_joint_issue',
        label: 'Bone or joint issue made worse by activity',
        trigger_phrases: ['joint problem', 'arthritis', 'osteoporosis', 'bone issue', 'disc problem']
      }
    ]
  },
  schema: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://example.com/schemas/intake_user_profile.schema.json',
    title: 'IntakeUserProfile',
    type: 'object',
    required: ['raw_input', 'extractions', 'triage', 'meta'],
    properties: {
      raw_input: {
        type: 'object',
        required: ['text'],
        properties: {
          text: { type: 'string' },
          locale: { type: 'string', description: 'BCP-47 language tag if known, e.g., en-US' },
          channel: { type: 'string', enum: ['chat', 'form', 'voice', 'email', 'other'] }
        }
      },
      extractions: {
        type: 'object',
        required: ['goals', 'pain_points', 'constraints', 'preferences'],
        properties: {
          goals: {
            type: 'array',
            items: {
              type: 'object',
              required: ['code', 'user_phrase', 'confidence'],
              properties: {
                code: { type: 'string' },
                label: { type: 'string' },
                user_phrase: { type: 'string' },
                confidence: { type: 'number', minimum: 0, maximum: 1 },
                priority: { type: 'integer', minimum: 1 },
                timeframe: { type: 'string', description: "e.g., 'by June', 'in 12 weeks'" },
                target: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                    unit: { type: 'string' },
                    notes: { type: 'string' }
                  }
                }
              }
            }
          },
          pain_points: {
            type: 'array',
            items: {
              type: 'object',
              required: ['code', 'evidence', 'confidence'],
              properties: {
                code: { type: 'string' },
                label: { type: 'string' },
                evidence: { type: 'string' },
                severity: { type: 'string', enum: ['low', 'medium', 'high', 'unknown'] },
                confidence: { type: 'number', minimum: 0, maximum: 1 }
              }
            }
          },
          constraints: {
            type: 'object',
            properties: {
              injuries: { type: 'array', items: { type: 'string' } },
              schedule: { type: 'string' },
              equipment: { type: 'string' },
              experience_level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'unknown'] },
              dietary_restrictions: { type: 'array', items: { type: 'string' } }
            },
            additionalProperties: true
          },
          preferences: {
            type: 'object',
            properties: {
              training_environment: { type: 'string' },
              diet_style: { type: 'string' },
              coaching_style: { type: 'string', description: "e.g., 'high structure', 'flexible', 'accountability-first'" },
              communication: { type: 'string', description: "e.g., 'text', 'email', 'weekly calls'" }
            },
            additionalProperties: true
          }
        },
        additionalProperties: false
      },
      triage: {
        type: 'object',
        required: ['safety_flags', 'recommendations', 'requires_human_review'],
        properties: {
          safety_flags: {
            type: 'array',
            items: {
              type: 'object',
              required: ['code', 'evidence'],
              properties: {
                code: { type: 'string' },
                evidence: { type: 'string' }
              }
            }
          },
          recommendations: {
            type: 'array',
            items: { type: 'string' },
            description: 'Non-medical guidance such as "Ask user to consult clinician before vigorous exercise" or "Ask follow-up question".'
          },
          requires_human_review: { type: 'boolean' }
        }
      },
      followups: {
        type: 'array',
        items: {
          type: 'object',
          required: ['question', 'reason'],
          properties: {
            question: { type: 'string' },
            reason: { type: 'string' },
            priority: { type: 'integer', minimum: 1 }
          }
        }
      },
      meta: {
        type: 'object',
        required: ['model', 'created_at'],
        properties: {
          model: { type: 'string' },
          created_at: { type: 'string' },
          confidence_overall: { type: 'number', minimum: 0, maximum: 1 },
          trace_id: { type: 'string' }
        }
      }
    }
  }
};

const DAILY_AGENDA = [
  { id: 'w1', title: 'Upper Body Hypertrophy', time: '6:00 AM', type: 'Workout', action: 'workout' },
  { id: 'c1', title: 'Zone 2 Cardio Ride', time: '12:30 PM', type: 'Cardio', action: 'workout' },
  { id: 'h1', title: 'Hydration Check', time: '2:00 PM', type: 'Habit', action: 'habits' },
  { id: 'p1', title: 'Progress Photo', time: '8:30 PM', type: 'Check-in', action: 'progress' }
];

const PROGRESS_TILES = [
  { id: 'weight', label: 'Body Weight', value: '185 lbs', trend: '+0.4 wk', icon: Scale },
  { id: 'bodyfat', label: 'Body Fat', value: '14.0%', trend: '-0.3 wk', icon: Activity },
  { id: 'rhr', label: 'Resting HR', value: '58 bpm', trend: '-2 bpm', icon: Heart },
  { id: 'photos', label: 'Progress Photos', value: '3 New', trend: 'Added today', icon: Camera },
  { id: 'nutrition', label: 'Nutrition Avg', value: '92% compliant', trend: '+4% wk', icon: Utensils },
  { id: 'strength', label: 'Strength PRs', value: '2 this month', trend: 'New bench PR', icon: TrendingUp }
];

const WORKOUT_PROGRAMS = [
  {
    id: 'regular',
    title: 'Regular Strength',
    type: 'Regular',
    desc: 'Track sets, rests, and personal bests.',
    icon: Dumbbell,
    data: WORKOUT_TEMPLATE
  },
  {
    id: 'circuit',
    title: 'Metcon Circuit',
    type: 'Circuit',
    desc: 'Move station-to-station with guided timers.',
    icon: Zap,
    data: {
      name: 'Full Body Circuit',
      rounds: 3,
      stations: [
        { name: 'Kettlebell Swings', dur: 45 },
        { name: 'Push-Ups', dur: 45 },
        { name: 'Row Erg', dur: 60 },
        { name: 'Walking Lunges', dur: 45 }
      ],
      rest: 30
    }
  },
  {
    id: 'interval',
    title: 'Hands-Free Interval',
    type: 'Interval',
    desc: 'Voice cues + timers for focus.',
    icon: Timer,
    data: {
      name: 'Sprint Intervals',
      blocks: [
        { label: 'Warm Up', dur: 180 },
        { label: 'Sprint', dur: 40 },
        { label: 'Recover', dur: 80 },
        { label: 'Sprint', dur: 40 },
        { label: 'Recover', dur: 80 },
        { label: 'Cooldown', dur: 180 }
      ]
    }
  },
  {
    id: 'video',
    title: 'Coach Video',
    type: 'Video',
    desc: 'Follow-along workout with form cues.',
    icon: Video,
    data: {
      name: 'Coach Nicole: Total Core',
      length: '22 min',
      checkpoints: ['Warm-up flow', 'Core ladder', 'Cooldown stretch']
    }
  }
];

const NUTRITION_GOALS = {
  calories: 2200,
  protein: 180,
  carbs: 210,
  fat: 65
};

const HABIT_LIBRARY = [
  { id: 'habit-1', title: 'Hydrate 100oz', schedule: 'Daily', coach: 'Coach Maya' },
  { id: 'habit-2', title: '10-Min Mobility', schedule: 'Mon/Wed/Fri', coach: 'Coach Toby' },
  { id: 'habit-3', title: 'Protein with Breakfast', schedule: 'Daily', coach: 'Coach Nicole' },
  { id: 'habit-4', title: 'Sleep by 10:30 PM', schedule: 'Weeknights', coach: 'Coach Maya' }
];

const AUTO_MESSAGES = [
  { id: 'auto-1', title: 'Morning Momentum', when: 'Daily • 7:00 AM', status: 'Active', preview: 'Start with 20oz water and 5 mins mobility.' },
  { id: 'auto-2', title: 'Midday Nutrition Tip', when: 'Mon/Wed/Fri • 12:00 PM', status: 'Active', preview: 'Aim for 35g protein at lunch.' },
  { id: 'auto-3', title: 'Weekend Upsell', when: 'Sat • 10:00 AM', status: 'Paused', preview: 'Book a recovery session for bonus XP.' }
];

const GROUPS = [
  { id: 'group-1', name: 'Lab Studio Prime', members: 412, focus: 'Hypertrophy & Strength' },
  { id: 'group-2', name: 'Sunrise Runners', members: 128, focus: 'Cardio + Mobility' }
];

const GROUP_FEED = [
  { id: 'post-1', author: 'Coach Maya', text: 'Shoutout to everyone who hit hydration goals this week! 💧', time: '2h ago', tags: ['announcement'] },
  { id: 'post-2', author: 'Sarah J.', text: 'New PR on deadlifts: 225x3! 🎉', time: '4h ago', tags: ['milestone'] },
  { id: 'post-3', author: 'Lab Auto', text: 'Community streak: 82% hit nutrition goals yesterday!', time: '6h ago', tags: ['auto'] }
];

const CHALLENGE_MODES = [
  {
    id: 'leaderboard',
    title: 'Team Ladder',
    mode: 'Leaderboard',
    desc: 'Earn points for workouts, habits, and nutrition compliance.',
    points: { workout: 120, habit: 20, nutrition: 50, pr: 200 }
  },
  {
    id: 'threshold',
    title: 'Consistency Threshold',
    mode: 'Threshold',
    desc: 'Hit 5 workouts + 12 habits this week to unlock rewards.',
    threshold: { workouts: 5, habits: 12, bonus: 'Free Recovery Session' }
  }
];

const WEARABLES = [
  { id: 'apple-health', name: 'Apple Health', status: 'Connected', metrics: ['Steps', 'Sleep', 'HRV'] },
  { id: 'google-health', name: 'Google Health Connect', status: 'Connect', metrics: ['Steps', 'Sleep', 'Heart Rate'] },
  { id: 'apple-watch', name: 'Apple Watch', status: 'Ready', metrics: ['Workouts', 'Habits', 'Check-ins'] }
];

// --- UTILS & COMPONENTS ---

const QUERY = new URLSearchParams(window.location.search);
const TEST_MODE = QUERY.get('testMode') === '1' || QUERY.get('test') === '1' || QUERY.get('test') === 'true';
const FORCE_ERROR = QUERY.get('fail') === '1';
const APP_STORAGE = {
  onboarding: 'lab-onboarding-complete',
  profile: 'lab-user-profile',
  log: 'lab-telemetry',
  lastStep: 'lab-last-step',
  session: 'lab-session-id'
};

const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage write failures (private mode, etc.)
  }
};

const getSessionId = () => {
  const existing = readStorage(APP_STORAGE.session, null);
  if (existing) return existing;
  const next = `lab-${Math.random().toString(36).slice(2, 10)}`;
  writeStorage(APP_STORAGE.session, next);
  return next;
};

const logEvent = (name, payload = {}) => {
  const entry = { id: Date.now(), ts: new Date().toISOString(), session: getSessionId(), name, payload };
  const existing = readStorage(APP_STORAGE.log, []);
  const next = [...existing, entry].slice(-200);
  writeStorage(APP_STORAGE.log, next);
  if (TEST_MODE) {
    console.info('[Lab Event]', entry);
  }
};

const useLoadable = ({ label, data, delay = 450, forceError = false }) => {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const requestRef = useRef(0);

  const start = () => {
    const requestId = Date.now();
    requestRef.current = requestId;
    setState({ status: 'loading', data: null, error: '' });

    window.setTimeout(() => {
      if (requestRef.current !== requestId) return;
      if (forceError) {
        setState({ status: 'error', data: null, error: `${label} unavailable. Please try again.` });
        return;
      }
      setState({ status: 'ready', data, error: '' });
    }, delay);
  };

  useEffect(() => {
    start();
  }, [label, forceError, delay]);

  return { ...state, retry: start };
};

const LoadError = ({ title, message, onRetry }) => html`
  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-sm text-red-200 space-y-3">
    <div className="flex items-center gap-2 font-bold">
      <${AlertCircle} size=${16} /> ${title}
    </div>
    <div className="text-xs text-red-200/80">${message}</div>
    <${Button} size="sm" onClick=${onRetry} className="bg-red-500/20 border border-red-500/40 text-red-100">
      Try again
    </${Button}>
  </div>
`;

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Members app error:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return html`
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-3">
            <div className="text-lg font-black uppercase tracking-widest">App error</div>
            <p className="text-sm text-zinc-400">Something went wrong while loading your dashboard. Please reload.</p>
          </div>
        </div>
      `;
    }
    return this.props.children;
  }
}

const DEFAULT_PROFILE = {
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
};

const DEFAULT_NUTRITION_LOG = [
  { id: 1, name: 'Oatmeal + Whey', p: 30, c: 45, f: 5, time: '08:00 AM' }
];

function TheLabUltimate() {
  const [onboarding, setOnboarding] = useState(() => !readStorage(APP_STORAGE.onboarding, false));
  const [tab, setTabState] = useState('home');
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [credits, setCredits] = useState(1);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toast, setToast] = useState({ show: false, amount: 0, text: '' });

  // USER PROFILE & REFERRALS
  const [userProfile, setUserProfile] = useState(() => readStorage(APP_STORAGE.profile, DEFAULT_PROFILE));

  const [nutritionLog, setNutritionLog] = useState(() => readStorage('lab-nutrition-log', DEFAULT_NUTRITION_LOG));

  const setTab = (next, meta = {}) => {
    setTabState(next);
    if (next === 'book') logEvent('book_session_opened', meta);
    if (next === 'coach') logEvent('chat_opened', meta);
  };

  const resetSession = () => {
    writeStorage(APP_STORAGE.onboarding, false);
    writeStorage(APP_STORAGE.profile, DEFAULT_PROFILE);
    writeStorage('lab-nutrition-log', DEFAULT_NUTRITION_LOG);
    writeStorage(APP_STORAGE.log, []);
    writeStorage(APP_STORAGE.lastStep, null);
    setOnboarding(true);
    setTabState('home');
    setCart({});
    setCredits(1);
    setShowCart(false);
    setShowPass(false);
    setShowProfile(false);
    setUserProfile(DEFAULT_PROFILE);
    setNutritionLog(DEFAULT_NUTRITION_LOG);
    logEvent('test_mode_reset');
  };

  // Handle Onboarding Completion
  const handleOnboardingComplete = (data) => {
    const parsedBf = Number.parseFloat(data.bf);
    const bfValue = Number.isFinite(parsedBf) ? parsedBf : null;
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      handle: data.handle || `@${data.name.split(' ')[0].toLowerCase()}_lab`,
      bio: data.bio,
      height: data.height,
      weight: data.weight,
      bf: bfValue,
      goal: data.goal,
      gender: data.gender
    }));
    setOnboarding(false);
    writeStorage(APP_STORAGE.onboarding, true);
    logEvent('onboarding_complete', { goal: data.goal });
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

  useEffect(() => {
    writeStorage(APP_STORAGE.profile, userProfile);
  }, [userProfile]);

  useEffect(() => {
    writeStorage('lab-nutrition-log', nutritionLog);
  }, [nutritionLog]);

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
        ${TEST_MODE && html`
          <div className="mb-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="font-bold uppercase tracking-wider flex items-center gap-2">
              <${AlertCircle} size=${14} /> Test Mode Active
            </div>
            <div className="text-yellow-200/80">
              Stable demo data + telemetry logging enabled. Use “Reset User” between sessions or open a fresh incognito window.
            </div>
            <div className="flex gap-2">
              <${Button} size="sm" onClick=${resetSession} className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-100">
                Reset User
              </${Button}>
            </div>
          </div>
        `}
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
              ${tab === 'nutrition' && html`<${NutritionView} nutritionLog=${nutritionLog} addFood=${addFoodToLog} setTab=${setTab} />`}
              ${tab === 'habits' && html`<${HabitsView} setTab=${setTab} />`}
              ${tab === 'messages' && html`<${MessagesView} setTab=${setTab} />`}
              ${tab === 'community' && html`<${CommunityView} setTab=${setTab} />`}
              ${tab === 'challenges' && html`<${ChallengesView} setTab=${setTab} />`}
              ${tab === 'wearables' && html`<${WearablesView} setTab=${setTab} />`}
              ${tab === 'library' && html`<${LibraryView} />`}
            `}
      </main>

      ${!showProfile && html`
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe pt-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,1)]">
          <div className="max-w-md mx-auto flex justify-around items-center px-1">
            <${NavBtn} icon=${Activity} label="Dash" active=${tab === 'home'} onClick=${() => setTab('home')} />
            <${NavBtn} icon=${Calendar} label="Book" active=${tab === 'book'} onClick=${() => setTab('book', { source: 'nav' })} />

            <div className="-mt-10 relative group">
              <div className="absolute inset-0 bg-violet-600 blur-xl opacity-40 rounded-full group-hover:opacity-60 transition duration-500" />
              <button
                onClick=${() => setTab('coach', { source: 'nav' })}
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

const getBodyFatEstimate = (data) => {
  const h = Number.parseFloat(data.height);
  const n = Number.parseFloat(data.neck);
  const w = Number.parseFloat(data.waist);
  const hip = Number.parseFloat(data.hip || 0);

  if (![h, n, w].every((val) => Number.isFinite(val) && val > 0)) {
    return { value: null, error: '' };
  }

  if (data.gender === 'Male' && w <= n) {
    return { value: null, error: 'We’ll compute this later.' };
  }

  if (data.gender === 'Female' && w + hip <= n) {
    return { value: null, error: 'We’ll compute this later.' };
  }

  let result = 0;
  if (data.gender === 'Male') {
    result = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
  } else {
    result = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
  }

  if (!Number.isFinite(result)) {
    return { value: null, error: 'We’ll compute this later.' };
  }

  const val = Math.max(2, Math.min(50, result)).toFixed(1);
  return { value: val, error: '' };
};

// --- ONBOARDING VIEW (ENHANCED) ---
function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    emailHandle: '',
    emailDomain: 'gmail.com',
    customEmailDomain: '',
    handle: '',
    gender: 'Male',
    height: '',
    weight: '',
    neck: '',
    waist: '',
    neckFeel: '',
    waistFeel: '',
    hip: '',
    bf: '',
    bio: '',
    goal: 'Strength'
  });
  const [loading, setLoading] = useState(false);
  const [calcError, setCalcError] = useState('');
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const stepLabels = {
    1: 'Identity Verification',
    2: 'Body Scanner',
    3: 'Social Identity',
    4: 'Mission Objective'
  };

  useEffect(() => {
    const label = stepLabels[step];
    logEvent('onboarding_step_viewed', { step, label });
    writeStorage(APP_STORAGE.lastStep, { step, label, ts: new Date().toISOString() });
  }, [step]);

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setLoadingTimeout(true), 5000);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!calcError) return;
    const estimate = getBodyFatEstimate(formData);
    if (estimate.value) setCalcError('');
  }, [formData.height, formData.neck, formData.waist, formData.hip, formData.gender]);

  useEffect(() => {
    if (!formData.emailHandle || formData.handle) return;
    setFormData((prev) => ({ ...prev, handle: formData.emailHandle }));
  }, [formData.emailHandle]);

  const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'proton.me', 'aol.com', 'custom'];

  const buildRange = (min, max, step = 1) => {
    const values = [];
    for (let i = min; i <= max + 0.001; i += step) values.push(Number(i.toFixed(1)));
    return values;
  };

  const getMeasurementRange = (type) => {
    const height = Number.parseFloat(formData.height);
    const weight = Number.parseFloat(formData.weight);
    const hasHeight = Number.isFinite(height) && height > 0;
    const hasWeight = Number.isFinite(weight) && weight > 0;
    if (!hasHeight) {
      return type === 'neck'
        ? { min: 12, max: 20, step: 0.5, helper: 'Add height + weight to narrow this down.' }
        : { min: 26, max: 50, step: 0.5, helper: 'Add height + weight to narrow this down.' };
    }
    const bmi = hasWeight ? (weight * 703) / (height * height) : 22;
    const baseNeck = height * 0.24 + (bmi - 22) * 0.08;
    const baseWaist = height * 0.45 + (bmi - 22) * 0.6;
    if (type === 'neck') {
      return {
        min: Math.max(12, Math.round((baseNeck - 2) * 2) / 2),
        max: Math.min(22, Math.round((baseNeck + 2) * 2) / 2),
        step: 0.5,
        helper: `Suggested range based on ${Math.round(height)}" and ${Math.round(weight || height * 2.3)} lbs.`
      };
    }
    return {
      min: Math.max(26, Math.round((baseWaist - 4) * 2) / 2),
      max: Math.min(60, Math.round((baseWaist + 4) * 2) / 2),
      step: 0.5,
      helper: `Suggested range based on ${Math.round(height)}" and ${Math.round(weight || height * 2.3)} lbs.`
    };
  };

  const applyFeelSelection = (type, feel) => {
    const range = getMeasurementRange(type);
    const values = buildRange(range.min, range.max, range.step);
    if (!values.length) return;
    const mid = values[Math.floor(values.length / 2)];
    const selectionMap = {
      small: values[1] ?? values[0],
      average: mid,
      large: values[values.length - 2] ?? values[values.length - 1]
    };
    const value = selectionMap[feel];
    if (!value) return;
    setFormData((prev) => ({
      ...prev,
      ...(type === 'neck' ? { neck: `${value}`, neckFeel: feel } : { waist: `${value}`, waistFeel: feel })
    }));
  };

  const heightOptions = buildRange(54, 84, 1);
  const weightOptions = buildRange(90, 350, 5);

  const calculateBF = () => {
    const estimate = getBodyFatEstimate(formData);
    if (!estimate.value) {
      setCalcError(estimate.error || 'We’ll compute this later.');
      setFormData((prev) => ({ ...prev, bf: '' }));
      logEvent('body_fat_calc_failed', { reason: estimate.error || 'missing_inputs' });
      return;
    }
    setCalcError('');
    setFormData((prev) => ({ ...prev, bf: estimate.value }));
  };

  const nextStep = () => {
    logEvent('onboarding_step_completed', { step, label: stepLabels[step] });
    if (step < 4) {
      if (step === 2) calculateBF();
      setStep(step + 1);
    } else {
      setLoading(true);
      logEvent('profile_build_started');
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
        ${loadingTimeout && html`
          <div className="mt-6 text-xs text-zinc-400">
            This is taking longer than expected. You can continue now.
          </div>
          <${Button} size="sm" primary onClick=${() => onComplete(formData)} className="mt-3">
            Continue
          </${Button}>
        `}
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
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Email</label>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-zinc-500 font-bold">@</span>
                    <input
                      value=${formData.emailHandle}
                      onChange=${(event) => setFormData({ ...formData, emailHandle: event.target.value.replace(/\\s/g, '') })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 pl-8 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors placeholder:text-zinc-700"
                      placeholder="yourname"
                    />
                  </div>
                  <select
                    value=${formData.emailDomain}
                    onChange=${(event) => setFormData({ ...formData, emailDomain: event.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 text-sm font-bold text-zinc-200 focus:outline-none focus:border-violet-500"
                  >
                    ${emailDomains.map(
                      (domain) => html`<option key=${domain} value=${domain}>${domain === 'custom' ? 'other…' : `@${domain}`}</option>`
                    )}
                  </select>
                </div>
                ${formData.emailDomain === 'custom' && html`
                  <input
                    value=${formData.customEmailDomain}
                    onChange=${(event) => setFormData({ ...formData, customEmailDomain: event.target.value.replace(/\\s/g, '') })}
                    className="mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="domain.com"
                  />
                `}
                ${(formData.emailHandle || formData.emailDomain) && html`
                  <div className="mt-2 text-xs text-zinc-500">
                    ${formData.emailHandle ? 'Preview:' : 'Preview will appear once you add a handle.'}
                    ${formData.emailHandle && html`
                      <span className="text-zinc-200 font-semibold">
                        ${`${formData.emailHandle}@${formData.emailDomain === 'custom' ? formData.customEmailDomain || 'domain.com' : formData.emailDomain}`}
                      </span>
                    `}
                  </div>
                `}
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
                  <select
                    value=${formData.height}
                    onChange=${(event) => setFormData({ ...formData, height: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select</option>
                    ${heightOptions.map((height) => html`<option key=${height} value=${height}>${height}"</option>`)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Weight (lbs)</label>
                  <select
                    value=${formData.weight}
                    onChange=${(event) => setFormData({ ...formData, weight: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select</option>
                    ${weightOptions.map((weight) => html`<option key=${weight} value=${weight}>${weight} lbs</option>`)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Neck (in)</label>
                  <select
                    value=${formData.neck}
                    onChange=${(event) => setFormData({ ...formData, neck: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select</option>
                    ${(() => {
                      const range = getMeasurementRange('neck');
                      return buildRange(range.min, range.max, range.step).map(
                        (val) => html`<option key=${val} value=${val}>${val}"</option>`
                      );
                    })()}
                  </select>
                  <div className="mt-2 text-[10px] text-zinc-500">${getMeasurementRange('neck').helper}</div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-bold">
                    ${[
                      { id: 'small', label: 'Smaller' },
                      { id: 'average', label: 'Average' },
                      { id: 'large', label: 'Larger' }
                    ].map(
                      (feel) => html`
                        <button
                          key=${feel.id}
                          onClick=${() => applyFeelSelection('neck', feel.id)}
                          className=${`py-2 rounded-lg border ${formData.neckFeel === feel.id ? 'bg-violet-600 border-violet-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                          ${feel.label}
                        </button>
                      `
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Waist (in)</label>
                  <select
                    value=${formData.waist}
                    onChange=${(event) => setFormData({ ...formData, waist: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select</option>
                    ${(() => {
                      const range = getMeasurementRange('waist');
                      return buildRange(range.min, range.max, range.step).map(
                        (val) => html`<option key=${val} value=${val}>${val}"</option>`
                      );
                    })()}
                  </select>
                  <div className="mt-2 text-[10px] text-zinc-500">${getMeasurementRange('waist').helper}</div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-bold">
                    ${[
                      { id: 'small', label: 'Under' },
                      { id: 'average', label: 'Average' },
                      { id: 'large', label: 'Over' }
                    ].map(
                      (feel) => html`
                        <button
                          key=${feel.id}
                          onClick=${() => applyFeelSelection('waist', feel.id)}
                          className=${`py-2 rounded-lg border ${formData.waistFeel === feel.id ? 'bg-violet-600 border-violet-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                          ${feel.label}
                        </button>
                      `
                    )}
                  </div>
                </div>
              </div>
              ${formData.gender === 'Female' && html`
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Hip (in)</label>
                  <select
                    value=${formData.hip}
                    onChange=${(event) => setFormData({ ...formData, hip: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">Select</option>
                    ${buildRange(30, 60, 1).map((hip) => html`<option key=${hip} value=${hip}>${hip}"</option>`)}
                  </select>
                </div>
              `}
              ${formData.height && formData.waist && formData.neck && html`
                <div className="bg-violet-900/20 border border-violet-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div className="text-sm font-bold text-violet-300">Estimated Body Fat</div>
                  <div className="text-xl font-black text-white">
                    ${(() => {
                      const estimate = getBodyFatEstimate(formData);
                      return estimate.value ? `${estimate.value}%` : '--';
                    })()}
                  </div>
                </div>
              `}
              ${calcError && html`<div className="text-xs text-yellow-400">${calcError}</div>`}
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
                ${formData.emailHandle && html`
                  <button
                    type="button"
                    onClick=${() => setFormData({ ...formData, handle: formData.emailHandle })}
                    className="mt-2 text-xs font-bold text-violet-400 hover:text-violet-200 transition"
                  >
                    Use your email handle instead
                  </button>
                `}
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
        ${step === 3 && html`
          <button
            onClick=${() => setStep(4)}
            className="mt-4 text-xs text-zinc-500 hover:text-white transition text-center w-full"
          >
            Skip for now
          </button>
        `}
        ${!isStepValid() && html`
          <div className="mt-2 text-xs text-red-400">Complete the required fields to continue.</div>
        `}
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
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [statsLog, setStatsLog] = useState({ weight: userProfile.weight, bodyFat: userProfile.bf ?? '', note: '' });
  const defaultTilePrefs = PROGRESS_TILES.map((tile, index) => ({ id: tile.id, visible: true, order: index }));
  const [tilePrefs, setTilePrefs] = useState(() => readStorage('lab-progress-tiles', defaultTilePrefs));
  const [showTileEditor, setShowTileEditor] = useState(false);

  const sessions = { booked: 5, made: 3, missed: 0 };
  const orderedTiles = tilePrefs
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((pref) => {
      const tile = PROGRESS_TILES.find((item) => item.id === pref.id);
      return tile ? { ...tile, visible: pref.visible } : null;
    })
    .filter(Boolean);

  useEffect(() => {
    writeStorage('lab-progress-tiles', tilePrefs);
  }, [tilePrefs]);

  const moveTile = (id, direction) => {
    setTilePrefs((prev) => {
      const current = [...prev].sort((a, b) => a.order - b.order);
      const index = current.findIndex((tile) => tile.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return prev;
      const next = current.map((tile) => ({ ...tile }));
      const tempOrder = next[index].order;
      next[index].order = next[nextIndex].order;
      next[nextIndex].order = tempOrder;
      return next;
    });
  };

  const toggleTile = (id) => {
    setTilePrefs((prev) => prev.map((tile) => (tile.id === id ? { ...tile, visible: !tile.visible } : tile)));
  };

  const logDailyStats = () => {
    logEvent('daily_stats_logged', statsLog);
    setShowQuickLog(false);
  };

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
              <div className="text-[10px] text-zinc-500">
                ${Number.isFinite(userProfile.bf) ? `${userProfile.bf}% BF` : 'We’ll compute this later'}
              </div>
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

        <${Card} className="mb-4 bg-gradient-to-r from-violet-900/20 to-zinc-900 border-l-4 border-l-violet-500 p-4" onClick=${() => setTab('book', { source: 'home_card' })}>
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

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-bold text-lg">Things to do today</h2>
            <div className="text-xs text-zinc-500">Your daily agenda with jump-ins.</div>
          </div>
          <button onClick=${() => setShowQuickLog((prev) => !prev)} className="text-xs font-bold text-violet-400 hover:text-violet-200">
            ${showQuickLog ? 'Close' : 'Quick Log'}
          </button>
        </div>

        <div className="space-y-2">
          ${DAILY_AGENDA.map(
            (item) => html`
              <${Card} key=${item.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-violet-400">
                    ${item.type === 'Workout' ? html`<${Dumbbell} size=${18} />` : null}
                    ${item.type === 'Cardio' ? html`<${Activity} size=${18} />` : null}
                    ${item.type === 'Habit' ? html`<${CheckSquare} size=${18} />` : null}
                    ${item.type === 'Check-in' ? html`<${Camera} size=${18} />` : null}
                  </div>
                  <div>
                    <div className="font-bold text-sm">${item.title}</div>
                    <div className="text-xs text-zinc-500">${item.time} • ${item.type}</div>
                  </div>
                </div>
                <button
                  onClick=${() => (item.action === 'progress' ? setShowQuickLog(true) : setTab(item.action))}
                  className="text-xs font-bold text-white bg-violet-600 px-3 py-1.5 rounded-full hover:bg-violet-500"
                >
                  Jump in
                </button>
              </${Card}>
            `
          )}
        </div>

        ${showQuickLog && html`
          <${Card} className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <${Camera} size=${14} /> Daily Check-in
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                value=${statsLog.weight}
                onChange=${(event) => setStatsLog({ ...statsLog, weight: event.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
                placeholder="Weight (lbs)"
              />
              <input
                value=${statsLog.bodyFat}
                onChange=${(event) => setStatsLog({ ...statsLog, bodyFat: event.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
                placeholder="Body fat %"
              />
            </div>
            <textarea
              value=${statsLog.note}
              onChange=${(event) => setStatsLog({ ...statsLog, note: event.target.value })}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm h-20 resize-none"
              placeholder="Progress photo notes, mood, soreness..."
            ></textarea>
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span>Upload progress photos in the Photos tile.</span>
              <button onClick=${logDailyStats} className="text-xs font-bold text-white bg-emerald-500 px-3 py-1.5 rounded-full">
                Save
              </button>
            </div>
          </${Card}>
        `}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-bold text-lg">My Progress</h2>
            <div className="text-xs text-zinc-500">Customize the tiles that matter to you.</div>
          </div>
          <button onClick=${() => setShowTileEditor((prev) => !prev)} className="text-xs font-bold text-violet-400 hover:text-violet-200">
            ${showTileEditor ? 'Done' : 'Edit Tiles'}
          </button>
        </div>

        ${showTileEditor && html`
          <${Card} className="p-3 space-y-2">
            ${orderedTiles.map(
              (tile) => html`
                <div key=${tile.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button onClick=${() => moveTile(tile.id, -1)} className="p-1 bg-zinc-800 rounded"><${ChevronRight} size=${12} className="rotate-180" /></button>
                    <button onClick=${() => moveTile(tile.id, 1)} className="p-1 bg-zinc-800 rounded"><${ChevronRight} size=${12} /></button>
                    <span className="font-bold">${tile.label}</span>
                  </div>
                  <button
                    onClick=${() => toggleTile(tile.id)}
                    className=${`px-2 py-1 rounded-full font-bold ${tile.visible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}
                  >
                    ${tile.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              `
            )}
          </${Card}>
        `}

        <div className="grid grid-cols-2 gap-3">
          ${orderedTiles
            .filter((tile) => tile.visible)
            .map(
              (tile) => html`
                <${Card} key=${tile.id} className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="uppercase font-bold tracking-widest">${tile.label}</span>
                    <${tile.icon} size=${14} className="text-violet-400" />
                  </div>
                  <div className="text-lg font-black">${tile.value}</div>
                  <div className="text-[10px] text-emerald-400">${tile.trend}</div>
                </${Card}>
              `
            )}
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
                  <div className="text-xs text-zinc-500">Regular, circuit, interval, or video</div>
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
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('nutrition')}>
              <${Utensils} size=${24} className="text-emerald-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">NUTRITION</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('habits')}>
              <${CheckSquare} size=${24} className="text-yellow-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">HABITS</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('messages')}>
              <${MessageSquare} size=${24} className="text-violet-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">MESSAGES</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('community')}>
              <${Users} size=${24} className="text-blue-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">COMMUNITY</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('challenges')}>
              <${Trophy} size=${24} className="text-orange-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">CHALLENGES</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('wearables')}>
              <${Smartphone} size=${24} className="text-cyan-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">WEARABLES</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col justify-center items-center gap-2 hover:bg-zinc-800 group transition" onClick=${() => setTab('social')}>
              <${Users} size=${24} className="text-pink-400 group-hover:scale-110 transition" />
              <div className="text-xs font-bold">SQUAD</div>
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
  const [activeProgram, setActiveProgram] = useState(null);
  const [activeExercise, setActiveExercise] = useState(0);
  const [sets, setSets] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [blockIndex, setBlockIndex] = useState(0);
  const [blockTime, setBlockTime] = useState(0);
  const [blockActive, setBlockActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [workoutHistory, setWorkoutHistory] = useState(() => readStorage('lab-workout-history', []));
  const [personalBests, setPersonalBests] = useState(() =>
    readStorage('lab-workout-bests', { bench: 185, squat: 245, deadlift: 315 })
  );

  useEffect(() => {
    writeStorage('lab-workout-history', workoutHistory);
  }, [workoutHistory]);

  useEffect(() => {
    writeStorage('lab-workout-bests', personalBests);
  }, [personalBests]);

  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  useEffect(() => {
    if (!blockActive || blockTime <= 0) return;
    const interval = setInterval(() => setBlockTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [blockActive, blockTime]);

  useEffect(() => {
    if (!activeProgram || activeProgram.type !== 'Interval') return;
    const blocks = activeProgram.data.blocks;
    if (!blockActive || blockTime > 0) return;
    const nextIndex = blockIndex + 1;
    if (nextIndex >= blocks.length) {
      setBlockActive(false);
      return;
    }
    setBlockIndex(nextIndex);
    setBlockTime(blocks[nextIndex].dur);
    if (voiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${blocks[nextIndex].label} start`));
    }
  }, [blockTime, blockActive, blockIndex, activeProgram, voiceEnabled]);

  useEffect(() => {
    if (!activeProgram || activeProgram.type !== 'Interval') return;
    if (blockTime === 10 && voiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance('10 seconds remaining'));
    }
  }, [blockTime, activeProgram, voiceEnabled]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const toggleSet = (exIdx, setIdx) => {
    const key = `${exIdx}-${setIdx}`;
    setSets((prev) => ({ ...prev, [key]: !prev[key] }));
    if (!sets[key]) {
      setTimer(90);
      setTimerActive(true);
    }
  };

  const logWorkout = (program) => {
    const entry = {
      id: Date.now(),
      type: program.type,
      name: program.data.name,
      duration: program.type === 'Interval' ? '18 min' : '45 min',
      completedAt: new Date().toLocaleDateString()
    };
    setWorkoutHistory((prev) => [entry, ...prev].slice(0, 12));
    if (program.type === 'Regular') {
      setPersonalBests((prev) => ({
        bench: prev.bench + 5,
        squat: prev.squat,
        deadlift: prev.deadlift + 10
      }));
    }
  };

  const handleFinish = () => {
    if (activeProgram) logWorkout(activeProgram);
    addXp(300);
    setTab('home');
  };

  const startInterval = () => {
    if (!activeProgram || activeProgram.type !== 'Interval') return;
    setBlockIndex(0);
    setBlockTime(activeProgram.data.blocks[0].dur);
    setBlockActive(true);
    if (voiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${activeProgram.data.blocks[0].label} start`));
    }
  };

  if (!activeProgram) {
    return html`
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black italic uppercase">Workouts</h2>
          <button onClick=${() => setTab('home')} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
        </div>

        <${Card} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Personal Bests</div>
              <div className="text-lg font-black">PR Dashboard</div>
            </div>
            <${TrendingUp} size=${18} className="text-emerald-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-zinc-900/80 rounded-xl p-2">
              <div className="text-xs text-zinc-500">Bench</div>
              <div className="font-bold">${personalBests.bench} lbs</div>
            </div>
            <div className="bg-zinc-900/80 rounded-xl p-2">
              <div className="text-xs text-zinc-500">Squat</div>
              <div className="font-bold">${personalBests.squat} lbs</div>
            </div>
            <div className="bg-zinc-900/80 rounded-xl p-2">
              <div className="text-xs text-zinc-500">Deadlift</div>
              <div className="font-bold">${personalBests.deadlift} lbs</div>
            </div>
          </div>
        </${Card}>

        <div className="grid gap-3">
          ${WORKOUT_PROGRAMS.map(
            (program) => html`
              <${Card} key=${program.id} className="p-4 flex items-center justify-between hover:bg-zinc-800 transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-violet-400">
                    <${program.icon} size=${20} />
                  </div>
                  <div>
                    <div className="font-bold">${program.title}</div>
                    <div className="text-xs text-zinc-500">${program.desc}</div>
                  </div>
                </div>
                <button onClick=${() => setActiveProgram(program)} className="text-xs font-bold text-white bg-violet-600 px-3 py-1.5 rounded-full">
                  Start
                </button>
              </${Card}>
            `
          )}
        </div>

        ${workoutHistory.length > 0 && html`
          <${Card} className="p-4">
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Progress Graph</div>
            <div className="h-20 flex items-end gap-2">
              ${workoutHistory.slice(0, 6).map(
                (entry, idx) => html`
                  <div key=${entry.id} className="flex-1 bg-zinc-800 rounded-t-sm relative">
                    <div className="absolute inset-x-0 bottom-0 bg-violet-600 rounded-t-sm" style=${{ height: `${50 + idx * 8}%` }} />
                  </div>
                `
              )}
            </div>
            <div className="text-[10px] text-zinc-500 mt-2">Sessions completed: ${workoutHistory.length}</div>
          </${Card}>
        `}
      </div>
    `;
  }

  if (activeProgram.type === 'Regular') {
    return html`
      <div className="flex flex-col h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Regular</div>
            <h2 className="text-xl font-black italic uppercase">${activeProgram.data.name}</h2>
          </div>
          <button onClick=${() => setActiveProgram(null)} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pb-20">
          ${activeProgram.data.exercises.map(
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

  if (activeProgram.type === 'Circuit') {
    const circuit = activeProgram.data;
    return html`
      <div className="flex flex-col h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Circuit</div>
            <h2 className="text-xl font-black italic uppercase">${circuit.name}</h2>
          </div>
          <button onClick=${() => setActiveProgram(null)} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
        </div>
        <${Card} className="p-4 mb-4">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Stations</div>
          <div className="space-y-2">
            ${circuit.stations.map(
              (station, idx) => html`
                <div key=${station.name} className="flex items-center justify-between text-sm">
                  <span>${idx + 1}. ${station.name}</span>
                  <span className="text-zinc-500">${station.dur}s</span>
                </div>
              `
            )}
          </div>
          <div className="text-xs text-zinc-500 mt-3">Rest between rounds: ${circuit.rest}s • ${circuit.rounds} rounds</div>
        </${Card}>
        <${Button} primary full onClick=${handleFinish}>Finish Circuit</${Button}>
      </div>
    `;
  }

  if (activeProgram.type === 'Interval') {
    const blocks = activeProgram.data.blocks;
    return html`
      <div className="flex flex-col h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Interval</div>
            <h2 className="text-xl font-black italic uppercase">${activeProgram.data.name}</h2>
          </div>
          <button onClick=${() => setActiveProgram(null)} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
        </div>

        <${Card} className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Hands-free Mode</div>
            <button onClick=${() => setVoiceEnabled((prev) => !prev)} className=${`text-xs font-bold px-2 py-1 rounded-full ${voiceEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
              ${voiceEnabled ? 'Voice On' : 'Voice Off'}
            </button>
          </div>
          <div className="text-sm text-zinc-400">Timers + voice cues keep you moving without touching the screen.</div>
        </${Card}>

        <${Card} className="p-4 mb-4">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Current Block</div>
          <div className="text-2xl font-black mb-2">${blocks[blockIndex]?.label}</div>
          <div className="text-4xl font-mono font-bold text-violet-400">${formatTime(blockTime)}</div>
          <div className="mt-3 flex gap-2">
            <button
              onClick=${() => {
                if (blockActive) {
                  setBlockActive(false);
                } else if (blockTime > 0) {
                  setBlockActive(true);
                } else {
                  startInterval();
                }
              }}
              className="flex-1 py-2 bg-violet-600 rounded-lg font-bold text-sm"
            >
              ${blockActive ? 'Pause' : blockTime ? 'Resume' : 'Start'}
            </button>
            <button onClick=${() => setBlockTime(0)} className="px-3 py-2 bg-zinc-800 rounded-lg text-sm">Skip</button>
          </div>
        </${Card}>

        <div className="space-y-2 pb-20">
          ${blocks.map(
            (block, idx) => html`
              <div key=${block.label} className=${`p-3 rounded-xl border ${idx === blockIndex ? 'border-violet-500/50 bg-violet-900/10' : 'border-white/5 bg-zinc-900/60'}`}>
                <div className="flex justify-between text-sm">
                  <span>${block.label}</span>
                  <span className="text-zinc-500">${formatTime(block.dur)}</span>
                </div>
              </div>
            `
          )}
        </div>

        <div className="fixed bottom-24 left-0 right-0 p-4 max-w-md mx-auto">
          <${Button} primary full onClick=${handleFinish}>Complete Interval</${Button}>
        </div>
      </div>
    `;
  }

  if (activeProgram.type === 'Video') {
    return html`
      <div className="space-y-6 pb-20">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Video</div>
            <h2 className="text-xl font-black italic uppercase">${activeProgram.data.name}</h2>
          </div>
          <button onClick=${() => setActiveProgram(null)} className="p-2 bg-zinc-900 rounded-full"><${X} size=${20} /></button>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="h-40 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
            <${Video} size=${40} />
          </div>
          <div className="text-sm text-zinc-400">Length: ${activeProgram.data.length}</div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Coach cues</div>
          <ul className="text-sm text-zinc-300 space-y-1">
            ${activeProgram.data.checkpoints.map((point) => html`<li key=${point}>• ${point}</li>`)}
          </ul>
        </div>

        <${Button} primary full onClick=${handleFinish}>Finish Video</${Button}>
      </div>
    `;
  }

  return null;
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

// --- NUTRITION VIEW ---
function NutritionView({ nutritionLog, addFood, setTab }) {
  const [meal, setMeal] = useState({ name: '', p: '', c: '', f: '' });
  const totals = nutritionLog.reduce(
    (acc, curr) => ({
      calories: acc.calories + (curr.p * 4 + curr.c * 4 + curr.f * 9),
      protein: acc.protein + curr.p,
      carbs: acc.carbs + curr.c,
      fat: acc.fat + curr.f
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const compliance = Math.round((totals.calories / NUTRITION_GOALS.calories) * 100);

  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Nutrition</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      <${Card} className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Daily Goals</div>
          <div className="text-xs font-bold text-emerald-400">${compliance}% compliant</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-zinc-900/60 rounded-xl p-3">
            <div className="text-xs text-zinc-500">Calories</div>
            <div className="font-bold">${Math.round(totals.calories)} / ${NUTRITION_GOALS.calories}</div>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-3">
            <div className="text-xs text-zinc-500">Protein</div>
            <div className="font-bold">${Math.round(totals.protein)}g / ${NUTRITION_GOALS.protein}g</div>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-3">
            <div className="text-xs text-zinc-500">Carbs</div>
            <div className="font-bold">${Math.round(totals.carbs)}g / ${NUTRITION_GOALS.carbs}g</div>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-3">
            <div className="text-xs text-zinc-500">Fat</div>
            <div className="font-bold">${Math.round(totals.fat)}g / ${NUTRITION_GOALS.fat}g</div>
          </div>
        </div>
      </${Card}>

      <${Card} className="p-4 space-y-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Log Meal / Macro</div>
        <input
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
          placeholder="Meal name"
          value=${meal.name}
          onChange=${(event) => setMeal({ ...meal, name: event.target.value })}
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
            placeholder="Protein"
            value=${meal.p}
            onChange=${(event) => setMeal({ ...meal, p: event.target.value })}
          />
          <input
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
            placeholder="Carbs"
            value=${meal.c}
            onChange=${(event) => setMeal({ ...meal, c: event.target.value })}
          />
          <input
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
            placeholder="Fat"
            value=${meal.f}
            onChange=${(event) => setMeal({ ...meal, f: event.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick=${() => {
              addFood({ name: meal.name || 'Custom meal', macros: { p: Number(meal.p) || 0, c: Number(meal.c) || 0, f: Number(meal.f) || 0 } });
              setMeal({ name: '', p: '', c: '', f: '' });
            }}
            className="text-xs font-bold text-white bg-emerald-500 px-3 py-1.5 rounded-full"
          >
            Add Meal
          </button>
        </div>
      </${Card}>

      <${Card} className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">MyFitnessPal</div>
          <${Badge} color="blue">Connected</${Badge}>
        </div>
        <div className="text-sm text-zinc-400">Import meals, calories, macros, and meal details automatically.</div>
        <button
          onClick=${() => addFood({ name: 'MFP Import: Turkey Bowl', macros: { p: 42, c: 35, f: 12 } })}
          className="w-full py-2 bg-zinc-800 rounded-lg text-xs font-bold"
        >
          Import Latest Meal
        </button>
      </${Card}>

      <div className="space-y-2">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Today’s Log</div>
        ${nutritionLog.map(
          (entry) => html`
            <${Card} key=${entry.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">${entry.name}</div>
                <div className="text-xs text-zinc-500">${entry.time}</div>
              </div>
              <div className="text-xs text-zinc-400 font-mono">${entry.p}p / ${entry.c}c / ${entry.f}f</div>
            </${Card}>
          `
        )}
      </div>
    </div>
  `;
}

// --- HABITS VIEW ---
function HabitsView({ setTab }) {
  const [habits, setHabits] = useState(() =>
    readStorage(
      'lab-habits-state',
      HABIT_LIBRARY.map((habit) => ({ ...habit, streak: Math.floor(Math.random() * 6) + 1, completed: false }))
    )
  );

  useEffect(() => {
    writeStorage('lab-habits-state', habits);
  }, [habits]);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const completed = !habit.completed;
        return {
          ...habit,
          completed,
          streak: completed ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      })
    );
  };

  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Habits</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      <${Card} className="p-4">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Assigned by coaches</div>
        <div className="space-y-2">
          ${habits.map(
            (habit) => html`
              <div key=${habit.id} className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl border border-white/5">
                <div>
                  <div className="font-bold text-sm">${habit.title}</div>
                  <div className="text-xs text-zinc-500">${habit.schedule} • ${habit.coach}</div>
                </div>
                <button
                  onClick=${() => toggleHabit(habit.id)}
                  className=${`w-10 h-10 rounded-full flex items-center justify-center ${habit.completed ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}
                >
                  <${CheckCircle} size=${18} />
                </button>
              </div>
            `
          )}
        </div>
      </${Card}>

      <${Card} className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Streaks + Badges</div>
          <${Flame} size=${18} className="text-orange-400" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          ${habits.slice(0, 3).map(
            (habit) => html`
              <div key=${habit.id} className="bg-zinc-900/60 rounded-xl p-2">
                <div className="font-bold">${habit.streak} days</div>
                <div className="text-[10px] text-zinc-500">${habit.title}</div>
              </div>
            `
          )}
        </div>
        <div className="mt-3 text-xs text-zinc-500">Milestones unlock badges and auto-posts to your group.</div>
      </${Card}>
    </div>
  `;
}

// --- MESSAGES VIEW ---
function MessagesView({ setTab }) {
  const [messages, setMessages] = useState([
    { id: 1, from: 'Coach Nicole', text: 'Your form looked solid yesterday. Keep tempo slow on eccentrics.' },
    { id: 2, from: 'Lab Auto', text: '🔥 You hit a 3-day workout streak!' }
  ]);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    if (!draft) return;
    setMessages((prev) => [{ id: Date.now(), from: 'You', text: draft }, ...prev]);
    setDraft('');
  };

  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Messages</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      <${Card} className="p-4 space-y-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">In-app messages</div>
        <div className="space-y-2">
          ${messages.map(
            (msg) => html`
              <div key=${msg.id} className="bg-zinc-900/60 rounded-xl p-3 text-sm">
                <div className="font-bold text-zinc-300">${msg.from}</div>
                <div className="text-zinc-400 text-xs mt-1">${msg.text}</div>
              </div>
            `
          )}
        </div>
        <div className="flex gap-2">
          <input
            value=${draft}
            onChange=${(event) => setDraft(event.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm"
            placeholder="Write a message..."
          />
          <button onClick=${sendMessage} className="px-3 py-2 bg-violet-600 rounded-lg text-xs font-bold">Send</button>
        </div>
      </${Card}>

      <${Card} className="p-4 space-y-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Automated messages</div>
        ${AUTO_MESSAGES.map(
          (msg) => html`
            <div key=${msg.id} className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl">
              <div>
                <div className="font-bold text-sm">${msg.title}</div>
                <div className="text-xs text-zinc-500">${msg.when}</div>
                <div className="text-xs text-zinc-400">${msg.preview}</div>
              </div>
              <${Badge} color=${msg.status === 'Active' ? 'green' : 'red'}>${msg.status}</${Badge}>
            </div>
          `
        )}
      </${Card}>
    </div>
  `;
}

// --- COMMUNITY VIEW ---
function CommunityView({ setTab }) {
  const [posts, setPosts] = useState(GROUP_FEED);
  const [draft, setDraft] = useState('');

  const addPost = () => {
    if (!draft) return;
    setPosts((prev) => [{ id: Date.now(), author: 'You', text: draft, time: 'Just now', tags: ['community'] }, ...prev]);
    setDraft('');
  };

  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Groups</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      <${Card} className="p-4 space-y-2">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Your groups</div>
        <div className="text-xs text-zinc-400">Private community hubs support up to 1000 members with auto-posted milestones.</div>
        ${GROUPS.map(
          (group) => html`
            <div key=${group.id} className="flex items-center justify-between bg-zinc-900/60 rounded-xl p-3">
              <div>
                <div className="font-bold text-sm">${group.name}</div>
                <div className="text-xs text-zinc-500">${group.members} members • ${group.focus}</div>
              </div>
              <button className="text-xs font-bold text-white bg-violet-600 px-3 py-1.5 rounded-full">Enter</button>
            </div>
          `
        )}
      </${Card}>

      <${Card} className="p-4 space-y-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Share an update</div>
        <textarea
          value=${draft}
          onChange=${(event) => setDraft(event.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm h-20 resize-none"
          placeholder="Share a win, photo, or WOD..."
        ></textarea>
        <button onClick=${addPost} className="w-full py-2 bg-emerald-500 rounded-lg text-xs font-bold">Post to Group</button>
      </${Card}>

      <div className="space-y-2">
        ${posts.map(
          (post) => html`
            <${Card} key=${post.id} className="p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="font-bold text-zinc-300">${post.author}</span>
                <span>${post.time}</span>
              </div>
              <div className="text-sm text-zinc-300">${post.text}</div>
              <div className="flex gap-3 text-xs text-zinc-500">
                <span>👍 24</span>
                <span>💬 6</span>
                <span>#${post.tags[0]}</span>
              </div>
            </${Card}>
          `
        )}
      </div>
    </div>
  `;
}

// --- CHALLENGES VIEW ---
function ChallengesView({ setTab }) {
  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Challenges</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      ${CHALLENGE_MODES.map(
        (challenge) => html`
          <${Card} key=${challenge.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">${challenge.mode}</div>
                <div className="font-bold text-lg">${challenge.title}</div>
              </div>
              <${Badge} color="violet">Live</${Badge}>
            </div>
            <p className="text-sm text-zinc-400">${challenge.desc}</p>
            ${challenge.mode === 'Leaderboard' && html`
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
                <div className="bg-zinc-900/60 rounded-lg p-2">Workout: ${challenge.points.workout} pts</div>
                <div className="bg-zinc-900/60 rounded-lg p-2">Habit: ${challenge.points.habit} pts</div>
                <div className="bg-zinc-900/60 rounded-lg p-2">Nutrition: ${challenge.points.nutrition} pts</div>
                <div className="bg-zinc-900/60 rounded-lg p-2">PR: ${challenge.points.pr} pts</div>
              </div>
            `}
            ${challenge.mode === 'Threshold' && html`
              <div className="text-xs text-zinc-400">Target: ${challenge.threshold.workouts} workouts + ${challenge.threshold.habits} habits • Reward: ${challenge.threshold.bonus}</div>
            `}
          </${Card}>
        `
      )}
    </div>
  `;
}

// --- WEARABLES VIEW ---
function WearablesView({ setTab }) {
  return html`
    <div className="pb-20 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase">Wearables</h2>
        <button onClick=${() => setTab('home')} className="text-xs text-zinc-500 underline">Back</button>
      </div>

      <div className="space-y-3">
        ${WEARABLES.map(
          (device) => html`
            <${Card} key=${device.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold">${device.name}</div>
                <${Badge} color=${device.status === 'Connected' ? 'green' : 'yellow'}>${device.status}</${Badge}>
              </div>
              <div className="text-xs text-zinc-500">Syncing: ${device.metrics.join(', ')}</div>
              <button className="w-full py-2 bg-zinc-800 rounded-lg text-xs font-bold">
                ${device.status === 'Connected' ? 'Manage Connection' : 'Connect'}
              </button>
            </${Card}>
          `
        )}
      </div>

      <${Card} className="p-4 space-y-2">
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Apple Watch</div>
        <div className="text-sm text-zinc-400">Track workouts, habits, and daily to-dos from your wrist.</div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-violet-600 rounded-lg text-xs font-bold">Start Workout</button>
          <button className="flex-1 py-2 bg-zinc-800 rounded-lg text-xs font-bold">Check Habits</button>
        </div>
      </${Card}>
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
  const sessionLoad = useLoadable({ label: 'Sessions', data: SERVICES, forceError: FORCE_ERROR });

  const recScore = 88;
  const suggestedServiceId = 'pt60';
  const suggestedReason = 'High protein intake detected. Recovery optimal. Prime time for Hypertrophy.';

  useEffect(() => {
    logEvent('booking_viewed');
  }, []);

  const handleBook = () => {
    setStep(3);
    addXp(selection.service.xp);
    logEvent('book_session_confirmed', { serviceId: selection.service?.id });
  };

  const services = sessionLoad.data || [];
  const recommendedService = services.find((s) => s.id === suggestedServiceId);
  const otherServices = services.filter((s) => s.id !== suggestedServiceId);

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

            ${sessionLoad.status === 'loading' && html`
              <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 text-xs text-zinc-500 animate-pulse">
                Loading protocols…
              </div>
            `}
            ${sessionLoad.status === 'error' && html`
              <${LoadError} title="Protocols unavailable" message=${sessionLoad.error} onRetry=${sessionLoad.retry} />
            `}
            ${sessionLoad.status === 'ready' && recommendedService && html`
              <${Card}
                onClick=${() => {
                  setSelection({ ...selection, service: recommendedService });
                  setStep(2);
                  logEvent('book_protocol_selected', { serviceId: recommendedService.id, name: recommendedService.name, source: 'toby_pick' });
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
            `}
          </div>

          <div>
            <div className="text-xs font-bold text-zinc-500 mb-3 tracking-widest uppercase">Other Protocols</div>
            ${sessionLoad.status === 'ready' && html`
              <div className="space-y-3">
                ${otherServices.map(
                  (s) => html`
                    <${Card}
                      key=${s.id}
                      onClick=${() => {
                        setSelection({ ...selection, service: s });
                        setStep(2);
                        logEvent('book_protocol_selected', { serviceId: s.id, name: s.name, source: 'other' });
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
            `}
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
              <div className="text-2xl font-black text-emerald-400">
                ${Number.isFinite(user.bf) ? `${user.bf}%` : 'Later'}
              </div>
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
  const [sassMode, setSassMode] = useState(true);
  const lastReplyRef = useRef('');

  useEffect(() => {
    logEvent('chat_opened');
  }, []);

  const addMsg = (text, from = 'user') => {
    setMessages((prev) => [...prev, { id: Date.now(), from, text }]);
  };

  const handleAction = (action) => {
    const trimmed = action.trim();
    if (!trimmed) {
      return;
    }
    addMsg(trimmed, 'user');
    logEvent('chat_message_attempted', { text: trimmed });
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      const pickReply = (options) => {
        const pool = options.filter((option) => option !== lastReplyRef.current);
        const choice = (pool.length ? pool : options)[Math.floor(Math.random() * options.length)];
        lastReplyRef.current = choice;
        return choice;
      };
      let resp = '';
      if (/(smart ?ass|sass|roast me|talk trash|be witty|be a smartass)/.test(lower)) {
        setSassMode(true);
        resp = pickReply([
          "Smart-ass mode on. I'll roast you and still get you stronger.",
          "Sass mode engaged. I'll keep it spicy and keep you training.",
          "You want sass? Buckle up. We're still getting the work done."
        ]);
      } else if (/(tone it down|be nice|no sass|be professional|be serious)/.test(lower)) {
        setSassMode(false);
        resp = pickReply([
          'Got it. Coach mode: calm, focused, and zero snark.',
          'Understood. Straight coach mode activated.',
          'Dialing it back. Clear, direct coaching from here.'
        ]);
      } else if (trimmed.includes('Push')) {
        resp = sassMode
          ? pickReply([
            'Love that energy. Heavy upper-body day it is. Warm up with the Neuro Drill first.',
            'PR mode. Big lifts, clean form. Start with the Neuro Drill.',
            'Let’s go heavy. Neuro Drill first, then we load the bar.'
          ])
          : pickReply([
            'Locked. Heavy upper-body session. Warm up with the Neuro Drill first.',
            'Heavy upper-body session queued. Start with the Neuro Drill.',
            'Heavy day confirmed. Begin with the Neuro Drill warm-up.'
          ]);
      } else if (trimmed.includes('Recovery')) {
        resp = sassMode
          ? pickReply([
            'Smart. Active recovery. 20 min sauna + 10 min ice bath. Want me to lock it in?',
            'Recovery is still training. 20 min sauna + 10 min ice bath. Book it?',
            'Chill day, but on purpose. 20 min sauna + 10 min ice bath. Want it locked?'
          ])
          : pickReply([
            'Active recovery queued: 20 min sauna + 10 min ice bath. Want me to book it?',
            'Recovery session ready: 20 min sauna + 10 min ice bath. Want me to book it?',
            'Active recovery set: 20 min sauna + 10 min ice bath. Want it scheduled?'
          ]);
      } else if (trimmed.includes('Surprise')) {
        resp = sassMode
          ? pickReply([
            "Generating 'The Gauntlet' protocol... 4 rounds, high intensity. Prepare yourself.",
            "Surprise mode: The Gauntlet is live. 4 rounds, high intensity. No whining.",
            "You asked for chaos. The Gauntlet drops in 3...2...1."
          ])
          : pickReply([
            "Generating 'The Gauntlet' protocol... 4 rounds, high intensity.",
            "Surprise session queued: The Gauntlet. 4 rounds, high intensity.",
            "Surprise session queued. The Gauntlet is ready."
          ]);
      } else if (/(trash|stupid|idiot|dumb|shut up|hate|annoying|fuck off|eat shit|screw you|fuck you|bitch|slut)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            "Noted. If that was the warm-up, you’re ready. Pick strength, hypertrophy, or recovery.",
            "Spicy. Now channel that into a workout. Strength, hypertrophy, or recovery?",
            "You good? Cool. Choose your focus and we’ll move forward."
          ])
          : pickReply([
            'Heard. If you want help, tell me your goal and time available.',
            'Understood. Share your goal and time available, and I’ll help.',
            'Got it. Tell me your goal, time available, and I’ll take it from there.'
          ]);
      } else if (/(thanks|thank you|thx|appreciate)/.test(lower)) {
        resp = pickReply([
          'You’re welcome. I accept payment in PRs and protein.',
          'Anytime. Bring effort and we’re good.',
          'You got it. Now let’s get after it.'
        ]);
      } else if (/(tired|sore|burned out|exhausted|fatigued)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            'Copy that. We go smart today: lighter load, clean tempo, and a recovery finisher.',
            'Got it. We’ll go smart today: lighter load, clean tempo, recovery finisher.',
            'We’ll keep it smart: lighter load, clean tempo, recovery finisher.'
          ])
          : pickReply([
            'Copy that. We go smart today: lighter load, clean tempo, and a recovery finisher.',
            'Understood. Lighter load, clean tempo, recovery finisher.',
            'We’ll scale it down: lighter load, clean tempo, recovery finisher.'
          ]);
      } else if (/(no|not now|nah|nope)/.test(lower)) {
        resp = pickReply([
          'All good. If you want a plan or a booking, just say the word.',
          'No worries. Hit me when you want a plan.',
          'Cool. I’m here when you’re ready to train.'
        ]);
      } else if (/(help|plan|workout|train|lift|session)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            'I got you. Tell me your goal, time available, and what equipment you have.',
            'Give me your goal, time available, and equipment. I’ll handle the rest.',
            'Tell me goal, time, equipment. I’ll build it.'
          ])
          : pickReply([
            'Tell me your goal, time available, and what equipment you have.',
            'Share your goal, time available, and equipment.',
            'Tell me your goal, time available, and equipment, and I’ll build the plan.'
          ]);
      } else if (/(hi|hello|yo|hey|sup)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            "Hey. You brought the vibes; I brought the plan. What's the mission today?",
            "Yo. What are we chasing today?",
            "Hey. Let’s make something happen. What’s the goal?"
          ])
          : pickReply([
            "Hey there. What's the mission today?",
            "Hello. What’s your training goal today?",
            "Hi. What can I help you train today?"
          ]);
      } else {
        resp = sassMode
          ? pickReply([
            'Got it. Pick a target (strength, hypertrophy, recovery) and I’ll make it happen.',
            'Understood. Give me a target (strength, hypertrophy, recovery) and we’ll go.',
            'Roger that. Choose strength, hypertrophy, or recovery.'
          ])
          : pickReply([
            'Got it. Share a target (strength, hypertrophy, recovery) and I’ll build the plan.',
            'Understood. Pick strength, hypertrophy, or recovery, and I’ll build the plan.',
            'Got it. Choose a target and I’ll take it from there.'
          ]);
      let resp = '';
      if (trimmed.includes('Push')) {
        resp = 'Love that energy. Heavy upper-body day it is. Warm up with the Neuro Drill first.';
      } else if (trimmed.includes('Recovery')) {
        resp = 'Smart. Active recovery. 20 min sauna + 10 min ice bath. Want me to lock it in?';
      } else if (trimmed.includes('Surprise')) {
        resp = "Generating 'The Gauntlet' protocol... 4 rounds, high intensity. Prepare yourself.";
      } else if (/(trash|stupid|idiot|dumb|shut up|hate|annoying)/.test(lower)) {
        resp = "Easy there. I can be helpful or I can be petty. Choose wisely.";
      } else if (/(thanks|thank you|thx|appreciate)/.test(lower)) {
        resp = 'You’re welcome. I accept payment in PRs and protein.';
      } else if (/(tired|sore|burned out|exhausted|fatigued)/.test(lower)) {
        resp = 'Copy that. We go smart today: lighter load, clean tempo, and a recovery finisher.';
      } else if (/(no|not now|nah|nope)/.test(lower)) {
        resp = 'All good. If you want a plan or a booking, just say the word.';
      } else if (/(help|plan|workout|train|lift|session)/.test(lower)) {
        resp = 'I got you. Tell me your goal, time available, and what equipment you have.';
      } else if (/(hi|hello|yo|hey|sup)/.test(lower)) {
        resp = "Hey. You brought the vibes; I brought the plan. What's the mission today?";
      } else {
        resp = `Got it: "${trimmed}". Give me a target (strength, hypertrophy, recovery) and I’ll make it happen.`;
      }
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
  const marketLoad = useLoadable({ label: 'Products', data: MARKET_ITEMS, forceError: FORCE_ERROR });

  const filtered = (marketLoad.data || []).filter((m) => cat === 'all' || m.cat === cat);

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

      ${marketLoad.status === 'loading' && html`
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 text-xs text-zinc-500 animate-pulse">
          Loading products…
        </div>
      `}
      ${marketLoad.status === 'error' && html`
        <${LoadError} title="Market unavailable" message=${marketLoad.error} onRetry=${marketLoad.retry} />
      `}
      ${marketLoad.status === 'ready' && html`
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
                      logEvent('market_item_added', { itemId: item.id, name: item.name });
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
      `}
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
    root.render(html`<${ErrorBoundary}><${TheLabUltimate} /></${ErrorBoundary}>`);
    document.documentElement.dataset.membersLoaded = 'true';
    window.dispatchEvent(new Event('members-app-loaded'));
  } catch (error) {
    console.error('Unable to load core modules.', error);
    renderFallback('Unable to load core modules. Please allow scripts from esm.sh and reload.');
  }
};

loadApp();
