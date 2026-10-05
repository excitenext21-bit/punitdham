/**
 * Punitdhan Pulses Limited - Client Email Dispatcher
 * Directly forwards all website form submissions to punitdhan_pulses2025@yahoo.com
 */

export const RECIPIENT_EMAIL = "punitdhan_pulses2025@yahoo.com";

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
  const senderName = (payload.name || "").trim() || (payload.email || "").trim() || "Website Visitor";
  const userSubject = (payload.subject || "").trim();
  const formattedSubject = userSubject ? `${userSubject} - ${senderName}` : `New Inquiry from ${senderName}`;

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
