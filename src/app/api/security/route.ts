import {NextRequest,NextResponse} from "next/server";
import {callDirectAI} from "@/lib/direct-ai";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if (!process.env.APP_ACCESS_TOKEN || req.headers.get("x-app-token")!==process.env.APP_ACCESS_TOKEN) return NextResponse.json({error:"Configure APP_ACCESS_TOKEN e autentique a requisição."},{status:401});
 try {
  const {target,program,scope,notes,provider="gemini",mode="report",consent}=await req.json();
  if(consent!==true) return NextResponse.json({error:"Confirme autorização explícita."},{status:400});
  if (typeof target!=="string" || !/^https:\/\/[^\s]+$/i.test(target) || target.length>2048) return NextResponse.json({error:"Informe URL HTTPS válida."},{status:400});
  let parsed:URL; try{parsed=new URL(target);}catch{return NextResponse.json({error:"URL inválida."},{status:400});} if(parsed.username||parsed.password||parsed.search||parsed.hash) return NextResponse.json({error:"URL não pode conter credenciais, parâmetros ou fragmentos."},{status:400});
  if (typeof scope!=="string" || scope.trim().length<10) return NextResponse.json({error:"Informe o escopo e a autorização do programa."},{status:400});
  if (!["gemini","openai"].includes(provider) || !["plan","report"].includes(mode)) return NextResponse.json({error:"Opção inválida."},{status:400});
  const prompt=`Você é analista de segurança para programas bug bounty autorizados. Não invente testes executados, resultados, impactos ou vulnerabilidades. Não execute testes ativos. Diferencie hipóteses de evidências verificadas. Gere em Markdown ${mode==="plan"?"um plano de verificação não destrutiva, limites, requisitos de autorização e checklist":"um rascunho de relatório de vulnerabilidade com título, resumo, impacto, reprodução somente se sustentada por evidências, severidade provisória, correção e itens faltantes"}. Alvo: ${target}. Programa: ${String(program||"").slice(0,200)}. Escopo/regras informados: ${scope.slice(0,5000)}. Evidências/notas do pesquisador: ${String(notes||"").slice(0,12000)}. Não afirme que o Codex Security foi acionado.`;
  const result=await callDirectAI(provider,"",prompt);
  return NextResponse.json({report:result.text,modelUsed:result.model,verified:false,officialCodexSecurityIntegration:false});
 } catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Falha ao gerar relatório"},{status:502});}
}
