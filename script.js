// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Tabs functionality
const tabBtns = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab")

    // Remove active class from all tabs and contents
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabContents.forEach((c) => c.classList.remove("active"))

    // Add active class to clicked tab and corresponding content
    btn.classList.add("active")
    document.getElementById(target).classList.add("active")
  })
})

// Carousel functionality - CORRIGIDO
class Carousel {
  constructor(carouselId) {
    this.carousel = document.getElementById(`carousel-${carouselId}`)
    if (!this.carousel) {
      console.error(`Carousel ${carouselId} não encontrado`)
      return
    }
    
    this.items = this.carousel.querySelectorAll(".carousel-item")
    this.currentIndex = 0
    this.totalItems = this.items.length
    this.carouselId = carouselId

    this.init()
  }

  init() {
    // Set up navigation buttons - CORRIGIDO
    const prevBtn = document.querySelector(`button[data-carousel="${this.carouselId}"].prev`)
    const nextBtn = document.querySelector(`button[data-carousel="${this.carouselId}"].next`)

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prev())
    } else {
      console.warn(`Botão prev não encontrado para ${this.carouselId}`)
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.next())
    } else {
      console.warn(`Botão next não encontrado para ${this.carouselId}`)
    }

    // Auto-play carousel
    this.autoPlay()

    // Pause auto-play on hover
    this.carousel.addEventListener("mouseenter", () => this.pauseAutoPlay())
    this.carousel.addEventListener("mouseleave", () => this.autoPlay())
    
    // Inicializa posição
    this.updateCarousel()
  }

  updateCarousel() {
    const translateX = -this.currentIndex * 100 // Cada item ocupa 100% da largura
    this.carousel.style.transform = `translateX(${translateX}%)`
  }
  

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems
    this.updateCarousel()
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems
    this.updateCarousel()
  }

  autoPlay() {
    this.pauseAutoPlay()
    this.autoPlayInterval = setInterval(() => this.next(), 5000) // Reduzido para 5s
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }
}

// Initialize carousels - CORRIGIDO
document.addEventListener("DOMContentLoaded", () => {
  // Aguarda um pouco para garantir que o DOM está totalmente carregado
  setTimeout(() => {
    new Carousel("criancas")
    new Carousel("adultos") 
    new Carousel("familia")
  }, 100)
})


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Chat Widget Functionality
const chatBubble = document.getElementById("chatBubble")
const chatWidget = document.getElementById("chatWidget")
const chatClose = document.getElementById("chatClose")
const chatOptions = document.querySelectorAll(".chat-option")
const chatMessages = document.getElementById("chatMessages")

// Chat responses
const chatResponses = {
  horarios: {
    message:
      "🕒 Nossos horários de funcionamento:\n\n📅 Sábados e Domingos: a partir das 9h\n📅 Feriados: 9h às 19h\n\nEstamos sempre prontos para receber você e sua família!",
    options: ["precos", "localizacao", "associacao", "contato"],
  },
  precos: {
    message:
      "💰 Nossos preços:\n\n🎫 Entrada por Espaço: R$ 20,00\n\n📋 Planos de Associação:\n👫 Casal (2 pessoas): R$ 60,00/mês\n👨‍👩‍👧 Família (3 pessoas): R$ 75,00/mês\n👨‍👩‍👧‍👦 Família+ (5 pessoas): R$ 100,00/mês\n\n🔥 Oferta promocional por tempo limitado!",
    options: ["horarios", "atracoes", "associacao", "contato"],
  },
  localizacao: {
    message:
      "📍 Estamos localizados na:\n\nRua das Maravilhas, 386 - Novo Everest - Salgueiro(PE)\n\n🚗 Estacionamento gratuito\n\nVenha nos visitar!",
    options: ["horarios", "precos", "associacao", "contato"],
  },
  atracoes: {
    message:
      "🏊‍♀️ Nossas atrações incríveis:\n\n👶 Para Crianças: Piscina infantil, Tobogã kids, Área Kids\n\n🏄‍♂️ Para Adultos: Tobogã radical, Piscina adulto\n\n👨‍👩‍👧‍👦 Para Família: Pedalinhos, Piscina familiar, Restaurante do Mestrinho\n\nDiversão garantida para todas as idades!",
    options: ["precos", "eventos", "associacao", "contato"],
  },
  eventos: {
    message:
      "🎉 Locamos o Mestrinho Acqua Park para eventos especiais:\n\n🎂 Festas de aniversário\n🏢 Confraternizações empresariais\n🚌 Excursões\n💒 Casamentos e formaturas\n\nEspaços completos com toda infraestrutura necessária!",
    options: ["precos", "horarios", "associacao", "contato"],
  },
  associacao: {
    message:
      "🎯 Para se associar você precisa:\n\n📄 Documentos:\n• RG ou CNH\n• CPF ou Certidão de Nascimento\n• Comprovante de residência\n• 1 fotos recente\n\n💳 Formas de pagamento:\n• Cartão (Débito e Crédito)\n• PIX\n• Dinheiro\n\n✨ Benefícios exclusivos te aguardam!",
    options: ["precos", "beneficios", "contato"],
  },
  beneficios: {
    message:
      "🌟 Benefícios exclusivos dos associados:\n\n♾️ Acesso ilimitado ao parque\n🎯 Até 20% desconto no restaurante\n🅿️ Estacionamento gratuito\n⭐ Prioridade em eventos\n👥 Convidados com desconto (R$ 15)\n👑 Área VIP exclusiva\n🎁 Entrada grátis no aniversário\n📱 App exclusivo\n\nVale muito a pena ser associado!",
    options: ["precos", "associacao", "contato"],
  },
  contato: {
    message:
      "📞 Entre em contato conosco:\n\n📱 WhatsApp: (87) 99105-4533\n📧 Email: contato@mestrinhoacquapark.com.br\n\nNossa equipe está pronta para atender você! Clique no botão abaixo para falar diretamente no WhatsApp:",
    options: [],
    showWhatsApp: true,
  },
}

// Open chat
chatBubble.addEventListener("click", () => {
  chatWidget.style.display = "flex"
  chatBubble.style.display = "none"

  // Remove notification
  const notification = chatBubble.querySelector(".chat-notification")
  if (notification) {
    notification.style.display = "none"
  }
})

// Close chat
chatClose.addEventListener("click", () => {
  chatWidget.style.display = "none"
  chatBubble.style.display = "flex"
})

// Handle chat options
chatOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const optionKey = option.getAttribute("data-option")
    const response = chatResponses[optionKey]

    if (response) {
      // Add user message
      addMessage(option.textContent, "user")

      // Esconde as opções iniciais
      document.getElementById("chatOptions").style.display = "none"

      // Add bot response
      setTimeout(() => {
        addMessage(response.message, "bot")

        if (response.showWhatsApp) {
          addWhatsAppButton()
        }

        // Update options de forma contínua
        addContinuousOptions(response.options)
      }, 1000)
    }
  })
})

function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`

  const messageText = document.createElement("p")
  messageText.textContent = text
  messageText.style.whiteSpace = "pre-line"

  messageDiv.appendChild(messageText)
  chatMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function addWhatsAppButton() {
  const buttonDiv = document.createElement("div")
  buttonDiv.className = "message bot-message"
  buttonDiv.innerHTML = `
        <a href="https://wa.me/5587991054533" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 10px;">
            <i class="fab fa-whatsapp"></i> Falar no WhatsApp
        </a>
    `
  chatMessages.appendChild(buttonDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function updateChatOptions(options) {
  const chatOptionsContainer = document.getElementById("chatOptions")
  chatOptionsContainer.innerHTML = ""

  if (options.length > 0) {
    options.forEach((optionKey) => {
      const button = document.createElement("button")
      button.className = "chat-option"
      button.setAttribute("data-option", optionKey)

      const optionTexts = {
        horarios: "Horários de funcionamento",
        precos: "Preços e planos",
        localizacao: "Localização",
        atracoes: "Nossas atrações",
        eventos: "Eventos e festas",
        associacao: "Como se associar",
        beneficios: "Benefícios de associado",
        contato: "Falar com atendente",
      }

      button.textContent = optionTexts[optionKey]
      button.addEventListener("click", () => {
        const response = chatResponses[optionKey]
        if (response) {
          addMessage(button.textContent, "user")

          // Remove as opções atuais temporariamente
          chatOptionsContainer.style.display = "none"

          setTimeout(() => {
            addMessage(response.message, "bot")
            if (response.showWhatsApp) {
              addWhatsAppButton()
            }

            // Adiciona as novas opções sem limpar o histórico
            addContinuousOptions(response.options)
          }, 1000)
        }
      })

      chatOptionsContainer.appendChild(button)
    })
  }

  // Always add option to restart
  const restartButton = document.createElement("button")
  restartButton.className = "chat-option"
  restartButton.style.backgroundColor = "#f0f0f0"
  restartButton.style.borderColor = "#ccc"
  restartButton.textContent = "🔄 Voltar ao menu principal"
  restartButton.addEventListener("click", () => {
    // Limpa apenas as mensagens, mantendo a primeira
    chatMessages.innerHTML = `
            <div class="message bot-message">
                <p>Olá! 👋 Bem-vindo ao Mestrinho Acqua Park! Como posso te ajudar?</p>
            </div>
        `

    chatOptionsContainer.innerHTML = `
            <button class="chat-option" data-option="horarios">Horários de funcionamento</button>
            <button class="chat-option" data-option="precos">Preços e planos</button>
            <button class="chat-option" data-option="localizacao">Localização</button>
            <button class="chat-option" data-option="atracoes">Nossas atrações</button>
            <button class="chat-option" data-option="eventos">Eventos e festas</button>
            <button class="chat-option" data-option="associacao">Como se associar</button>
            <button class="chat-option" data-option="beneficios">Benefícios de associado</button>
            <button class="chat-option" data-option="contato">Falar com atendente</button>
        `

    chatOptionsContainer.style.display = "grid"

    // Re-attach event listeners
    document.querySelectorAll(".chat-option").forEach((option) => {
      option.addEventListener("click", () => {
        const optionKey = option.getAttribute("data-option")
        const response = chatResponses[optionKey]

        if (response) {
          addMessage(option.textContent, "user")
          chatOptionsContainer.style.display = "none"
          setTimeout(() => {
            addMessage(response.message, "bot")
            if (response.showWhatsApp) {
              addWhatsAppButton()
            }
            addContinuousOptions(response.options)
          }, 1000)
        }
      })
    })
  })

  chatOptionsContainer.appendChild(restartButton)
}

// Nova função para adicionar opções de forma contínua
function addContinuousOptions(options) {
  const chatOptionsContainer = document.getElementById("chatOptions")

  // Cria um novo container de opções que será adicionado às mensagens
  const optionsMessage = document.createElement("div")
  optionsMessage.className = "message bot-message options-message"

  const optionsContainer = document.createElement("div")
  optionsContainer.className = "inline-chat-options"

  if (options.length > 0) {
    const helpText = document.createElement("p")
    helpText.textContent = "Como posso ajudar mais?"
    helpText.style.marginBottom = "10px"
    helpText.style.fontSize = "0.9rem"
    optionsContainer.appendChild(helpText)

    options.forEach((optionKey) => {
      const button = document.createElement("button")
      button.className = "inline-chat-option"
      button.setAttribute("data-option", optionKey)

      const optionTexts = {
        horarios: "Horários de funcionamento",
        precos: "Preços e planos",
        localizacao: "Localização",
        atracoes: "Nossas atrações",
        eventos: "Eventos e festas",
        associacao: "Como se associar",
        beneficios: "Benefícios de associado",
        contato: "Falar com atendente",
      }

      button.textContent = optionTexts[optionKey]
      button.addEventListener("click", () => {
        const response = chatResponses[optionKey]
        if (response) {
          addMessage(button.textContent, "user")

          setTimeout(() => {
            addMessage(response.message, "bot")
            if (response.showWhatsApp) {
              addWhatsAppButton()
            }
            addContinuousOptions(response.options)
          }, 1000)
        }
      })

      optionsContainer.appendChild(button)
    })
  }

  // Sempre adiciona opção de reiniciar
  const restartButton = document.createElement("button")
  restartButton.className = "inline-chat-option restart-option"
  restartButton.textContent = "🔄 Menu principal"
  restartButton.addEventListener("click", () => {
    chatMessages.innerHTML = `
            <div class="message bot-message">
                <p>Olá! 👋 Bem-vindo ao Mestrinho Acqua Park! Como posso te ajudar?</p>
            </div>
        `

    chatOptionsContainer.innerHTML = `
            <button class="chat-option" data-option="horarios">Horários de funcionamento</button>
            <button class="chat-option" data-option="precos">Preços e planos</button>
            <button class="chat-option" data-option="localizacao">Localização</button>
            <button class="chat-option" data-option="atracoes">Nossas atrações</button>
            <button class="chat-option" data-option="eventos">Eventos e festas</button>
            <button class="chat-option" data-option="associacao">Como se associar</button>
            <button class="chat-option" data-option="beneficios">Benefícios de associado</button>
            <button class="chat-option" data-option="contato">Falar com atendente</button>
        `

    chatOptionsContainer.style.display = "grid"

    // Re-attach event listeners para o menu principal
    document.querySelectorAll(".chat-option").forEach((option) => {
      option.addEventListener("click", () => {
        const optionKey = option.getAttribute("data-option")
        const response = chatResponses[optionKey]

        if (response) {
          addMessage(option.textContent, "user")
          chatOptionsContainer.style.display = "none"
          setTimeout(() => {
            addMessage(response.message, "bot")
            if (response.showWhatsApp) {
              addWhatsAppButton()
            }
            addContinuousOptions(response.options)
          }, 1000)
        }
      })
    })
  })

  optionsContainer.appendChild(restartButton)
  optionsMessage.appendChild(optionsContainer)
  chatMessages.appendChild(optionsMessage)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight

  // Esconde o container de opções fixo
  chatOptionsContainer.style.display = "none"
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .plan-card, .carousel-item")
  animatedElements.forEach((el) => observer.observe(el))
})

// Conversion tracking for paid traffic
function trackConversion(planType) {
  // Google Analytics Event
  const gtag = window.gtag // Declare gtag variable
  if (gtag) {
    gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
      value: planType === "plano_casal" ? 60 : planType === "plano_familia" ? 75 : 100,
      currency: "BRL",
      transaction_id: Date.now().toString(),
    })
  }

  // Facebook Pixel Event
  const fbq = window.fbq // Declare fbq variable
  if (fbq) {
    fbq("track", "Lead", {
      content_name: planType,
      content_category: "membership_plan",
      value: planType === "plano_casal" ? 60 : planType === "plano_familia" ? 75 : 100,
      currency: "BRL",
    })
  }

  // Redirect to WhatsApp or contact form
  const message = encodeURIComponent(
    `Olá! Tenho interesse no ${planType.replace("_", " ")} do Mestrinho Acqua Park. Gostaria de mais informações!`,
  )
  window.open(`https://wa.me/5587991054533?text=${message}`, "_blank")
}

// Form validation and lead capture (if you add forms later)
function validateForm(formData) {
  const errors = []

  if (!formData.name || formData.name.length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres")
  }

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push("Email inválido")
  }

  if (!formData.phone || formData.phone.length < 10) {
    errors.push("Telefone inválido")
  }

  return errors
}

// Performance optimization
document.addEventListener("DOMContentLoaded", () => {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Preload critical resources
  const criticalImages = ["/hero-bg.jpg", "/logo.png"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)

  // Send error to analytics (optional)
  const gtag = window.gtag // Declare gtag variable
  if (gtag) {
    gtag("event", "exception", {
      description: e.error.toString(),
      fatal: false,
    })
  }
})

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
