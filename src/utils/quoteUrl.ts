import { BRAND_INFO } from '../data/jatobaData';

export interface QuotePayload {
  expeditionTitle: string;
  regionLabel?: string;
  days?: number;
  modalityLabel: string;
  travelers: number;
  preferredMonth?: string;
  travelerName?: string;
}

export function sanitizeInput(raw: string): string {
  return raw.replace(/[<>]/g, '').trim().slice(0, 120);
}

export function buildQuoteMessage(payload: QuotePayload): string {
  const lines = [
    `Olá, equipe ${BRAND_INFO.name} (${BRAND_INFO.handle})!`,
    `Gostaria de receber valores e próximas datas de saída de Palmas - TO:`,
    `• Roteiro: ${sanitizeInput(payload.expeditionTitle)}`,
  ];

  if (payload.regionLabel && payload.days) {
    lines.push(`• Destino / Duração: ${payload.regionLabel} (${payload.days} dias)`);
  }

  lines.push(`• Modalidade: ${sanitizeInput(payload.modalityLabel)}`);
  lines.push(`• Viajantes: ${Math.max(1, Math.min(20, payload.travelers))} pessoa(s)`);

  if (payload.preferredMonth) {
    lines.push(`• Previsão de mês: ${sanitizeInput(payload.preferredMonth)}`);
  }

  if (payload.travelerName) {
    lines.push(`• Nome: ${sanitizeInput(payload.travelerName)}`);
  }

  return lines.join('\n');
}
