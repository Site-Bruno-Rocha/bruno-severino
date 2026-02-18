/**
 * Configurações do site — Bruno Severino | Psicologia
 *
 * Preencha as constantes abaixo conforme necessário.
 */

// Link de incorporação (embed) do Google Agenda Appointment Schedule
// Para obter: Google Agenda → Appointment Schedule → "Publicar" → "Copiar embed"
// Exemplo: "https://calendar.google.com/calendar/appointments/schedules/..."
export const GOOGLE_APPOINTMENT_EMBED_URL = "";

// Link direto para abrir o agendamento em nova aba
export const GOOGLE_APPOINTMENT_DIRECT_URL = "";

// WhatsApp
export const WHATSAPP_NUMBER = "5500000000000"; // Substitua pelo número real (DDI + DDD + número)
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, Bruno! Vim pelo seu site e gostaria de agendar um atendimento. Meu nome é ____ e minha disponibilidade é ____."
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Contato
export const EMAIL_PLACEHOLDER = "contato@brunoseverino.com.br"; // Substitua pelo e-mail real

// CRP
export const CRP = "[INSERIR]"; // Substitua pelo número do CRP
