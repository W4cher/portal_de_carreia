"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import SearchBar from "./SearchBar"
import JobCard from "./JobCard"

export default function HomeContent({ jobs }) {
  const { t } = useLanguage()

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t("home.title")}
          <span className="text-[#a01775] block">Africell</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("home.subtitle")}</p>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Jobs Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("home.availableJobs")} ({jobs.length})
          </h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent">
            <option>{t("home.mostRecent")}</option>
            <option>{t("home.highestSalary")}</option>
            <option>{t("home.location")}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  )
}
