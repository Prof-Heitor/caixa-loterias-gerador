import { LOTTERY_CONFIGS, generateGame, getGameStats } from "./lottery.js";

// Estado global da aplicação
const state = {
  currentStep: 1,
  selectedLottery: null,
  numDezenas: 6,
  numCartoes: 1,
  generatedGames: []
};

// Referências de Elementos do DOM
const elements = {
  step1: document.getElementById("step-1"),
  step2: document.getElementById("step-2"),
  step3: document.getElementById("step-3"),
  
  stepIndicator1: document.getElementById("stepIndicator-1"),
  stepIndicator2: document.getElementById("stepIndicator-2"),
  stepIndicator3: document.getElementById("stepIndicator-3"),
  connector1: document.getElementById("connector-1"),
  connector2: document.getElementById("connector-2"),
  
  lotteryGrid: document.getElementById("lotteryGrid"),
  selectedLotteryBadge: document.getElementById("selectedLotteryBadge"),
  resultLotteryBadge: document.getElementById("resultLotteryBadge"),
  
  // Controles Step 2
  numDezenasInput: document.getElementById("numDezenas"),
  numCartoesInput: document.getElementById("numCartoes"),
  btnDecDezenas: document.getElementById("btnDecDezenas"),
  btnIncDezenas: document.getElementById("btnIncDezenas"),
  btnDecCartoes: document.getElementById("btnDecCartoes"),
  btnIncCartoes: document.getElementById("btnIncCartoes"),
  dezenasRangeInfo: document.getElementById("dezenasRangeInfo"),
  
  // Botões de Navegação
  btnBackToStep1: document.getElementById("btnBackToStep1"),
  btnBackToStep2: document.getElementById("btnBackToStep2"),
  btnGenerateGames: document.getElementById("btnGenerateGames"),
  btnStartOver: document.getElementById("btnStartOver"),
  btnCopyAll: document.getElementById("btnCopyAll"),
  btnRegenerate: document.getElementById("btnRegenerate"),
  
  // Resultados Step 3
  gamesContainer: document.getElementById("gamesContainer"),

  // Tema e Modal
  themeToggle: document.getElementById("themeToggle"),
  responsibleGamingModal: document.getElementById("responsibleGamingModal"),
  btnCloseModal: document.getElementById("btnCloseModal")
};

// Inicialização da Página
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  showResponsibleGamingModal();
  renderLotteryGrid();
  setupEventListeners();
  updateWizardProgress();
});

/**
 * Renderiza o grid de opções de loterias (Etapa 1)
 */
function renderLotteryGrid() {
  elements.lotteryGrid.innerHTML = "";
  
  Object.entries(LOTTERY_CONFIGS).forEach(([key, config]) => {
    const card = document.createElement("div");
    card.classList.add("lottery-card");
    card.style.setProperty("--lottery-theme", config.color);
    // Converte cor hexa em RGB simples para sombras dinâmicas no hover
    const hex = config.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    card.style.setProperty("--lottery-theme-rgb", `${r}, ${g}, ${b}`);

    // Abreviação para o ícone (ex: MS, LF, QN...)
    const abbreviation = config.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

    card.innerHTML = `
      <div class="lottery-card-icon" style="color: ${config.textColor}">
        ${abbreviation}
      </div>
      <div class="lottery-card-title">${config.name}</div>
      <div class="lottery-card-desc">${config.rangeMin} a ${config.rangeMax}</div>
    `;

    card.addEventListener("click", () => selectLottery(key));
    elements.lotteryGrid.appendChild(card);
  });
}

/**
 * Registra todos os manipuladores de eventos
 */
function setupEventListeners() {
  // Voltar da Etapa 2 para 1
  elements.btnBackToStep1.addEventListener("click", () => {
    goToStep(1);
  });

  // Voltar da Etapa 3 para 2
  elements.btnBackToStep2.addEventListener("click", () => {
    goToStep(2);
  });

  // Começar de novo (Etapa 3 para 1)
  elements.btnStartOver.addEventListener("click", () => {
    goToStep(1);
  });

  // Ajustes de Dezenas (Step 2)
  elements.btnDecDezenas.addEventListener("click", () => {
    adjustDezenas(-1);
  });
  elements.btnIncDezenas.addEventListener("click", () => {
    adjustDezenas(1);
  });

  // Ajustes de Cartões (Step 2)
  elements.btnDecCartoes.addEventListener("click", () => {
    adjustCartoes(-1);
  });
  elements.btnIncCartoes.addEventListener("click", () => {
    adjustCartoes(1);
  });

  // Gerar Jogos
  elements.btnGenerateGames.addEventListener("click", () => {
    generateAndShowGames();
  });

  // Gerar Novamente (Step 3)
  elements.btnRegenerate.addEventListener("click", () => {
    generateAndShowGames();
  });

  // Copiar Todos os Jogos
  elements.btnCopyAll.addEventListener("click", () => {
    copyAllToClipboard();
  });

  // Alternar Tema
  elements.themeToggle.addEventListener("click", () => {
    toggleTheme();
  });

  // Fechar Modal de Jogo Responsável
  elements.btnCloseModal.addEventListener("click", () => {
    elements.responsibleGamingModal.classList.remove("active");
    sessionStorage.setItem("gamingAlertAccepted", "true");
  });
}

/**
 * Navega para uma etapa específica com efeitos visuais
 * @param {number} step 
 */
function goToStep(step) {
  state.currentStep = step;
  
  // Gerencia classe active nos painéis do wizard
  const panes = [elements.step1, elements.step2, elements.step3];
  panes.forEach((pane, idx) => {
    if (idx + 1 === step) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  updateWizardProgress();
}

/**
 * Atualiza o indicador visual das etapas do wizard
 */
function updateWizardProgress() {
  const step = state.currentStep;

  // Atualiza indicadores numéricos
  [elements.stepIndicator1, elements.stepIndicator2, elements.stepIndicator3].forEach((indicator, idx) => {
    const indicatorStep = idx + 1;
    indicator.classList.remove("active", "completed");
    
    if (indicatorStep === step) {
      indicator.classList.add("active");
    } else if (indicatorStep < step) {
      indicator.classList.add("completed");
    }
  });

  // Atualiza os conectores lineares
  if (step > 1) {
    elements.connector1.classList.add("completed");
  } else {
    elements.connector1.classList.remove("completed");
  }

  if (step > 2) {
    elements.connector2.classList.add("completed");
  } else {
    elements.connector2.classList.remove("completed");
  }
}

/**
 * Ação de selecionar uma loteria (vai para a etapa 2)
 * @param {string} key 
 */
function selectLottery(key) {
  state.selectedLottery = key;
  const config = LOTTERY_CONFIGS[key];
  
  // Atualiza crachás de cabeçalho com o tema da loteria
  elements.selectedLotteryBadge.textContent = config.name;
  elements.selectedLotteryBadge.style.backgroundColor = config.color;
  elements.selectedLotteryBadge.style.color = config.textColor;

  elements.resultLotteryBadge.textContent = config.name;
  elements.resultLotteryBadge.style.backgroundColor = config.color;
  elements.resultLotteryBadge.style.color = config.textColor;

  // Reseta dezenas para o mínimo permitido
  state.numDezenas = config.minNumbers;
  elements.numDezenasInput.value = state.numDezenas;

  // Atualiza texto explicativo
  if (config.minNumbers === config.maxNumbers) {
    elements.dezenasRangeInfo.textContent = `Fixo de ${config.minNumbers} dezenas`;
    elements.btnDecDezenas.disabled = true;
    elements.btnIncDezenas.disabled = true;
  } else {
    elements.dezenasRangeInfo.textContent = `Permitido de ${config.minNumbers} a ${config.maxNumbers} dezenas`;
    elements.btnDecDezenas.disabled = false;
    elements.btnIncDezenas.disabled = false;
  }

  // Reseta quantidade de cartões
  state.numCartoes = 1;
  elements.numCartoesInput.value = 1;

  goToStep(2);
}

/**
 * Incrementa ou decrementa a quantidade de dezenas
 * @param {number} delta 
 */
function adjustDezenas(delta) {
  const config = LOTTERY_CONFIGS[state.selectedLottery];
  if (!config) return;

  const newValue = state.numDezenas + delta;
  if (newValue >= config.minNumbers && newValue <= config.maxNumbers) {
    state.numDezenas = newValue;
    elements.numDezenasInput.value = newValue;
  }
}

/**
 * Incrementa ou decrementa a quantidade de cartões a gerar
 * @param {number} delta 
 */
function adjustCartoes(delta) {
  const newValue = state.numCartoes + delta;
  if (newValue >= 1 && newValue <= 10) {
    state.numCartoes = newValue;
    elements.numCartoesInput.value = newValue;
  }
}

/**
 * Gera os jogos da loteria selecionada e exibe na etapa 3
 */
function generateAndShowGames() {
  const config = LOTTERY_CONFIGS[state.selectedLottery];
  if (!config) return;

  state.generatedGames = [];
  for (let i = 0; i < state.numCartoes; i++) {
    const game = generateGame(state.selectedLottery, state.numDezenas);
    state.generatedGames.push(game);
  }

  // Renderiza no HTML
  renderResults();
  goToStep(3);
}

/**
 * Renderiza os cartões de jogos gerados na Etapa 3
 */
function renderResults() {
  const config = LOTTERY_CONFIGS[state.selectedLottery];
  elements.gamesContainer.innerHTML = "";

  state.generatedGames.forEach((game, index) => {
    const stats = getGameStats(game.numbers);
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.style.setProperty("--lottery-theme", config.color);
    card.style.setProperty("--lottery-text", config.textColor);

    // Estrutura padrão de número de jogo
    let contentHtml = `
      <div class="game-card-num-header">
        <span class="card-index">Jogo #${index + 1}</span>
        <button class="btn-back" style="padding: 4px 8px; font-size:0.75rem;" onclick="navigator.clipboard.writeText('${formatSingleGameText(game)}')">
          <i class="fa-solid fa-copy"></i> Copiar
        </button>
      </div>
    `;

    // Renderização dos números das dezenas (Bolas)
    if (config.isSuperSete) {
      // Super Sete renderiza em colunas estruturadas
      contentHtml += `<div class="super-sete-grid">`;
      game.numbers.forEach((num, colIdx) => {
        // Staggered animation delay
        const delay = colIdx * 0.08;
        contentHtml += `
          <div class="super-sete-col">
            <span class="super-sete-col-header">Col ${colIdx + 1}</span>
            <div class="ball" style="animation-delay: ${delay}s">${num}</div>
          </div>
        `;
      });
      contentHtml += `</div>`;
    } else {
      // Sorteio clássico em grid de bolas
      contentHtml += `<div class="balls-grid">`;
      game.numbers.forEach((num, numIdx) => {
        // Pad zeros para números menores que 10, exceto Lotomania onde 0 a 99 já é comum, 
        // mas é interessante mostrar ex: "03", "50", "00" para Lotomania
        let displayNum = num.toString().padStart(2, "0");
        if (state.selectedLottery === "lotomania" && num === 0) {
          displayNum = "00";
        }
        const delay = numIdx * 0.04;
        contentHtml += `<div class="ball" style="animation-delay: ${delay}s">${displayNum}</div>`;
      });
      contentHtml += `</div>`;
    }

    // Exibição da área especial se houver (Trevos, Time, Mês)
    if (config.hasSpecial && game.special) {
      contentHtml += `<div class="special-result-area">`;
      contentHtml += `<span class="special-title">${config.specialLabel}:</span>`;
      
      if (Array.isArray(game.special)) {
        // ex: Trevos da +Milionária
        contentHtml += `<div class="special-trevos">`;
        game.special.forEach(trevo => {
          contentHtml += `<div class="special-trevo-ball">${trevo}</div>`;
        });
        contentHtml += `</div>`;
      } else {
        // ex: Dia de Sorte (mês) ou Timemania (time)
        const badgeClass = state.selectedLottery === "timemania" ? "special-badge team" : "special-badge";
        contentHtml += `<span class="${badgeClass}">${game.special}</span>`;
      }
      contentHtml += `</div>`;
    }

    // Adiciona as estatísticas do jogo
    // (Super Sete ou Lotomania não costumam usar soma de forma convencional, mas deixaremos de forma genérica)
    if (!config.isSuperSete) {
      contentHtml += `
        <div class="game-stats">
          <div class="stat-item"><i class="fa-solid fa-calculator"></i> Soma: <span>${stats.sum}</span></div>
          <div class="stat-item"><i class="fa-solid fa-arrow-up-9-1"></i> Pares: <span>${stats.even}</span></div>
          <div class="stat-item"><i class="fa-solid fa-arrow-down-1-9"></i> Ímpares: <span>${stats.odd}</span></div>
        </div>
      `;
    }

    card.innerHTML = contentHtml;
    elements.gamesContainer.appendChild(card);
  });
}

/**
 * Formata um único jogo em formato texto
 * @param {object} game 
 * @returns {string}
 */
function formatSingleGameText(game) {
  const config = LOTTERY_CONFIGS[state.selectedLottery];
  let text = game.numbers.map(n => n.toString().padStart(2, "0")).join(" ");
  
  if (config.hasSpecial && game.special) {
    if (Array.isArray(game.special)) {
      text += ` + Trevos: ${game.special.join(" e ")}`;
    } else {
      text += ` + ${config.specialLabel}: ${game.special}`;
    }
  }
  return text;
}

/**
 * Copia todos os jogos gerados para a área de transferência do usuário
 */
function copyAllToClipboard() {
  const config = LOTTERY_CONFIGS[state.selectedLottery];
  let text = `🍀 Meus jogos para a ${config.name} 🍀\n\n`;
  
  state.generatedGames.forEach((game, idx) => {
    text += `Jogo #${idx + 1}: ${formatSingleGameText(game)}\n`;
  });
  
  text += "\nGerado no LotoGênio! Boa Sorte! 🤞";
  
  navigator.clipboard.writeText(text).then(() => {
    // Feedback rápido de cópia
    const originalText = elements.btnCopyAll.innerHTML;
    elements.btnCopyAll.innerHTML = `<i class="fa-solid fa-check"></i> Copiado!`;
    elements.btnCopyAll.disabled = true;
    setTimeout(() => {
      elements.btnCopyAll.innerHTML = originalText;
      elements.btnCopyAll.disabled = false;
    }, 2000);
  }).catch(err => {
    console.error("Erro ao copiar", err);
  });
}

/**
 * Inicializa o tema (escuro ou claro) com base nas preferências salvas ou do sistema
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
    document.body.classList.add("light-theme");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }
}

/**
 * Alterna entre modo claro e escuro
 */
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeIcon(isLight);
}

/**
 * Atualiza o ícone do botão de tema
 * @param {boolean} isLight 
 */
function updateThemeIcon(isLight) {
  const icon = elements.themeToggle.querySelector("i");
  if (isLight) {
    icon.className = "fa-solid fa-moon";
  } else {
    icon.className = "fa-solid fa-sun";
  }
}

/**
 * Exibe o aviso sobre vício em jogos se ainda não tiver sido aceito na sessão
 */
function showResponsibleGamingModal() {
  elements.responsibleGamingModal.classList.add("active");
}

