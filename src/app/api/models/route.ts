import { NextRequest, NextResponse } from "next/server";


export const runtime = "nodejs";

async function readCatalog(baseUrlValue?: string, passwordValue?: string) {
  const baseUrl = (baseUrlValue || process.env.OPENCODE_SERVER_URL || "http://127.0.0.1:4096").replace(/\/$/, "");
  const password = passwordValue || process.env.OPENCODE_SERVER_PASSWORD;
  const headers: Record<string, string> = password
    ? { Authorization: `Basic ${Buffer.from(`opencode:${password}`).toString("base64")}` }
    : {};

  let providers: any[] = [];
  let connected: string[] = [];
  let openCodeError = "";
  try {
    const response = await fetch(`${baseUrl}/provider`, { headers, cache: "no-store", signal: AbortSignal.timeout(9000) });
    if (!response.ok) throw new Error(`OpenCode respondeu ${response.status}`);
    const payload = await response.json();
    connected = payload.connected || [];
    const authResponse = await fetch(`${baseUrl}/provider/auth`, { headers, cache: "no-store", signal: AbortSignal.timeout(9000) }).catch(() => null);
    const authMethods = authResponse?.ok ? await authResponse.json() : {};
    providers = (payload.all || []).map((provider: any) => ({
      id: provider.id,
      name: provider.name || provider.id,
      connected: connected.includes(provider.id),
      authMethods: authMethods[provider.id] || [],
      models: Object.entries(provider.models || {}).map(([id, model]: [string, any]) => ({
        id, name: model.name || id, context: model.limit?.context || null, output: model.limit?.output || null,
        inputPrice: model.cost?.input ?? null, outputPrice: model.cost?.output ?? null,
        free: (provider.id === "opencode" || provider.id === "opencode-go") ? model.cost?.input === 0 : model.cost?.input === 0 && model.cost?.output === 0,
        modalities: model.modalities || null,
      })),
    })).filter((provider: any) => provider.models.length > 0);
  } catch (error) {
    openCodeError = error instanceof Error ? error.message : "OpenCode indisponível";
  }

  if (process.env.GEMINI_API_KEY) providers.unshift({ id: "gemini", name: "Google Gemini", connected: true, models: [{ id: process.env.GEMINI_MODEL || "gemini-2.5-flash", name: "Gemini", free: false }] });
  if (process.env.OPENAI_API_KEY) providers.unshift({ id: "openai", name: "OpenAI API", connected: true, models: [{ id: process.env.OPENAI_MODEL || "gpt-4.1-mini", name: "OpenAI", free: false }] });
  return NextResponse.json({ providers, connected, source: "OpenCode + Gemini + OpenAI", openCodeError });
}

export async function GET() {
  return readCatalog();
}

export async function POST(req: NextRequest) {
  try {
    const { customServerUrl, customServerPassword } = await req.json();
    if (customServerUrl && (typeof customServerUrl !== "string" || !/^https?:\/\//i.test(customServerUrl))) {
      return NextResponse.json({ error: "URL do servidor OpenCode inválida. Use HTTP ou HTTPS." }, { status: 400 });
    }
    return await readCatalog(customServerUrl, customServerPassword);
  } catch (error) {
    return NextResponse.json({ providers: [], connected: [], error: error instanceof Error ? error.message : "Não foi possível consultar o catálogo." }, { status: 503 });
  }
}
