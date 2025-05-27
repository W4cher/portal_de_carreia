"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import { MapPin, Clock, DollarSign, Building, ArrowLeft, CheckCircle, Users, Hash, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Dados simulados das vagas (mesmo do page.jsx)
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
      "Procuramos um desenvolvedor frontend experiente em React.js para integrar nossa equipe de tecnologia. Você será responsável por desenvolver interfaces modernas e responsivas, trabalhando em projetos inovadores que impactam milhões de usuários em Angola.",
    requirements: [
      "3+ anos de experiência em React",
      "Conhecimento em TypeScript",
      "Experiência com APIs REST",
      "Git e metodologias ágeis",
      "Inglês intermediário",
    ],
    benefits: [
      "Plano de saúde",
      "Vale alimentação",
      "Horário flexível",
      "Desenvolvimento profissional",
      "Bônus por performance",
    ],
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
]

export default function JobDetails() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simular estado de login

  const jobId = Number.parseInt(params.id)
  const job = mockJobs.find((j) => j.id === jobId)

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("common.jobNotFound")}</h1>
            <button onClick={() => router.back()} className="text-[#a01775] hover:underline">
              {t("common.back")}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#a01775] hover:text-[#8a1464] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t("job.backToJobs")}
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Job Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <Hash className="w-4 h-4 mr-1" />
                    <span>Ref: {job.referenceCode}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Publicado em {new Date(job.publishedDate).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

                <div className="flex items-center text-gray-600 mb-4">
                  <Building className="w-5 h-5 mr-2 text-[#a01775]" />
                  <span className="text-lg font-medium">{job.company}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-[#a01775]" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-[#a01775]" />
                    <span>{job.contractType}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2 text-[#a01775]" />
                    <span className="font-medium">{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("job.jobDescription")}</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("job.requirements")}</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("job.benefits")}</h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#a01775] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("job.applyForJob")}</h3>

              <div className="mb-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="w-5 h-5 mr-2 text-[#a01775]" />
                  <span className="text-sm">12 {t("job.candidatesApplied")}</span>
                </div>
                <div className="text-sm text-gray-500">{t("job.publishedDaysAgo")}</div>
              </div>

              <button
                onClick={() => router.push(`/aplicar/${jobId}`)}
                className="w-full bg-[#a01775] text-white py-3 px-4 rounded-lg hover:bg-[#8a1464] transition-colors font-medium mb-4"
              >
                {t("job.applyNow")}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">{t("job.shareJob")}</h4>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
