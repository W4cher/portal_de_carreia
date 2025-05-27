"use client"

import { useState } from "react"
import { Calendar, FileText, Building, ChevronDown, ChevronUp, Eye, RefreshCw } from "lucide-react"

export default function ApplicationStatusCard({ application }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "Em análise":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Aplicação enviada":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Aprovado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Rejeitado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{application.jobTitle}</h3>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center space-x-1">
              <Building className="w-4 h-4" />
              <span>{application.company}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Aplicado em {formatDate(application.appliedDate)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* CV Usado */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Currículo Enviado</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4 text-[#a01775]" />
                <span>{application.cvUsed}</span>
              </div>
            </div>

            {/* Ações */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Ações</h4>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 text-xs bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>Ver Vaga</span>
                </button>

                {application.status === "Aplicação enviada" && (
                  <button className="flex items-center space-x-1 text-xs bg-[#a01775] text-white py-2 px-3 rounded hover:bg-[#8a1464] transition-colors">
                    <RefreshCw className="w-3 h-3" />
                    <span>Alterar CV</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Timeline de Status */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Histórico</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Aplicação enviada - {formatDate(application.appliedDate)}</span>
              </div>

              {application.status === "Em análise" && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Em análise pelo RH - {formatDate(new Date().toISOString())}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
