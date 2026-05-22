/** @typedef {'janam_kundli' | 'kundli_milan' | 'ask_question'} ServiceId */

/**
 * @type {Record<ServiceId, {
 *   id: ServiceId;
 *   title: string;
 *   shortTitle: string;
 *   path: string;
 *   priceInr: number;
 *   slaHours: number;
 *   description: string;
 *   highlights: string[];
 *   icon: string;
 *   accent: string;
 * }>}
 */
export const services = {
  janam_kundli: {
    id: 'janam_kundli',
    title: 'Janam Kundli',
    shortTitle: 'Birth chart',
    icon: '☉',
    accent: 'violet',
    path: '/janam-kundli',
    priceInr: 499,
    slaHours: 72,
    description:
      'A detailed birth chart prepared manually from your date, time, and place of birth — delivered to your email.',
    highlights: [
      'Personalized chart analysis',
      'Key yogas and planetary positions',
      'Delivered within 3 business days',
    ],
  },
  kundli_milan: {
    id: 'kundli_milan',
    title: 'Kundli Milan',
    shortTitle: 'Compatibility',
    icon: '♡',
    accent: 'rose',
    path: '/kundli-milan',
    priceInr: 799,
    slaHours: 72,
    description:
      'Gun milan and compatibility insights for two people — ideal for marriage or relationship decisions.',
    highlights: [
      'Ashtakoot / gun milan overview',
      'Dosha notes where applicable',
      'Both partners’ birth details required',
    ],
  },
  ask_question: {
    id: 'ask_question',
    title: 'Ask a Question',
    shortTitle: 'Quick guidance',
    icon: '✦',
    accent: 'gold',
    path: '/ask-question',
    priceInr: 299,
    slaHours: 48,
    description:
      'One focused question answered by our astrologer with the context you provide.',
    highlights: [
      'One clear question per order',
      'Optional birth details for chart-based answers',
      'Reply within 2 business days',
    ],
  },
}

export const serviceList = Object.values(services)

export function formatPrice(inr) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr)
}

export function formatSla(hours) {
  if (hours <= 48) return '2 business days'
  if (hours <= 72) return '3 business days'
  const days = Math.ceil(hours / 24)
  return `${days} business days`
}
