# CyberHunterLab — Security Research Center

Esta edição oferece uma central `/security` para registrar escopo autorizado, organizar achados e exportar relatórios Markdown sem API externa. A assistência opcional de IA usa Gemini ou OpenAI; o Daybreak é acessado separadamente pelo link oficial. O estúdio legado está desativado por padrão. Consulte AUDITORIA-DAYBREAK.md.

## Codex Security

**Não existe integração oficial com API Codex Security implementada neste ZIP.** A aprovação do usuário na interface do Codex Security não equivale a credenciais API nem garante endpoint de terceiros. Utilize a interface oficial de acordo com suas permissões; importe manualmente descobertas autorizadas, sem segredos, para a central de relatórios. Nenhum scan é executado por esta central. Não declarar vulnerabilidades confirmadas sem evidências.

## Instalação

1. `cp .env.example .env.local` e preencha `APP_ACCESS_TOKEN` e pelo menos uma das chaves `GEMINI_API_KEY` ou `OPENAI_API_KEY`.
2. `npm install`
3. `npm run build`
4. `npm run start` (padrão porta 3000). Use NGINX como proxy HTTPS e mantenha a porta Node privada.
5. Acesse `/security`, forneça o token da aplicação e informações de escopo, gere e baixe Markdown.

## Cloudflare / NGINX

Crie registro A para `cyberhuntlab.com.br` apontando a VPS; preserve MX/TXT existentes. Configure HTTPS no Cloudflare em modo Full (strict), com certificado válido na origem. Antes de alterar o NGINX, confira sites já hospedados. Não exponha serviços administrativos ou APIs sem autenticação.

## Segurança e limites

- Apenas projetos próprios ou explicitamente autorizados; respeite regras e limites de cada programa.
- A central não testa URLs, não verifica escopo automaticamente, não dispara exploração, nem envia relatórios para plataformas externas.
- Saída de IA é rascunho, sujeito à revisão humana; não garante recompensa.
- `APP_ACCESS_TOKEN` obrigatório na rota `/api/security`. Nunca publique `.env.local`.
- Não forneça dados sensíveis ou credenciais nos campos de evidências.
