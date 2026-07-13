export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "FlashGen",
  slug: "flashcard-gen",
  tagline: "Notes to Q/A flashcards in seconds",
  description: "Paste a topic, notes, or a paragraph; get a set of question/answer flashcards ready to study. For students and self-learners who want active recall without the busywork.",
  toolTitle: "Generate flashcards",
  resultLabel: "Your flashcards",
  ctaLabel: "Generate",
  features: [
  "Q/A pairs",
  "Pick count",
  "Copy-ready",
  "No signup"
],
  inputs: [
  {
    "key": "text",
    "label": "Topic or notes",
    "type": "textarea",
    "placeholder": "Mitochondria produce ATP. Photosynthesis occurs in chloroplasts. DNA stores genetic info."
  },
  {
    "key": "count",
    "label": "How many",
    "type": "select",
    "options": [
      "5",
      "10",
      "15"
    ]
  }
] as InputField[],
  systemPrompt: "You are a study coach. Given source text and a card count, produce that many Q/A flashcards that test active recall of the key facts. Keep answers concise.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Plus",
    "price": "$9/mo",
    "desc": "Save sets, export"
  },
  {
    "tier": "Team",
    "price": "$29/mo",
    "desc": "Class decks, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const text = (inputs['text'] || '').trim()
  const n = parseInt((inputs['count'] || '5').replace(/\D/g, '')) || 5
  if (!text) return 'Paste a topic or notes to generate flashcards.'
  const facts = text.split(/[.\n]/).map(s => s.trim()).filter(s => s.length > 3)
  let out = 'FLASHCARDS (' + n + ')\n\n'
  for (let i = 1; i <= n; i++) {
    const f = facts[i % facts.length] || 'Key concept ' + i
    out += 'Q' + i + ': What is "' + f.slice(0, 40) + '"?\nA' + i + ': ' + f + '\n\n'
  }
  return out + '--- (Mock heuristic. Add OPENAI_API_KEY for real Q/A generation.)'
}
}
