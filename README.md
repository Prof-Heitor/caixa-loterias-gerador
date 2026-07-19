# 🍀 LotoGênio — Gerador Inteligente de Loterias Caixa

<p align="center">
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Feito%20com-Intelig%C3%AAncia%20Artificial-blueviolet?style=for-the-badge" alt="IA"/>
  <img src="https://img.shields.io/badge/Design-Premium%20%2F%20Responsive-orange?style=for-the-badge" alt="Design"/>
</p>

O **LotoGênio** é uma aplicação web de alta fidelidade, interativa e totalmente responsiva, projetada para gerar palpites aleatórios (as famosas "surpresinhas") para todas as modalidades oficiais de loterias da Caixa Econômica Federal.

> 🤖 **Projeto Desenvolvido com IA**: Este projeto foi inteiramente planejado, codificado, estilizado e testado utilizando tecnologias de inteligência artificial de ponta (Google Gemini), demonstrando o poder da engenharia de software assistida por agentes inteligentes para a criação de interfaces modernas, robustas e com excelente experiência do usuário.

---

## 📸 Funcionalidades Premium

1. **Jornada de Etapas Intuitiva (Wizard UI):**
   - **Etapa 1 (Escolha):** Grid visual com os cards de cada loteria usando suas identidades e cores oficiais.
   - **Etapa 2 (Configuração):** Escolha o número de dezenas desejado (com validação automática de regras oficiais da Caixa) e quantos cartões quer gerar (até 10 por vez).
   - **Etapa 3 (Resultados):** Exibição das dezenas sorteadas de forma animada e estatísticas do jogo (soma das dezenas, quantidade de números pares e ímpares).
2. **Aviso de Jogo Responsável (Pop-up de Alerta):**
   - Um modal educativo é exibido logo na entrada do site, alertando o usuário sobre a importância de jogar com moderação e sobre o vício em apostas.
3. **Alternador de Temas (Light / Dark Mode):**
   - Toggle suave no cabeçalho que permite alternar instantaneamente entre o modo escuro padrão (futurista com efeitos glassmorphism) e o modo claro limpo. O tema escolhido é persistido no navegador (`localStorage`).
4. **Layout Bounded (Sem Scroll de Página):**
   - O site se adapta de forma inteligente a qualquer resolução de tela (celulares, tablets e desktops) sem a necessidade de barras de rolagem globais. O conteúdo interno do wizard rola de maneira fluida e independente se houver estouro de dezenas ou cartões.
5. **Suporte Completo a todas as 9 Loterias Caixa:**
   - **Mega-Sena** (6 a 20 dezenas)
   - **Lotofácil** (15 a 20 dezenas)
   - **Quina** (5 a 15 dezenas)
   - **Lotomania** (50 dezenas)
   - **Dupla Sena** (6 a 15 dezenas)
   - **Dia de Sorte** (7 a 15 dezenas + Mês de Sorte especial)
   - **Super Sete** (7 colunas com dígitos de 0 a 9)
   - **+Milionária** (6 dezenas + 2 Trevos da Sorte de 1 a 6)
   - **Timemania** (10 dezenas + Time do Coração sorteado a partir de clubes brasileiros reais)
6. **Exportação Facilitada:**
   - Copie jogos individuais com um clique ou copie todo o lote de cartões formatado diretamente para a área de transferência.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação:** HTML5 Semântico
- **Estilização:** CSS3 Vanilla (variáveis nativas, flexbox, grid, animações `@keyframes` e efeitos de desfoque/vidro)
- **Lógica:** Vanilla JavaScript (ES6+ Modules)
- **Testes Unitários:** [Vitest](https://vitest.dev/) para validação robusta das faixas numéricas e regras dos sorteios.
- **Fontes:** Google Fonts (Outfit, Plus Jakarta Sans)
- **Ícones:** Font Awesome 6.4

---

## 🧪 Como Executar os Testes Unitários

Para garantir que todos os jogos gerados obedeçam rigorosamente às diretrizes da Caixa Econômica Federal, incluímos uma bateria completa de testes unitários.

```bash
# Instalar dependências
npm install

# Executar testes
npm run test
```

Os testes cobrem:
- Limites de números sorteados de cada loteria.
- Prevenção de repetição de dezenas dentro da mesma aposta.
- Geração correta dos elementos especiais (+Milionária, Dia de Sorte, Timemania).
- Lógica de colunas do Super Sete.
- Cálculo estatístico de paridade e soma.

---

## 📝 Isenção de Responsabilidade

Este projeto possui caráter estritamente educativo, de entretenimento e utilidade para geração de palpites estatísticos aleatórios. Não possui nenhuma vinculação oficial com a Caixa Econômica Federal e não realiza registro real de apostas ou pagamento de prêmios. As apostas oficiais devem ser realizadas nos canais autorizados da Caixa.

Boa Sorte! 🍀
