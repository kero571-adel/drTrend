import crypto from "crypto";

function hashData(data: string): string {
  return crypto
    .createHash("sha256")
    .update(data.trim().toLowerCase())
    .digest("hex");
}

export async function sendMetaCapiEvent(
  eventName: string,
  eventData: {
    value?: number;
    currency?: string;
    email?: string;
    phone?: string;
  },
  eventSourceUrl: string
) {
  const payload: Record<string, any> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: {
          em: eventData.email ? [hashData(eventData.email)] : undefined,
          ph: eventData.phone ? [hashData(eventData.phone)] : undefined,
        },
        custom_data: {
          value: eventData.value,
          currency: eventData.currency || "EGP",
        },
      },
    ],
  };

  // مهم: بيتضاف بس وقت الاختبار، تشيله بعد ما تتأكد إنه شغال
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    console.error("Meta CAPI error:", result);
  } else {
    console.log("Meta CAPI event sent:", eventName, result);
  }

  return result;
}