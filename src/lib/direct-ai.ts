export async function callDirectAI(provider: string, model: string, prompt: string): Promise<{text:string;model:string}> {
  const isGemini = provider === "gemini";
  const key = isGemini ? process.env.GEMINI_API_KEY : process.env.OPENAI_API_KEY;
  if (!key) throw new Error(`Configure ${isGemini ? "GEMINI_API_KEY" : "OPENAI_API_KEY"} no servidor.`);
  const selected = model || (isGemini ? process.env.GEMINI_MODEL || "gemini-2.5-flash" : process.env.OPENAI_MODEL || "gpt-4.1-mini");
  const url = isGemini ? `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(selected)}:generateContent` : "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...(isGemini ? { "x-goog-api-key": key } : { Authorization: `Bearer ${key}` }) }, body: JSON.stringify(isGemini ? { contents: [{ parts: [{ text: prompt }] }] } : { model: selected, messages: [{role:"user",content:prompt}] }), signal: AbortSignal.timeout(55000), cache:"no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`API ${provider} HTTP ${response.status}: ${String(payload?.error?.message || "Falha na requisição").slice(0,200)}`);
  const text = isGemini ? (payload?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("\n") : payload?.choices?.[0]?.message?.content;
  if (!text || typeof text !== "string") throw new Error(`API ${provider} não retornou texto.`);
  return {text,model:selected};
}
