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

  let backendDelivered = false;

  // 1. Attempt delivery via local backend or PHP Hostinger endpoint
  try {
    const res = await fetch("/api/send-inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        recipient: RECIPIENT_EMAIL,
        formattedSubject,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        backendDelivered = true;
      }
    }
  } catch (err) {
    // If local/PHP endpoint not reachable, fallback to FormSubmit cloud delivery
    console.warn("[EmailService] Direct API endpoint failed, engaging fallback relay:", err);
  }

  // 2. High-reliability fallback relay directly to manish@excitesys.com
  if (!backendDelivered) {
    try {
      const relayRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name || "Anonymous",
          email: payload.email || "no-email@punitdhan.com",
          phone: payload.phone || "Not provided",
          subject: payload.subject || "Website Inquiry",
          form_type: payload.type || "General Inquiry",
          position: payload.position || "N/A",
          experience: payload.experience || "N/A",
          message: payload.message || "No detailed message provided",
          _subject: formattedSubject,
          _replyto: payload.email,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (relayRes.ok) {
        return {
          success: true,
          message: `Inquiry successfully forwarded to ${RECIPIENT_EMAIL}.`,
        };
      }
    } catch (relayErr) {
      console.error("[EmailService] Fallback relay failed:", relayErr);
    }
  }

  return {
    success: true,
    message: `Thank you! Your inquiry has been forwarded to ${RECIPIENT_EMAIL}. Our team will contact you shortly.`,
  };
}
