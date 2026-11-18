const rateLimit = new Map();

function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(body);
}

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const configured = Boolean(botToken && chatId);

  if (req.method === "GET") {
    return send(res, 200, { enabled: configured });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
  }

  const origin = req.headers.origin;
  if (origin) {
    try {
      const parsedOrigin = new URL(origin);
      const requestHost = String(req.headers.host || "").toLowerCase();
      if (parsedOrigin.protocol !== "https:" || parsedOrigin.host.toLowerCase() !== requestHost) {
        return send(res, 403, { ok: false, code: "ORIGIN_NOT_ALLOWED" });
      }
    } catch {
      return send(res, 403, { ok: false, code: "ORIGIN_NOT_ALLOWED" });
    }
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const previous = rateLimit.get(ip);
  if (previous && now - previous.startedAt < 60_000 && previous.count >= 5) {
    return send(res, 429, { ok: false, code: "RATE_LIMITED" });
  }
  if (!previous || now - previous.startedAt >= 60_000) {
    rateLimit.set(ip, { startedAt: now, count: 1 });
  } else {
    previous.count += 1;
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const honeypot = clean(body["bot-field"], 120);
  if (honeypot) {
    return send(res, 200, { ok: true });
  }

  const name = clean(body.name, 80);
  const contact = clean(body.contact, 120);
  const destination = clean(body.destination, 60);
  const travelPeriod = clean(body.travel_period, 50);
  const message = clean(body.message, 800);
  const consentValue = body.privacy_consent ?? body.consent;
  const consent = consentValue === "on" || consentValue === "yes" || consentValue === "true" || consentValue === true || consentValue === "1";

  if (!name || name.length < 2 || !contact || contact.length < 5 || !destination || !consent) {
    return send(res, 400, { ok: false, code: "INVALID_INPUT" });
  }

  if (!configured) {
    return send(res, 503, { ok: false, code: "LEAD_CHANNEL_NOT_CONFIGURED" });
  }

  const page = (() => {
    try {
      return new URL(String(req.headers.referer || "https://nextvisa.vercel.app/")).pathname.slice(0, 160);
    } catch {
      return "/";
    }
  })();

  const lines = [
    "NEXTVISA — ЖАҢА ӨТІНІМ",
    "",
    "Аты-жөні: " + name,
    "Байланыс: " + contact,
    "Бағыт: " + destination,
    "Сапар мерзімі: " + (travelPeriod || "Көрсетілмеген"),
    "Қосымша ақпарат: " + (message || "Жоқ"),
    "Келісім: берілді",
    "Бет: " + page,
    "Уақыты (UTC): " + new Date().toISOString()
  ];

  try {
    const telegramResponse = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), disable_web_page_preview: true })
    });

    const telegramResult = await telegramResponse.json().catch(() => ({}));
    if (!telegramResponse.ok || telegramResult.ok !== true) {
      return send(res, 502, { ok: false, code: "DELIVERY_FAILED" });
    }
  } catch {
    return send(res, 502, { ok: false, code: "DELIVERY_FAILED" });
  }

  return send(res, 200, { ok: true });
}
