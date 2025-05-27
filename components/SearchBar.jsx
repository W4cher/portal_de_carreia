"use client"

import { useState } from "react"
import { Search, MapPin, Briefcase } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SearchBar() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    // Implementar lógica de busca
    console.log("Buscar:", { searchTerm, location, jobType })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        {/* Campo de busca principal */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("home.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
          />
        </div>

        {/* Campo de localização */}
        <div className="md:w-64 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent appearance-none"
          >
            <option value="">{t("home.allLocations")}</option>
            <option value="luanda">Luanda</option>
            <option value="benguela">Benguela</option>
            <option value="huambo">Huambo</option>
            <option value="lobito">Lobito</option>
          </select>
        </div>

        {/* Campo de tipo de trabalho */}
        <div className="md:w-48 relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent appearance-none"
          >
            <option value="">{t("home.contractType")}</option>
            <option value="tempo-integral">{t("home.fullTime")}</option>
            <option value="meio-periodo">{t("home.partTime")}</option>
            <option value="freelance">{t("home.freelance")}</option>
            <option value="estagio">{t("home.internship")}</option>
          </select>
        </div>

        {/* Botão de busca */}
        <button
          type="submit"
          className="bg-[#a01775] text-white px-8 py-3 rounded-lg hover:bg-[#8a1464] transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>{t("home.search")}</span>
        </button>
      </form>
    </div>
  )
}
