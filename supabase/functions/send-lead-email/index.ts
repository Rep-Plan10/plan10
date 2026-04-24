import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

interface LeadData {
  nome?: string;
  telefone?: string;
  email?: string;
  tipoConsorcio?: string;
  nicho?: string;
  faixaCredito?: string;
  mensagem?: string;
}

function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value?: string) {
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:600;color:#1A1F8F;width:180px;font-family:Arial,sans-serif;font-size:14px;">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#333;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(value || "Não informado")}</td>
    </tr>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const lead: LeadData = await req.json();

    if (!lead?.nome || !lead?.telefone) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios ausentes (nome, telefone)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">
    <div style="max-width:620px;margin:24px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(135deg,#06006B,#1A4FD8);padding:24px;color:#fff;text-align:center;">
        <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;">Novo Lead — Plan10 Consórcios</h1>
        <p style="margin:0;font-size:13px;opacity:0.9;">Um novo cliente preencheu o formulário</p>
      </div>

      <div style="padding:24px;">
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${row("Nome", lead.nome)}
          ${row("Telefone / WhatsApp", lead.telefone)}
          ${row("E-mail", lead.email)}
          ${row("Tipo de Consórcio", lead.tipoConsorcio)}
          ${row("Nicho", lead.nicho)}
          ${row("Faixa de Crédito", lead.faixaCredito)}
          ${lead.mensagem ? row("Mensagem", lead.mensagem) : ""}
        </table>

        <div style="margin-top:22px;background:#FFF4EC;border-left:4px solid #F97316;padding:14px 16px;border-radius:6px;">
          <p style="margin:0;color:#7a3a00;font-size:14px;font-weight:600;">
            Entre em contato em até 1 hora útil para maximizar a conversão.
          </p>
        </div>
      </div>

      <div style="background:#fafafa;padding:14px 24px;text-align:center;color:#888;font-size:12px;">
        Enviado automaticamente pela Landing Page Plan10 Consórcios — ${escapeHtml(dataHora)}
      </div>
    </div>
  </body>
</html>`;

    const subject = `🔔 Novo Lead: ${lead.nome}${lead.tipoConsorcio ? " — " + lead.tipoConsorcio : ""}`;

    // IMPORTANTE: enquanto o domínio plan10.com.br não estiver verificado no Resend
    // (resend.com/domains), o serviço só permite envios para o email da conta dona da
    // chave. Após verificar o domínio, troque "to" para ["contato@plan10.com.br"].
    const TO_EMAIL = Deno.env.get("LEAD_NOTIFICATION_EMAIL") || "plan10consorcios@nextassessoria.com";

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Plan10 Consórcios <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject,
        html,
        reply_to: lead.email || undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend error:", res.status, data);
      throw new Error(`Resend API call failed [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, id: data?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("send-lead-email error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
