import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Africell Jobs - Encontre sua próxima oportunidade",
  description: "Plataforma de vagas de emprego da Africell Angola",
    generator: 'Garcia Lisboa Mateus'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
