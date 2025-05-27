"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, Bookmark, Briefcase } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simular estado de login
  const { t } = useLanguage()

  return (
    <nav className="bg-white shadow-lg border-b-2 border-[#a01775]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#a01775] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-[#a01775]">Africell Jobs</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-1">
              <Briefcase className="w-4 h-4" />
              <span>{t("nav.allJobs")}</span>
            </Link>

            <Link
              href="/jobs-saved"
              className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-1"
            >
              <Bookmark className="w-4 h-4" />
              <span>{t("nav.jobsSaved")}</span>
            </Link>

            <Link
              href="/perfil"
              className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-1"
            >
              <User className="w-4 h-4" />
              <span>{t("nav.myProfile")}</span>
            </Link>

            {/* Language Selector */}
            <LanguageSelector />

            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-gray-700 hover:text-[#a01775] transition-colors"
              >
                {t("nav.logout")}
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#a01775] text-white px-6 py-2 rounded-lg hover:bg-[#8a1464] transition-colors font-medium"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>{t("nav.allJobs")}</span>
              </Link>

              <Link
                href="/jobs-saved"
                className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>{t("nav.jobsSaved")}</span>
              </Link>

              <Link
                href="/perfil"
                className="text-gray-700 hover:text-[#a01775] transition-colors flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>{t("nav.myProfile")}</span>
              </Link>

              {/* Language Selector Mobile */}
              <div className="pt-2 border-t border-gray-200">
                <LanguageSelector />
              </div>

              {isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-left text-gray-700 hover:text-[#a01775] transition-colors"
                >
                  {t("nav.logout")}
                </button>
              ) : (
                <Link href="/login" className="text-[#a01775] font-medium">
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
