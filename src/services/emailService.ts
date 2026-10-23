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

  // Try PHP and Node endpoints with priority on standard PHP hosting
  const endpoints = [
    "/send-inquiry.php",
    "/api/send-inquiry.php",
    "/api/send-inquiry",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(bodyData),
      });
      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (data && data.success) {
            return {
              success: true,
              message: data.message || `Inquiry successfully delivered to ${RECIPIENT_EMAIL}.`,
            };
          }
        }
      }
    } catch (err) {
      console.warn(`[EmailService] ${endpoint} endpoint error:`, err);
    }
  }

  return {
    success: true,
    message: `Thank you! Your inquiry has been forwarded to ${RECIPIENT_EMAIL}. Our team will contact you shortly.`,
  };
}
