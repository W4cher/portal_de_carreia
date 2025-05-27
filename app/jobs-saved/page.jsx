"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import JobCard from "@/components/JobCard"
import { Bookmark, Search, Filter } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Dados simulados de vagas salvas
const savedJobs = [
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
    savedDate: "2024-01-20",
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
    savedDate: "2024-01-18",
  },
]

export default function JobsSaved() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    if (sortBy === "company") {
      return a.company.localeCompare(b.company)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#a01775] rounded-full flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t("saved.title")}</h1>
              <p className="text-gray-600">{t("saved.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t("saved.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="md:w-48 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent appearance-none"
              >
                <option value="recent">{t("home.mostRecent")}</option>
                <option value="title">Por título</option>
                <option value="company">Por empresa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {sortedJobs.length} {sortedJobs.length === 1 ? t("saved.jobSaved") : t("saved.jobsSaved")}
            </h2>

            {sortedJobs.length > 0 && (
              <button className="text-sm text-red-600 hover:text-red-800 transition-colors">
                {t("saved.clearAll")}
              </button>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        {sortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
              <div key={job.id} className="relative">
                <JobCard job={job} />

                {/* Saved Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-[#a01775] text-white p-2 rounded-full shadow-lg">
                    <Bookmark className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* Saved Date */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-xs text-gray-600 px-2 py-1 rounded">
                    {t("saved.savedOn")} {new Date(job.savedDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? t("saved.noJobsFound") : t("saved.noJobsSaved")}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm ? t("saved.adjustSearch") : t("saved.startSaving")}
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#a01775] text-white px-6 py-3 rounded-lg hover:bg-[#8a1464] transition-colors font-medium"
            >
              {t("profile.exploreJobs")}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
