import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { 
  title: "CyberHuntLab | Security Research & Bug Bounty", 
  description: "Plataforma independente para pesquisa de segurança autorizada, triagem de evidências e responsible disclosure." 
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
