"use client"

import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  pt: {
    // Navbar
    "nav.allJobs": "Todas as Vagas",
    "nav.jobsSaved": "Jobs Saved",
    "nav.myProfile": "Meu Perfil",
    "nav.login": "Entrar",
    "nav.logout": "Sair",

    // Home Page
    "home.title": "Encontre sua próxima oportunidade na",
    "home.subtitle": "Conectamos talentos excepcionais com oportunidades únicas em telecomunicações",
    "home.searchPlaceholder": "Pesquise por título, cargo ou palavra-chave",
    "home.allLocations": "Todas as localizações",
    "home.contractType": "Tipo de contrato",
    "home.fullTime": "Tempo Integral",
    "home.partTime": "Meio Período",
    "home.freelance": "Freelance",
    "home.internship": "Estágio",
    "home.search": "Buscar",
    "home.availableJobs": "Vagas Disponíveis",
    "home.mostRecent": "Mais recentes",
    "home.highestSalary": "Maior salário",
    "home.location": "Localização",

    // Job Card
    "job.viewDetails": "Ver Detalhes",
    "job.applyNow": "Aplicar Agora",

    // Job Details
    "job.backToJobs": "Voltar às vagas",
    "job.jobDescription": "Descrição da Vaga",
    "job.requirements": "Requisitos",
    "job.benefits": "Benefícios",
    "job.applyForJob": "Aplicar para esta vaga",
    "job.candidatesApplied": "candidatos aplicaram",
    "job.publishedDaysAgo": "Publicado há 3 dias",
    "job.shareJob": "Compartilhar vaga",

    // Application Form
    "app.backToJob": "Voltar à vaga",
    "app.applyFor": "Aplicar para:",
    "app.personalInfo": "Personal Information",
    "app.fieldsRequired": "Fields marked with * are required.",
    "app.firstName": "First name",
    "app.lastName": "Last name",
    "app.email": "Email",
    "app.confirmEmail": "Confirm your email",
    "app.city": "City",
    "app.phoneNumber": "Phone number",
    "app.experience": "Experience",
    "app.add": "Add",
    "app.noExperience": 'No experience added yet. Click "Add" to include your work experience.',
    "app.workExperience": "Work Experience",
    "app.jobTitle": "Job Title",
    "app.company": "Company",
    "app.startDate": "Start Date",
    "app.endDate": "End Date",
    "app.currentWork": "I currently work here",
    "app.description": "Description",
    "app.education": "Education",
    "app.noEducation": 'No education added yet. Click "Add" to include your educational background.',
    "app.degree": "Degree",
    "app.institution": "Institution",
    "app.currentStudy": "I currently study here",
    "app.profiles": "Your Profiles",
    "app.resume": "Resume",
    "app.chooseFile": "Choose a file or drop it here",
    "app.sizeLimit": "10MB size limit",
    "app.attachResume": "Please attach your resume to complete this application",
    "app.messageTeam": "Message to the Hiring Team",
    "app.messageDescription": "Let the company know about your interest working there",
    "app.privacyPolicy": "Privacy Policy",
    "app.next": "Next",
    "app.submitting": "Submitting...",

    // Login
    "login.title": "Entrar",
    "login.subtitle": "Digite seu email para receber o código de acesso",
    "login.sendCode": "Enviar código de acesso",
    "login.sendingCode": "Enviando código...",
    "login.verifyEmail": "Verificar Email",
    "login.codeSent": "Enviamos um código de 6 dígitos para",
    "login.verificationCode": "Código de verificação",
    "login.enterCode": "Digite o código de 6 dígitos",
    "login.verifying": "Verificando...",
    "login.enter": "Entrar",
    "login.didntReceive": "Não recebeu o código? Reenviar",
    "login.back": "Voltar",
    "login.terms": "Ao continuar, você concorda com nossos",
    "login.termsOfUse": "Termos de Uso",
    "login.and": "e",

    // Profile
    "profile.title": "Meu Perfil",
    "profile.subtitle": "Gerencie suas informações e aplicações",
    "profile.personalInfo": "Informações Pessoais",
    "profile.edit": "Editar",
    "profile.cancel": "Cancelar",
    "profile.fullName": "Nome Completo",
    "profile.phone": "Telefone",
    "profile.saveChanges": "Salvar Alterações",
    "profile.myApplications": "Minhas Aplicações",
    "profile.noApplications": "Você ainda não aplicou para nenhuma vaga",
    "profile.exploreJobs": "Explorar vagas disponíveis",
    "profile.myCv": "Meu Currículo",
    "profile.currentCv": "CV Atual",
    "profile.view": "Ver",
    "profile.download": "Baixar",
    "profile.replaceCv": "Substituir Currículo",
    "profile.newCv": "Novo CV (PDF)",
    "profile.saveNewCv": "Salvar Novo CV",

    // Jobs Saved
    "saved.title": "Jobs Saved",
    "saved.subtitle": "Suas vagas favoritas salvas para aplicar depois",
    "saved.searchPlaceholder": "Pesquisar nas vagas salvas...",
    "saved.clearAll": "Limpar todas",
    "saved.jobsSaved": "vagas salvas",
    "saved.jobSaved": "vaga salva",
    "saved.savedOn": "Salvo em",
    "saved.noJobsFound": "Nenhuma vaga encontrada",
    "saved.noJobsSaved": "Nenhuma vaga salva ainda",
    "saved.adjustSearch": "Tente ajustar sua pesquisa ou limpar os filtros",
    "saved.startSaving": "Comece a salvar vagas que te interessam para encontrá-las facilmente depois",

    // Common
    "common.loading": "Carregando...",
    "common.error": "Erro",
    "common.success": "Sucesso",
    "common.jobNotFound": "Vaga não encontrada",
    "common.back": "Voltar",
  },
  en: {
    // Navbar
    "nav.allJobs": "All Jobs",
    "nav.jobsSaved": "Jobs Saved",
    "nav.myProfile": "My Profile",
    "nav.login": "Login",
    "nav.logout": "Logout",

    // Home Page
    "home.title": "Find your next opportunity at",
    "home.subtitle": "We connect exceptional talents with unique opportunities in telecommunications",
    "home.searchPlaceholder": "Search by title, position or keyword",
    "home.allLocations": "All locations",
    "home.contractType": "Contract type",
    "home.fullTime": "Full Time",
    "home.partTime": "Part Time",
    "home.freelance": "Freelance",
    "home.internship": "Internship",
    "home.search": "Search",
    "home.availableJobs": "Available Jobs",
    "home.mostRecent": "Most recent",
    "home.highestSalary": "Highest salary",
    "home.location": "Location",

    // Job Card
    "job.viewDetails": "View Details",
    "job.applyNow": "Apply Now",

    // Job Details
    "job.backToJobs": "Back to jobs",
    "job.jobDescription": "Job Description",
    "job.requirements": "Requirements",
    "job.benefits": "Benefits",
    "job.applyForJob": "Apply for this job",
    "job.candidatesApplied": "candidates applied",
    "job.publishedDaysAgo": "Published 3 days ago",
    "job.shareJob": "Share job",

    // Application Form
    "app.backToJob": "Back to job",
    "app.applyFor": "Apply for:",
    "app.personalInfo": "Personal Information",
    "app.fieldsRequired": "Fields marked with * are required.",
    "app.firstName": "First name",
    "app.lastName": "Last name",
    "app.email": "Email",
    "app.confirmEmail": "Confirm your email",
    "app.city": "City",
    "app.phoneNumber": "Phone number",
    "app.experience": "Experience",
    "app.add": "Add",
    "app.noExperience": 'No experience added yet. Click "Add" to include your work experience.',
    "app.workExperience": "Work Experience",
    "app.jobTitle": "Job Title",
    "app.company": "Company",
    "app.startDate": "Start Date",
    "app.endDate": "End Date",
    "app.currentWork": "I currently work here",
    "app.description": "Description",
    "app.education": "Education",
    "app.noEducation": 'No education added yet. Click "Add" to include your educational background.',
    "app.degree": "Degree",
    "app.institution": "Institution",
    "app.currentStudy": "I currently study here",
    "app.profiles": "Your Profiles",
    "app.resume": "Resume",
    "app.chooseFile": "Choose a file or drop it here",
    "app.sizeLimit": "10MB size limit",
    "app.attachResume": "Please attach your resume to complete this application",
    "app.messageTeam": "Message to the Hiring Team",
    "app.messageDescription": "Let the company know about your interest working there",
    "app.privacyPolicy": "Privacy Policy",
    "app.next": "Next",
    "app.submitting": "Submitting...",

    // Login
    "login.title": "Login",
    "login.subtitle": "Enter your email to receive access code",
    "login.sendCode": "Send access code",
    "login.sendingCode": "Sending code...",
    "login.verifyEmail": "Verify Email",
    "login.codeSent": "We sent a 6-digit code to",
    "login.verificationCode": "Verification code",
    "login.enterCode": "Enter the 6-digit code",
    "login.verifying": "Verifying...",
    "login.enter": "Login",
    "login.didntReceive": "Didn't receive the code? Resend",
    "login.back": "Back",
    "login.terms": "By continuing, you agree to our",
    "login.termsOfUse": "Terms of Use",
    "login.and": "and",

    // Profile
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your information and applications",
    "profile.personalInfo": "Personal Information",
    "profile.edit": "Edit",
    "profile.cancel": "Cancel",
    "profile.fullName": "Full Name",
    "profile.phone": "Phone",
    "profile.saveChanges": "Save Changes",
    "profile.myApplications": "My Applications",
    "profile.noApplications": "You haven't applied to any jobs yet",
    "profile.exploreJobs": "Explore available jobs",
    "profile.myCv": "My Resume",
    "profile.currentCv": "Current CV",
    "profile.view": "View",
    "profile.download": "Download",
    "profile.replaceCv": "Replace Resume",
    "profile.newCv": "New CV (PDF)",
    "profile.saveNewCv": "Save New CV",

    // Jobs Saved
    "saved.title": "Jobs Saved",
    "saved.subtitle": "Your favorite jobs saved to apply later",
    "saved.searchPlaceholder": "Search in saved jobs...",
    "saved.clearAll": "Clear all",
    "saved.jobsSaved": "jobs saved",
    "saved.jobSaved": "job saved",
    "saved.savedOn": "Saved on",
    "saved.noJobsFound": "No jobs found",
    "saved.noJobsSaved": "No jobs saved yet",
    "saved.adjustSearch": "Try adjusting your search or clearing filters",
    "saved.startSaving": "Start saving jobs that interest you to find them easily later",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.jobNotFound": "Job not found",
    "common.back": "Back",
  },
}

const LanguageContext = createContext(undefined)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
