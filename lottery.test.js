import { describe, it, expect } from "vitest";
import { LOTTERY_CONFIGS, generateGame, getGameStats } from "./lottery.js";

describe("Testes das Loterias Caixa", () => {
  
  describe("Configurações das Loterias", () => {
    it("deve conter todas as loterias principais", () => {
      const keys = Object.keys(LOTTERY_CONFIGS);
      expect(keys).toContain("megasena");
      expect(keys).toContain("lotofacil");
      expect(keys).toContain("quina");
      expect(keys).toContain("lotomania");
      expect(keys).toContain("duplasena");
      expect(keys).toContain("diadesorte");
      expect(keys).toContain("supersete");
      expect(keys).toContain("maismilionaria");
      expect(keys).toContain("timemania");
    });
  });

  describe("Geração de Jogos - Mega-Sena", () => {
    it("deve gerar 6 números válidos e ordenados entre 1 e 60", () => {
      const game = generateGame("megasena", 6);
      expect(game.numbers.length).toBe(6);
      expect(game.special).toBeNull();
      
      // Valida se está no intervalo e sem repetição
      const unique = new Set(game.numbers);
      expect(unique.size).toBe(6);
      
      game.numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(60);
      });

      // Valida se está ordenado
      const sorted = [...game.numbers].sort((a, b) => a - b);
      expect(game.numbers).toEqual(sorted);
    });

    it("deve gerar aposta máxima de 20 números", () => {
      const game = generateGame("megasena", 20);
      expect(game.numbers.length).toBe(20);
      const unique = new Set(game.numbers);
      expect(unique.size).toBe(20);
    });

    it("deve falhar se pedir quantidade fora do limite (ex: 5 ou 21)", () => {
      expect(() => generateGame("megasena", 5)).toThrow();
      expect(() => generateGame("megasena", 21)).toThrow();
    });
  });

  describe("Geração de Jogos - Lotofácil", () => {
    it("deve gerar 15 números válidos entre 1 e 25", () => {
      const game = generateGame("lotofacil", 15);
      expect(game.numbers.length).toBe(15);
      
      game.numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(25);
      });
    });
  });

  describe("Geração de Jogos - +Milionária", () => {
    it("deve gerar 6 números principais de 1 a 50 e 2 trevos especiais de 1 a 6", () => {
      const game = generateGame("maismilionaria", 6);
      expect(game.numbers.length).toBe(6);
      expect(game.special).toBeInstanceOf(Array);
      expect(game.special.length).toBe(2);
      
      game.numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(50);
      });

      game.special.forEach(trevo => {
        expect(trevo).toBeGreaterThanOrEqual(1);
        expect(trevo).toBeLessThanOrEqual(6);
      });
      // Os trevos também não se repetem na regra oficial
      expect(game.special[0]).not.toBe(game.special[1]);
    });
  });

  describe("Geração de Jogos - Super Sete", () => {
    it("deve gerar 7 números, onde cada número representa uma coluna de 0 a 9", () => {
      const game = generateGame("supersete", 7);
      expect(game.numbers.length).toBe(7);
      game.numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(9);
      });
    });
  });

  describe("Geração de Jogos - Dia de Sorte", () => {
    it("deve gerar 7 números de 1 a 31 e um mês válido", () => {
      const game = generateGame("diadesorte", 7);
      expect(game.numbers.length).toBe(7);
      expect(typeof game.special).toBe("string");
      
      const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
      expect(meses).toContain(game.special);
    });
  });

  describe("Cálculo de Estatísticas", () => {
    it("deve calcular a soma, pares e ímpares corretamente", () => {
      const numbers = [1, 2, 3, 4, 5, 6]; // soma = 21, pares = 3, ímpares = 3
      const stats = getGameStats(numbers);
      expect(stats.sum).toBe(21);
      expect(stats.even).toBe(3);
      expect(stats.odd).toBe(3);
    });

    it("deve lidar com arrays vazios ou inválidos", () => {
      const stats = getGameStats([]);
      expect(stats.sum).toBe(0);
      expect(stats.even).toBe(0);
      expect(stats.odd).toBe(0);
    });
  });
});
