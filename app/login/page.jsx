"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Mail, Shield, ArrowLeft, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Login() {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Simular envio de código
  const sendVerificationCode = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular delay de envio
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep("verification")
      alert(`Código de verificação enviado para ${email}`)
    }, 2000)
  }

  // Verificar código e fazer login
  const verifyCodeAndLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular verificação (código correto seria "123456")
    setTimeout(() => {
      setIsLoading(false)
      if (verificationCode === "123456") {
        // Verificar se o usuário já tem um perfil salvo
        const savedProfile = localStorage.getItem("userProfile")
        const savedEmail = localStorage.getItem("userEmail")

        if (savedProfile && savedEmail === email) {
          alert("Login realizado com sucesso! Redirecionando para seu perfil...")
          router.push("/perfil")
        } else {
          alert("Login realizado com sucesso!")
          router.push("/")
        }
      } else {
        alert("Código inválido. Tente: 123456")
      }
    }, 1500)
  }

  const resendCode = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert(`Novo código enviado para ${email}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "email" ? "bg-[#a01775] text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {currentStep === "verification" ? <CheckCircle className="w-4 h-4" /> : "1"}
                </div>
                <div className={`w-12 h-0.5 ${currentStep === "verification" ? "bg-[#a01775]" : "bg-gray-200"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "verification" ? "bg-[#a01775] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {/* Step 1: Email */}
            {currentStep === "email" && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("login.title")}</h1>
                  <p className="text-gray-600">{t("login.subtitle")}</p>
                </div>

                <form onSubmit={sendVerificationCode} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("app.email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent"
                        placeholder="seu@email.com"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#a01775] text-white py-3 px-4 rounded-lg hover:bg-[#8a1464] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t("login.sendingCode") : t("login.sendCode")}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Verification */}
            {currentStep === "verification" && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#a01775] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("login.verifyEmail")}</h1>
                  <p className="text-gray-600">
                    {t("login.codeSent")}
                    <br />
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>
                </div>

                <form onSubmit={verifyCodeAndLogin} className="space-y-6">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("login.verificationCode")}
                    </label>
                    <input
                      type="text"
                      id="code"
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full py-3 px-4 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01775] focus:border-transparent tracking-widest"
                      placeholder="000000"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">{t("login.enterCode")}</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || verificationCode.length !== 6}
                    className="w-full bg-[#a01775] text-white py-3 px-4 rounded-lg hover:bg-[#8a1464] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t("login.verifying") : t("login.enter")}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={resendCode}
                      disabled={isLoading}
                      className="text-sm text-[#a01775] hover:underline disabled:opacity-50"
                    >
                      {t("login.didntReceive")}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("email")}
                    className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("login.back")}
                  </button>
                </form>
              </>
            )}

            {/* Terms */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                {t("login.terms")} <button className="text-[#a01775] hover:underline">{t("login.termsOfUse")}</button>{" "}
                {t("login.and")} <button className="text-[#a01775] hover:underline">{t("app.privacyPolicy")}</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
