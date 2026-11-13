export const SUGGESTIONS = [
  'Is there a dress code',
  'Do you take reservations?',
  'Do you take reservations?',
  'Is there a dress code',
]

const KB = [
  [/dress|wear|attire|casual/, 'We keep it smart casual. Jackets are optional, but please skip sportswear, flip-flops, and beachwear.'],
  [/reserv|book|table|availab|seat/, 'Yes, we take reservations for parties of 1–10. Tell us the date, time, and party size and we’ll check availability for you.'],
  [/hour|open|close|time/, 'We’re open Tue–Sun, 12:00 to 23:00. Kitchen closes at 22:00. Closed on Mondays.'],
  [/where|direction|address|locat|park/, 'You’ll find us at 24 Harbour Street, a 4-minute walk from Central Station. Paid parking is behind the building.'],
  [/menu|dish|food|eat|vegan|vegetarian|gluten|allerg|special/, 'Our menu changes with the season, with plenty of vegetarian, vegan, and gluten-free options. Tell us any allergies and the kitchen will adapt.'],
  [/price|cost|expens|budget/, 'Starters run $8–14, mains $18–36, desserts $9–12. The tasting menu is $65 per person.'],
  [/kid|child|family|baby/, 'Families are very welcome. We have high chairs and a children’s menu.'],
  [/pay|card|tip|cash/, 'We accept all major cards and mobile payments. Cash is welcome too.'],
  [/^(hi|hello|hey|yo)\b/, 'Hi there! Ask us about our dishes, bookings, directions, or anything else.'],
  [/thank/, 'You’re welcome! Anything else we can help with?'],
]

const FALLBACK = 'Thanks for your message! Our team will get back to you shortly. Meanwhile, try asking about the dress code, reservations, hours, or directions.'

export const findAnswer = (q) => KB.find(([re]) => re.test(q.toLowerCase()))?.[1] ?? FALLBACK
