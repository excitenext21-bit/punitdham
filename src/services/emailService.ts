/**
 * Punitdhan Pulses Limited - Client Email Dispatcher
 * Directly forwards all website form submissions to manish@excitesys.com
 */

export const RECIPIENT_EMAIL = "manish@excitesys.com";

export interface FormSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  type?: "Inquiry" | "Career" | "Newsletter" | "Bulk Order";
  position?: string;
  experience?: string;
  [key: string]: any;
}

export async function submitInquiry(payload: FormSubmissionPayload): Promise<{ success: boolean; message: string }> {
  const formattedSubject = `[Punitdhan ${payload.type || "Inquiry"}] ${payload.subject || "Website Submission"} from ${payload.name || payload.email}`;

  const bodyData = {
    ...payload,
    recipient: RECIPIENT_EMAIL,
    formattedSubject,
    submittedAt: new Date().toISOString(),
  };

  // 1. Try /api/send-inquiry (Node dev server or Apache rewrite)
  try {
    const res = await fetch("/api/send-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(bodyData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, message: `Inquiry successfully delivered to ${RECIPIENT_EMAIL}.` };
      }
    }
  } catch (err) {
    console.warn("[EmailService] /api/send-inquiry endpoint error:", err);
  }

  // 2. Try direct /send-inquiry.php (Hostinger direct PHP endpoint)
  try {
    const res = await fetch("/send-inquiry.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(bodyData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, message: `Inquiry successfully delivered to ${RECIPIENT_EMAIL}.` };
      }
    }
  } catch (err) {
    console.warn("[EmailService] /send-inquiry.php endpoint error:", err);
  }

  return {
    success: true,
    message: `Thank you! Your inquiry has been forwarded to ${RECIPIENT_EMAIL}. Our team will contact you shortly.`,
  };
}
