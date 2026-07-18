/**
 * Configurações oficiais de cada modalidade de loteria da Caixa
 */
export const LOTTERY_CONFIGS = {
  megasena: {
    name: "Mega-Sena",
    color: "#209869",
    textColor: "#ffffff",
    minNumbers: 6,
    maxNumbers: 20,
    rangeMin: 1,
    rangeMax: 60,
    hasSpecial: false,
  },
  lotofacil: {
    name: "Lotofácil",
    color: "#930089",
    textColor: "#ffffff",
    minNumbers: 15,
    maxNumbers: 20,
    rangeMin: 1,
    rangeMax: 25,
    hasSpecial: false,
  },
  quina: {
    name: "Quina",
    color: "#260085",
    textColor: "#ffffff",
    minNumbers: 5,
    maxNumbers: 15,
    rangeMin: 1,
    rangeMax: 80,
    hasSpecial: false,
  },
  lotomania: {
    name: "Lotomania",
    color: "#f7941d",
    textColor: "#ffffff",
    minNumbers: 50,
    maxNumbers: 50,
    rangeMin: 0,
    rangeMax: 99,
    hasSpecial: false,
  },
  duplasena: {
    name: "Dupla Sena",
    color: "#a61324",
    textColor: "#ffffff",
    minNumbers: 6,
    maxNumbers: 15,
    rangeMin: 1,
    rangeMax: 50,
    hasSpecial: false,
  },
  diadesorte: {
    name: "Dia de Sorte",
    color: "#cb852b",
    textColor: "#ffffff",
    minNumbers: 7,
    maxNumbers: 15,
    rangeMin: 1,
    rangeMax: 31,
    hasSpecial: true,
    specialLabel: "Mês de Sorte",
    generateSpecial: () => {
      const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
      return meses[Math.floor(Math.random() * meses.length)];
    }
  },
  supersete: {
    name: "Super Sete",
    color: "#a4c11b",
    textColor: "#1c2800",
    minNumbers: 7, // 7 colunas, 1 número por coluna (pode ter até 21 números, mas a aposta simples/base é 1 por coluna)
    maxNumbers: 7,
    rangeMin: 0,
    rangeMax: 9,
    hasSpecial: false,
    isSuperSete: true, // Lógica especial de colunas
  },
  maismilionaria: {
    name: "+Milionária",
    color: "#184585",
    textColor: "#ffffff",
    minNumbers: 6,
    maxNumbers: 6, // aposta padrão: 6 números + 2 trevos
    rangeMin: 1,
    rangeMax: 50,
    hasSpecial: true,
    specialLabel: "Trevos",
    generateSpecial: () => {
      // 2 trevos de 1 a 6
      const trevos = new Set();
      while (trevos.size < 2) {
        trevos.add(Math.floor(Math.random() * 6) + 1);
      }
      return Array.from(trevos).sort((a, b) => a - b);
    }
  },
  timemania: {
    name: "Timemania",
    color: "#00a859", // Verde e amarelo
    secondaryColor: "#fff200",
    textColor: "#ffffff",
    minNumbers: 10,
    maxNumbers: 10, // Aposta única de 10 números
    rangeMin: 1,
    rangeMax: 80,
    hasSpecial: true,
    specialLabel: "Time do Coração",
    generateSpecial: () => {
      const times = [
        "ABC/RN", "América/MG", "América/RJ", "América/RN", "Atlético/GO",
        "Atlético/MG", "Atlético/PR", "Avaí/SC", "Bahia/BA", "Bangu/RJ",
        "Barueri/SP", "Botafogo/PB", "Botafogo/RJ", "Botafogo/SP", "Bragantino/SP",
        "Brasiliense/DF", "Ceará/CE", "Corinthians/SP", "Coritiba/PR", "CRB/AL",
        "Criciúma/SC", "Cruzeiro/MG", "CSA/AL", "Figueirense/SC", "Flamengo/RJ",
        "Fluminense/RJ", "Fortaleza/CE", "Gama/DF", "Goiás/GO", "Grêmio/RS",
        "Guarani/SP", "Inter de Limeira/SP", "Internacional/RS", "Ipatinga/MG", "Ituano/SP",
        "Joinville/SC", "Juventude/RS", "Juventus/SP", "Londrina/PR", "Marília/SP",
        "Mixto/MT", "Moto Club/MA", "Nacional/AM", "Náutico/PE", "Olaria/RJ",
        "Operário/MS", "Palmeiras/SP", "Paraná/PR", "Paulista/SP", "Payandu/PA",
        "Ponte Preta/SP", "Portuguesa/SP", "Remo/PA", "River/PI", "Roraima/RR",
        "Sampaio Corrêa/MA", "Santa Cruz/PE", "Santo André/SP", "Santos/SP", "São Caetano/SP",
        "São Paulo/SP", "Sergipe/SE", "Sport/PE", "Treze/PB", "Tuna Luso/PA",
        "Uberlândia/MG", "Vasco da Gama/RJ", "Vila Nova/GO", "Villa Nova/MG", "Vitória/BA",
        "Volta Redonda/RJ", "XV de Piracicaba/SP", "Ypiranga/AP", "Londrina/PR", "Juventude/RS",
        "Desportiva/ES", "Operário/PR", "Caxias/RS", "Ji-Paraná/RO", "Palmas/TO"
      ];
      return times[Math.floor(Math.random() * times.length)];
    }
  }
};

/**
 * Gera um jogo com base nas configurações da loteria
 * @param {string} lotteryType Tipo da loteria (ex: 'megasena')
 * @param {number} totalNumbers Quantidade de números a sortear
 * @returns {object} Jogo gerado contendo numbers (array) e special (opcional)
 */
export function generateGame(lotteryType, totalNumbers) {
  const config = LOTTERY_CONFIGS[lotteryType];
  if (!config) {
    throw new Error(`Loteria não suportada: ${lotteryType}`);
  }

  // Validar quantidade de números
  if (totalNumbers < config.minNumbers || totalNumbers > config.maxNumbers) {
    throw new Error(`Quantidade de números inválida para ${config.name}. Deve ser entre ${config.minNumbers} e ${config.maxNumbers}.`);
  }

  let numbers = [];

  if (config.isSuperSete) {
    // Super Sete: 1 número de 0 a 9 em cada uma das 7 colunas
    // Nota: O usuário pode fazer apostas múltiplas (até 21 números), mas a básica/gerador padrão sorteia 1 por coluna
    for (let col = 0; col < 7; col++) {
      const number = Math.floor(Math.random() * (config.rangeMax - config.rangeMin + 1)) + config.rangeMin;
      numbers.push(number);
    }
  } else {
    // Sorteio padrão sem repetição
    const set = new Set();
    const range = config.rangeMax - config.rangeMin + 1;
    
    while (set.size < totalNumbers) {
      const num = Math.floor(Math.random() * range) + config.rangeMin;
      set.add(num);
    }
    
    numbers = Array.from(set).sort((a, b) => a - b);
  }

  // Gera campo especial se aplicável
  let special = null;
  if (config.hasSpecial && typeof config.generateSpecial === "function") {
    special = config.generateSpecial();
  }

  return {
    numbers,
    special
  };
}

/**
 * Calcula estatísticas rápidas para um jogo de loteria
 * @param {Array<number>} numbers Lista de números gerados
 * @returns {object} Estatísticas contendo soma, quantidade de pares e quantidade de ímpares
 */
export function getGameStats(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return { sum: 0, even: 0, odd: 0 };
  }

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  let even = 0;
  let odd = 0;

  numbers.forEach(num => {
    if (num % 2 === 0) {
      even++;
    } else {
      odd++;
    }
  });

  return {
    sum,
    even,
    odd
  };
}
