// src/pages/api/enviar-leads.ts
export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    console.log("[API /api/enviar-leads] Lead payload received:", data);

    const webhookUrl = import.meta.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn(
        "[API /api/enviar-leads] GHL_WEBHOOK_URL environment variable is not defined.",
      );
      return new Response(
        JSON.stringify({
          ok: true,
          message:
            "Lead received successfully (GHL_WEBHOOK_URL not configured).",
          data,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(
        "[API /api/enviar-leads] Webhook error:",
        response.status,
        errorText,
      );
      return new Response(
        JSON.stringify({
          error: "Error al enviar al webhook",
          details: errorText,
        }),
        {
          status: response.status || 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const resData = await response.json().catch(() => ({}));
    console.log("[API /api/enviar-leads] Webhook response:", resData);

    return new Response(JSON.stringify({ ok: true, data: resData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[API /api/enviar-leads] Exception:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
        details: error?.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
