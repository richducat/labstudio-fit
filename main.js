import * as React from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import htm from 'https://esm.sh/htm@3.1.1';
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
} from 'https://esm.sh/lucide-react@0.408.0?bundle';

const html = htm.bind(React.createElement);
const { useState, useEffect, useRef } = React;

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
    height: `5'11"`,
    weight: 185,
    bf: 14,
    referralCode: 'LAB-8842',
    referrals: 2,
    goal: 'Hypertrophy'
  });

  const [nutritionLog, setNutritionLog] = useState([
    { id: 1, name: 'Oatmeal + Whey', p: 30, c: 45, f: 5, time: '08:00 AM' }
  ]);

  // Handle Onboarding Completion
  const handleOnboardingComplete = (data) => {
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      height: data.height,
      weight: data.weight,
      bf: data.bf,
      goal: data.goal
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
          ? html`<${ProfileView} user=${userProfile} log=${nutritionLog} addFood=${addFoodToLog} close=${() => setShowProfile(false)} />`
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

// --- ONBOARDING VIEW (NEW) ---
function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', height: '', weight: '', bf: '', goal: 'Strength' });
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => onComplete(formData), 2500);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.length > 2;
    if (step === 2) return formData.height && formData.weight;
    return true;
  };

  if (loading)
    return html`
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-violet-600 blur-xl opacity-50 animate-pulse" />
          <${Zap} size=${32} className="text-violet-500 relative z-10" />
        </div>
        <h2 className="text-2xl font-black italic mb-2">INITIALIZING PROFILE</h2>
        <div className="flex flex-col gap-2 w-full max-w-xs text-xs font-mono text-zinc-500 mt-4">
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-100">
            <span>&gt; BIOMETRICS</span> <span className="text-emerald-500">VERIFIED</span>
          </div>
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-300">
            <span>&gt; ID GENERATION</span> <span className="text-emerald-500">COMPLETE</span>
          </div>
          <div className="flex justify-between animate-in fade-in slide-in-from-left duration-500 delay-500">
            <span>&gt; SYNCING TOBY AI</span> <span className="text-violet-500 animate-pulse">CONNECTING...</span>
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
            ${[1, 2, 3].map(
              (i) => html`<div key=${i} className=${`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-violet-600' : 'bg-zinc-800'}`} />`
            )}
          </div>
          <h1 className="text-4xl font-black italic uppercase leading-[0.9]">
            ${step === 1 && 'Identity\nVerification'}
            ${step === 2 && 'Biometric\nScan'}
            ${step === 3 && 'Mission\nObjective'}
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            ${step === 1 && 'Enter your credentials to access The Lab.'}
            ${step === 2 && 'Toby uses this data to calibrate your training.'}
            ${step === 3 && 'What are we destroying today?'}
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
              <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex gap-3 items-center">
                <${Fingerprint} size=${24} className="text-zinc-500" />
                <div>
                  <div className="text-xs font-bold text-zinc-300">LAB ID: <span className="font-mono text-zinc-500">PENDING...</span></div>
                  <div className="text-[10px] text-zinc-600">Generated upon completion.</div>
                </div>
              </div>
            </div>
          `}

          ${step === 2 && html`
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Height</label>
                  <input
                    value=${formData.height}
                    onChange=${(event) => setFormData({ ...formData, height: event.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="5'11&quot;"
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
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block">Body Fat % (Est.)</label>
                <input
                  type="number"
                  value=${formData.bf}
                  onChange=${(event) => setFormData({ ...formData, bf: event.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-lg font-bold focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="15"
                />
              </div>
            </div>
          `}

          ${step === 3 && html`
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
            ${step === 3 ? 'INITIALIZE SYSTEM' : 'NEXT STEP'}
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
              <div className="bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">TOBY'S PICK</div>
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

// --- PROFILE & STATS VIEW ---
function ProfileView({ user, log, addFood, close }) {
  const [scanning, setScanning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [subTab, setSubTab] = useState('stats');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        addFood({ name: 'Grilled Chicken Salad', macros: { p: 35, c: 12, f: 15 } });
      }, 1500);
    }, 2000);
  };

  if (scanning)
    return html`
      <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-zinc-900">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-violet-500 rounded-lg animate-pulse z-10" />
            <p className="absolute bottom-20 left-0 right-0 text-center text-white font-mono text-sm">ALIGN FOOD IN FRAME</p>
            <button onClick=${() => setScanning(false)} className="absolute top-4 right-4 text-white"><${X} size=${24} /></button>
          </div>
        </div>
      </div>
    `;

  return html`
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <button onClick=${close} className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800"><${ArrowLeft} size=${20} /></button>
        <h2 className="text-xl font-black italic">YOUR PROFILE</h2>
        <button className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-blue-400">Sync</button>
      </div>

      <div className="flex p-1 bg-zinc-900 rounded-xl border border-white/5">
        <button
          onClick=${() => setSubTab('stats')}
          className=${`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${subTab === 'stats' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'}`}
        >
          STATS
        </button>
        <button
          onClick=${() => setSubTab('charts')}
          className=${`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${subTab === 'charts' ? 'bg-violet-600 text-white shadow-sm' : 'text-zinc-500'}`}
        >
          CHARTS
        </button>
      </div>

      ${subTab === 'charts' && html`
        <div className="space-y-4 animate-in slide-in-from-right">
          <${Card} className="p-4 bg-zinc-900">
            <div className="mb-4">
              <div className="text-xs font-bold text-zinc-500 uppercase">Weight Trend</div>
              <div className="text-2xl font-black">185.0 <span className="text-emerald-400 text-sm">-2.1 lbs</span></div>
            </div>
            <div className="h-32 flex items-end gap-2">
              ${[60, 55, 65, 50, 45, 40, 35].map(
                (h, i) => html`
                  <div key=${i} className="flex-1 bg-zinc-800 rounded-t-sm hover:bg-violet-500 transition-colors relative group">
                    <div className="absolute inset-x-0 bottom-0 bg-violet-600 rounded-t-sm" style=${{ height: `${h}%` }} />
                  </div>
                `
              )}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
              <span>MON</span><span>SUN</span>
            </div>
          </${Card}>

          <${Card} className="p-4 bg-zinc-900">
            <div className="mb-4">
              <div className="text-xs font-bold text-zinc-500 uppercase">Recovery Score</div>
              <div className="text-2xl font-black text-emerald-400">92% <span className="text-zinc-500 text-sm text-white">Avg</span></div>
            </div>
            <div className="h-32 flex items-end gap-2">
              ${[80, 40, 90, 70, 85, 95, 92].map(
                (h, i) => html`
                  <div key=${i} className="flex-1 bg-zinc-800 rounded-t-sm relative group">
                    <div className=${`absolute inset-x-0 bottom-0 rounded-t-sm ${h > 80 ? 'bg-emerald-500' : h > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style=${{ height: `${h}%` }} />
                  </div>
                `
              )}
            </div>
          </${Card}>
        </div>
      `}

      ${subTab === 'stats' && html`
        <div className="space-y-6 animate-in slide-in-from-left">
          <${Card} className="bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40 border-violet-500/30 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-lg text-white">Referral Program</div>
                <div className="text-xs text-violet-300">Give friends a free session. You get one too.</div>
              </div>
              <${Share2} size=${20} className="text-violet-400" />
            </div>
            <div className="bg-black/30 p-3 rounded-xl flex justify-between items-center border border-white/10">
              <div className="font-mono text-xl font-bold tracking-widest text-white">${user.referralCode}</div>
              <button className="text-xs font-bold bg-white text-black px-3 py-1.5 rounded-lg">COPY</button>
            </div>
            <div className="mt-4 flex gap-4 text-xs font-bold text-zinc-400">
              <div>Refers: <span className="text-white">${user.referrals}</span></div>
              <div>Sessions Earned: <span className="text-emerald-400">1 Available</span></div>
            </div>
          </${Card}>

          <div className="grid grid-cols-2 gap-3">
            <${Card} className="p-4 flex flex-col items-center justify-center bg-zinc-900/50">
              <${Scale} size=${24} className="text-violet-400 mb-2" />
              <div className="text-2xl font-black">${user.weight} <span className="text-xs text-zinc-500 font-normal">lbs</span></div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Weight</div>
            </${Card}>
            <${Card} className="p-4 flex flex-col items-center justify-center bg-zinc-900/50">
              <${Activity} size=${24} className="text-emerald-400 mb-2" />
              <div className="text-2xl font-black">${user.bf}%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Body Fat</div>
            </${Card}>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Nutrition Log</h3>
              <button onClick=${handleScan} className="flex items-center gap-2 text-violet-400 text-xs font-bold hover:text-white transition">
                <${Camera} size=${16} /> Scan Meal
              </button>
            </div>

            ${analyzing && html`
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-mono text-zinc-400">AI Analyzing Image...</span>
              </div>
            `}

            <div className="space-y-2">
              ${log.map(
                (entry) => html`
                  <div key=${entry.id} className="bg-zinc-900/50 border border-white/5 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">${entry.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono flex gap-2">
                        <span className="text-red-400">P: ${entry.p}g</span>
                        <span className="text-blue-400">C: ${entry.c}g</span>
                        <span className="text-yellow-400">F: ${entry.f}g</span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600 font-mono">${entry.time}</div>
                  </div>
                `
              )}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// --- COACH VIEW ---
function TobyCoachView() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'toby', text: "Toby 2.0 online. I peeked at your recovery data and your CNS is purring. We chasing a PR, or you want to pretend we're sensible today?" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [sassMode, setSassMode] = useState(true);
  const lastReplyRef = useRef('');

  const addMsg = (text, from = 'user') => {
    setMessages((prev) => [...prev, { id: Date.now(), from, text }]);
  };

  const handleAction = (action) => {
    const trimmed = action.trim();
    if (!trimmed) {
      return;
    }
    addMsg(trimmed, 'user');
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
            "Bold. Heavy upper-body day it is. Warm up with the Neuro Drill first, then let's go rearrange gravity.",
            'PR mode. Big lifts, clean form. Start with the Neuro Drill.',
            'Let’s go heavy. Neuro Drill first, then we load the bar.'
          ])
          : pickReply([
            'Heavy upper-body day it is. Warm up with the Neuro Drill first.',
            'Heavy upper-body session queued. Start with the Neuro Drill.',
            'Heavy day confirmed. Begin with the Neuro Drill warm-up.'
          ]);
      } else if (trimmed.includes('Recovery')) {
        resp = sassMode
          ? pickReply([
            'Ah yes, the art of doing nothing aggressively. 20 min sauna + 10 min ice bath. Want me to lock it in?',
            'Recovery is still training. 20 min sauna + 10 min ice bath. Book it?',
            'Chill day, but on purpose. 20 min sauna + 10 min ice bath. Want it locked?'
          ])
          : pickReply([
            'Active recovery queued: 20 min sauna + 10 min ice bath. Want me to lock it in?',
            'Recovery session ready: 20 min sauna + 10 min ice bath. Want me to book it?',
            'Active recovery set: 20 min sauna + 10 min ice bath. Want it scheduled?'
          ]);
      } else if (trimmed.includes('Surprise')) {
        resp = sassMode
          ? pickReply([
            "You're asking a chaos goblin for structure. Fine. 'The Gauntlet' is live: 4 rounds, high intensity, no whining.",
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
            'Noted. If that was the warm-up, you’re ready. Pick strength, hypertrophy, or recovery.',
            'Spicy. Now channel that into a workout. Strength, hypertrophy, or recovery?',
            'You good? Cool. Choose your focus and we’ll move forward.'
          ])
          : pickReply([
            'Heard. Tell me your goal and time available, and I’ll build the plan.',
            'Understood. Share your goal and time available, and I’ll help.',
            'Got it. Tell me your goal, time available, and I’ll take it from there.'
          ]);
      } else if (/(thanks|thank you|thx|appreciate)/.test(lower)) {
        resp = pickReply([
          "You're welcome. I accept payment in PRs and protein.",
          'Anytime. Bring effort and we’re good.',
          'You got it. Now let’s get after it.'
        ]);
      } else if (/(tired|sore|burned out|exhausted|fatigued)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            'Copy that. We go smart today: lighter load, clean tempo, and a recovery finisher. Your future self says thanks.',
            'Got it. We’ll go smart today: lighter load, clean tempo, recovery finisher.',
            'We’ll keep it smart: lighter load, clean tempo, recovery finisher.'
          ])
          : pickReply([
            'Copy that. We go smart today: lighter load, clean tempo, and a recovery finisher.',
            'Understood. Lighter load, clean tempo, recovery finisher.',
            'We’ll scale it down: lighter load, clean tempo, recovery finisher.'
          ]);
      } else if (/(help|plan|workout|train|lift|session)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            "I got you. Tell me your goal, time available, and what equipment you've got. I'll build the plan and roast you lightly.",
            'Give me your goal, time available, and equipment. I’ll handle the rest.',
            'Tell me goal, time, equipment. I’ll build it.'
          ])
          : pickReply([
            "Tell me your goal, time available, and what equipment you've got.",
            'Share your goal, time available, and equipment.',
            "Tell me your goal, time available, and equipment, and I’ll build the plan."
          ]);
      } else if (/(hi|hello|yo|hey|sup)/.test(lower)) {
        resp = sassMode
          ? pickReply([
            "Hey. You brought the vibes; I brought the plan. What's the mission today?",
            'Yo. What are we chasing today?',
            'Hey. Let’s make something happen. What’s the goal?'
          ])
          : pickReply([
            "Hey there. What's the mission today?",
            'Hello. What’s your training goal today?',
            'Hi. What can I help you train today?'
          ]);
      } else {
        resp = sassMode
          ? pickReply([
            'Got it. Pick a target (strength, hypertrophy, recovery) and I’ll make it happen — with just enough sarcasm to keep you humble.',
            'Understood. Give me a target (strength, hypertrophy, recovery) and we’ll go.',
            'Roger that. Choose strength, hypertrophy, or recovery.'
          ])
          : pickReply([
            'Got it. Pick a target (strength, hypertrophy, recovery) and I’ll make it happen.',
            'Understood. Choose strength, hypertrophy, or recovery, and I’ll build the plan.',
            'Got it. Choose a target and I’ll take it from there.'
          ]);
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
        onMouseDown=${handleTap}
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
function MarketView({ cart, setCart, setShowCart, addFood, addXp, credits }) {
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

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
root.render(html`<${TheLabUltimate} />`);
