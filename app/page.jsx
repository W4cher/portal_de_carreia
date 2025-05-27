import Navbar from "@/components/Navbar"
import HomeContent from "@/components/HomeContent"

// Dados simulados das vagas
const mockJobs = [
  {
    id: 1,
    referenceCode: "AFC-DEV-001",
    title: "Desenvolvedor Frontend React",
    location: "Luanda, Angola",
    contractType: "Tempo Integral",
    salary: "150.000 - 250.000 AOA",
    company: "Africell",
    publishedDate: "2024-01-22",
    description:
      "Procuramos um desenvolvedor frontend experiente em React.js para integrar nossa equipe de tecnologia...",
    requirements: ["3+ anos de experiência em React", "Conhecimento em TypeScript", "Experiência com APIs REST"],
    benefits: ["Plano de saúde", "Vale alimentação", "Horário flexível", "Desenvolvimento profissional"],
  },
  {
    id: 2,
    referenceCode: "AFC-MKT-002",
    title: "Analista de Marketing Digital",
    location: "Luanda, Angola",
    contractType: "Tempo Integral",
    salary: "120.000 - 180.000 AOA",
    company: "Africell",
    publishedDate: "2024-01-20",
    description: "Buscamos profissional para gerenciar campanhas digitais e estratégias de marketing online...",
    requirements: ["Experiência em Google Ads", "Conhecimento em SEO/SEM", "Análise de dados"],
    benefits: ["Plano de saúde", "Vale alimentação", "Bônus por performance"],
  },
  {
    id: 3,
    referenceCode: "AFC-ENG-003",
    title: "Engenheiro de Telecomunicações",
    location: "Benguela, Angola",
    contractType: "Tempo Integral",
    salary: "200.000 - 300.000 AOA",
    company: "Africell",
    publishedDate: "2024-01-18",
    description: "Oportunidade para engenheiro especializado em redes de telecomunicações...",
    requirements: ["Formação em Engenharia", "Experiência em redes móveis", "Certificações técnicas"],
    benefits: ["Plano de saúde", "Vale alimentação", "Carro da empresa", "Seguro de vida"],
  },
  {
    id: 4,
    referenceCode: "AFC-SUP-004",
    title: "Especialista em Atendimento ao Cliente",
    location: "Huambo, Angola",
    contractType: "Meio Período",
    salary: "80.000 - 120.000 AOA",
    company: "Africell",
    publishedDate: "2024-01-15",
    description: "Procuramos profissional dedicado para atendimento e suporte aos nossos clientes...",
    requirements: ["Experiência em atendimento", "Comunicação excelente", "Conhecimento básico de informática"],
    benefits: ["Plano de saúde", "Vale transporte", "Treinamento contínuo"],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HomeContent jobs={mockJobs} />
    </div>
  )
}
