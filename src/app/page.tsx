import { ArrowUpRight, ShieldCheck, FolderGit2, Crosshair, ClipboardCheck, FileText, LockKeyhole, ScanLine } from 'lucide-react';
import './research.css';

const features = [
  { icon: Crosshair, title: 'Scope management', desc: 'Registre o programa, ativos elegíveis e regras antes de iniciar a pesquisa.' },
  { icon: FolderGit2, title: 'Code security', desc: 'Encaminhe repositórios autorizados ao Daybreak e registre as referências dos achados.' },
  { icon: ClipboardCheck, title: 'Evidence & triage', desc: 'Organize observações, risco, CWE e evidências sem confundir hipóteses com fatos.' },
  { icon: FileText, title: 'Responsible disclosure', desc: 'Exporte relatórios Markdown revisáveis para submissão manual ao programa.' },
];

export default function Home() {
  return <main className="ch-landing">
    <nav className="ch-nav"><a className="ch-brand" href="/"><ShieldCheck size={28}/> CyberHunt<span>Lab</span></a><div><a href="#platform">Plataforma</a><a href="#workflow">Metodologia</a><a className="ch-btn small" href="/security">Console <ArrowUpRight size={16}/></a></div></nav>
    <section className="ch-hero"><div><div className="ch-kicker"><span/> SECURITY RESEARCH PLATFORM / 01</div><h1>Confiança começa<br/>com <em>evidências.</em></h1><p>Um ambiente de pesquisa de segurança responsável para bug bounty, revisão de código e colaboração com equipes de engenharia.</p><div className="ch-actions"><a className="ch-btn" href="/security">Iniciar pesquisa <ArrowUpRight size={18}/></a><a className="ch-outline" href="#platform">Explorar plataforma</a></div><div className="ch-trust"><LockKeyhole size={16}/> Escopo autorizado · Revisão humana · Sem exploração automática</div></div>
    <div className="ch-preview"><header><span><ScanLine size={18}/> RESEARCH WORKSPACE</span><b>DEMONSTRAÇÃO</b></header><div className="ch-orbit"><div className="ch-ring"><ShieldCheck size={76}/></div></div><div className="ch-preview-row"><span>01 / Autorização</span><b>Obrigatória</b></div><div className="ch-preview-row"><span>02 / Code review</span><b>Via Daybreak</b></div><div className="ch-preview-row"><span>03 / Evidência</span><b>Revisão humana</b></div><div className="ch-preview-row"><span>04 / Disclosure</span><b>Exportação manual</b></div></div></section>
    <section id="platform" className="ch-section"><div className="ch-kicker">01 / CAPACIDADES</div><h2>Pesquisa, do escopo ao relatório.</h2><div className="ch-grid">{features.map(({icon:Icon,title,desc})=><article key={title}><Icon size={28}/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
    <section id="workflow" className="ch-section"><div className="ch-kicker">02 / METODOLOGIA</div><h2>Um processo verificável.</h2><div className="ch-steps">{['Definir escopo','Revisar código','Triar evidências','Exportar relatório'].map((x,i)=><div key={x}><b>0{i+1}</b>{x}</div>)}</div><p className="ch-note">Daybreak Defense Factory é um serviço separado da OpenAI. A execução depende de autorização e de um ambiente GitHub elegível. CyberHuntLab não presume acesso nem substitui a validação de um pesquisador.</p><a className="ch-outline" href="/security">Abrir central de pesquisa <ArrowUpRight size={16}/></a></section><footer className="ch-footer">CyberHuntLab · Projeto de pesquisa independente · Ana Caroline Lamas</footer>
  </main>;
}
