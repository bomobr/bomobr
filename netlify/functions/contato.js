// Recebe o formulário e envia ao WhatsApp da bomo pela API oficial (WhatsApp Cloud API).
// Segredos ficam nas variáveis de ambiente do Netlify, nunca no site.
// Variáveis: WA_TOKEN, WA_PHONE_ID, WA_TO (ex.: 5534984139065), WA_TEMPLATE, ALLOWED_ORIGIN (ex.: https://seudominio.com.br)
const hits = new Map();
const cut = (s, n) => String(s || "").replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, n);
const res = (code, body) => ({ statusCode: code, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return res(405, { ok: false });
  const origin = event.headers.origin || "";
  if (process.env.ALLOWED_ORIGIN && origin !== process.env.ALLOWED_ORIGIN) return res(403, { ok: false });

  const ip = (event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "").split(",")[0];
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 3) return res(429, { ok: false });
  hits.set(ip, [...recent, now]);

  let d;
  try { d = JSON.parse(event.body || "{}"); } catch { return res(400, { ok: false }); }
  if (d.site) return res(200, { ok: true }); // campo isca: robôs caem aqui

  const f = { nome: cut(d.nome, 100), empresa: cut(d.empresa, 100), projeto: cut(d.projeto, 400), invest: cut(d.invest, 30) };
  if (!f.nome || !f.empresa || !f.projeto || !f.invest) return res(400, { ok: false });

  const r = await fetch(`https://graph.facebook.com/v20.0/${process.env.WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: process.env.WA_TO,
      type: "template",
      template: {
        name: process.env.WA_TEMPLATE || "novo_contato",
        language: { code: "pt_BR" },
        components: [{ type: "body", parameters: [f.nome, f.empresa, f.invest, f.projeto].map((text) => ({ type: "text", text })) }],
      },
    }),
  });
  return r.ok ? res(200, { ok: true }) : res(502, { ok: false });
};
