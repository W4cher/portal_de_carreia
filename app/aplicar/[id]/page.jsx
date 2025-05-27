"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  MapPin,
  Building,
  Linkedin,
  Facebook,
  Twitter,
  Globe,
  Hash,
} from "lucide-react"
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
  },
]

export default function JobApplication() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const jobId = Number.parseInt(params.id)
  const job = mockJobs.find((j) => j.id === jobId)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    city: "",
    phoneNumber: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    website: "",
    message: "",
  })

  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [resumeFile, setResumeFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setExperiences([...experiences, newExperience])
  }

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    setEducation([...education, newEducation])
  }

  const updateEducation = (id, field, value) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validações básicas
    if (formData.email !== formData.confirmEmail) {
      alert("Os emails não coincidem")
      return
    }

    if (!resumeFile) {
      alert("Por favor, faça upload do seu currículo")
      return
    }

    setIsSubmitting(true)

    // Simular envio da aplicação e registro automático
    setTimeout(() => {
      setIsSubmitting(false)

      // Simular registro automático do usuário
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          city: formData.city,
          phoneNumber: formData.phoneNumber,
          experiences,
          education,
          profiles: {
            linkedin: formData.linkedin,
            facebook: formData.facebook,
            twitter: formData.twitter,
            website: formData.website,
          },
          resumeFileName: resumeFile.name,
          applications: [
            {
              jobId: jobId,
              jobTitle: job?.title,
              company: job?.company,
              appliedDate: new Date().toISOString(),
              status: "Aplicação enviada",
              message: formData.message,
            },
          ],
        }),
      )

      alert(
        "Aplicação enviada com sucesso! Seu perfil foi criado automaticamente. Use seu email para fazer login e acompanhar o status.",
      )
      router.push("/login")
    }, 3000)
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-[#a01775] hover:text-[#8a1464] mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("app.backToJob")}
            </button>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  <Hash className="w-3 h-3 mr-1" />
                  <span>Ref: {job.referenceCode}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t("app.applyFor")} {job.title}
              </h1>
              <div className="flex items-center text-gray-600 space-x-4">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("app.personalInfo")}</h2>
              <p className="text-sm text-gray-600 mb-6">{t("app.fieldsRequired")}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.firstName")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                    placeholder="Please provide your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.lastName")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                    placeholder="Please provide your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.email")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                    placeholder="Please provide a valid email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.confirmEmail")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    required
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                    placeholder="Please provide a valid email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.city")}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="Please provide your place of residence"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("app.phoneNumber")}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-sm">
                      <option value="+244">🇦🇴 +244</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border-t border-r border-b border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="923 123 456"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{t("app.experience")}</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center space-x-2 text-[#a01775] hover:text-[#8a1464] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t("app.add")}</span>
                </button>
              </div>

              {experiences.length === 0 ? (
                <p className="text-gray-500 text-center py-8">{t("app.noExperience")}</p>
              ) : (
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-900">{t("app.workExperience")}</h3>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.jobTitle")}</label>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.company")}</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.startDate")}</label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.endDate")}</label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            disabled={exp.current}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent disabled:bg-gray-100"
                          />
                          <label className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-600">{t("app.currentWork")}</span>
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.description")}</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{t("app.education")}</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center space-x-2 text-[#a01775] hover:text-[#8a1464] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t("app.add")}</span>
                </button>
              </div>

              {education.length === 0 ? (
                <p className="text-gray-500 text-center py-8">{t("app.noEducation")}</p>
              ) : (
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-900">{t("app.education")}</h3>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.degree")}</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                            placeholder="e.g., Bachelor's in Computer Science"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.institution")}</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                            placeholder="University name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.startDate")}</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t("app.endDate")}</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            disabled={edu.current}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent disabled:bg-gray-100"
                          />
                          <label className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              checked={edu.current}
                              onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-600">{t("app.currentStudy")}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Your Profiles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("app.profiles")}</h2>
              <p className="text-sm text-gray-600 mb-6">{t("app.fieldsRequired")}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">X (fka Twitter)</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="https://x.com/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("app.resume")} <span className="text-red-500">*</span>
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#a01775] transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 mb-2">{resumeFile ? resumeFile.name : t("app.chooseFile")}</p>
                  <p className="text-sm text-gray-500">{t("app.sizeLimit")}</p>
                </label>
              </div>

              {!resumeFile && <p className="text-red-500 text-sm mt-2">{t("app.attachResume")}</p>}
            </div>

            {/* Message to Hiring Team */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("app.messageTeam")}</h2>
              <p className="text-sm text-gray-600 mb-4">{t("app.messageDescription")}</p>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                placeholder="Write your message here..."
              />
            </div>

            {/* Submit */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <button
                    type="button"
                    className="text-[#a01775] hover:underline text-sm"
                    onClick={() => alert("Privacy Policy")}
                  >
                    {t("app.privacyPolicy")}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#a01775] text-white px-8 py-3 rounded-lg hover:bg-[#8a1464] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("app.submitting") : t("app.next")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
