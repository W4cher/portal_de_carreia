"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import ApplicationStatusCard from "@/components/ApplicationStatusCard"
import { User, Mail, Phone, FileText, Edit, Upload, Download, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Dados simulados do usuário
const mockUser = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "+244 900 123 456",
  cvFileName: "joao_silva_cv.pdf",
  profileCreated: true,
}

// Aplicações simuladas
const mockApplications = [
  {
    id: 1,
    jobTitle: "Desenvolvedor Frontend React",
    company: "Africell",
    appliedDate: "2024-01-15",
    status: "Em análise",
    cvUsed: "joao_silva_cv.pdf",
  },
  {
    id: 2,
    jobTitle: "Analista de Marketing Digital",
    company: "Africell",
    appliedDate: "2024-01-10",
    status: "Aplicação enviada",
    cvUsed: "joao_silva_cv.pdf",
  },
]

export default function Profile() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(mockUser)
  const [newCvFile, setNewCvFile] = useState(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserData({
        name: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
        phone: profile.phoneNumber,
        cvFileName: profile.resumeFileName || "curriculo.pdf",
      })

      // Atualizar aplicações se existirem
      if (profile.applications) {
        // Aqui você pode atualizar o estado das aplicações
        console.log("Aplicações encontradas:", profile.applications)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setNewCvFile(file)
    } else {
      alert("Por favor, selecione um arquivo PDF")
    }
  }

  const handleSave = () => {
    // Simular salvamento
    if (newCvFile) {
      setUserData({
        ...userData,
        cvFileName: newCvFile.name,
      })
      setNewCvFile(null)
    }
    setIsEditing(false)
    alert("Perfil atualizado com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#241E46] to-[#a01775] rounded-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t("profile.title")}</h1>
                <p className="text-blue-100">{t("profile.subtitle")}</p>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Informações do Perfil */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">{t("profile.personalInfo")}</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-[#a01775] hover:text-[#8a1464] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? t("profile.cancel") : t("profile.edit")}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("profile.fullName")}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userData.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("app.email")}</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userData.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("profile.phone")}</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="bg-[#a01775] text-white px-4 py-2 rounded-lg hover:bg-[#8a1464] transition-colors"
                    >
                      {t("profile.saveChanges")}
                    </button>
                  )}
                </div>
              </div>

              {/* Aplicações */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("profile.myApplications")}</h2>

                {mockApplications.length > 0 ? (
                  <div className="space-y-4">
                    {mockApplications.map((application) => (
                      <ApplicationStatusCard key={application.id} application={application} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t("profile.noApplications")}</p>
                    <button className="mt-4 text-[#a01775] hover:underline">{t("profile.exploreJobs")}</button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Currículo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("profile.myCv")}</h3>

                <div className="space-y-4">
                  {/* CV Atual */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-6 h-6 text-[#a01775]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{t("profile.currentCv")}</p>
                        <p className="text-xs text-gray-500">{userData.cvFileName}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-1 text-xs bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>{t("profile.view")}</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 text-xs bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors">
                        <Download className="w-3 h-3" />
                        <span>{t("profile.download")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Upload Novo CV */}
                  <div>
                    <label htmlFor="new-cv" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("profile.replaceCv")}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#a01775] transition-colors">
                      <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="new-cv" />
                      <label htmlFor="new-cv" className="cursor-pointer">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">{newCvFile ? newCvFile.name : t("profile.newCv")}</p>
                      </label>
                    </div>

                    {newCvFile && (
                      <button
                        onClick={handleSave}
                        className="w-full mt-2 bg-[#a01775] text-white py-2 px-4 rounded-lg hover:bg-[#8a1464] transition-colors text-sm"
                      >
                        {t("profile.saveNewCv")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
