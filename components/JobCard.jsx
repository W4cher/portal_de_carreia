"use client"

import Link from "next/link"
import { MapPin, Clock, DollarSign, Building, Calendar, Hash } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function JobCard({ job }) {
  const { t } = useLanguage()

  // Função para calcular dias desde a publicação
  const getDaysAgo = (publishedDate) => {
    const today = new Date()
    const published = new Date(publishedDate)
    const diffTime = Math.abs(today - published)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "Há 1 dia"
    } else if (diffDays <= 7) {
      return `Há ${diffDays} dias`
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7)
      return weeks === 1 ? "Há 1 semana" : `Há ${weeks} semanas`
    } else {
      const months = Math.floor(diffDays / 30)
      return months === 1 ? "Há 1 mês" : `Há ${months} meses`
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header com código de referência */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              <Hash className="w-3 h-3 mr-1" />
              <span>{job.referenceCode}</span>
            </div>
            <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{getDaysAgo(job.publishedDate)}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="w-4 h-4 mr-1" />
            <span className="text-sm">{job.company}</span>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-[#a01775]" />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-[#a01775]" />
          <span className="text-sm">{job.contractType}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2 text-[#a01775]" />
          <span className="text-sm font-medium">{job.salary}</span>
        </div>
      </div>

      {/* Description Preview */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

      {/* Footer com data de publicação e botão */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Publicado em {new Date(job.publishedDate).toLocaleDateString("pt-BR")}
        </div>
        <Link
          href={`/vaga/${job.id}`}
          className="bg-[#a01775] text-white py-2 px-4 rounded-lg hover:bg-[#8a1464] transition-colors text-sm font-medium"
        >
          {t("job.viewDetails")}
        </Link>
      </div>
    </div>
  )
}
