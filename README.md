# 🍀 LotoGênio - Gerador de Loterias Caixa

O **LotoGênio** é uma aplicação web moderna, interativa e totalmente responsiva que permite gerar jogos aleatórios ("surpresinhas") para todas as modalidades oficiais de loterias da Caixa Econômica Federal.

Construído com design premium (modo escuro por padrão, efeitos *glassmorphism*, animações suaves de sorteio e paleta de cores temática de cada jogo), o sistema guia o usuário passo a passo através de uma experiência intuitiva e limpa.

---

## 🚀 Funcionalidades

1. **Jornada em Etapas (Wizard):**
   - **Etapa 1 (Escolha):** Grid visual com os cards de cada loteria usando suas identidades e cores oficiais.
   - **Etapa 2 (Configuração):** Escolha o número de dezenas desejado (com validação automática de regras oficiais da Caixa) e quantos cartões quer gerar (até 10 por vez).
   - **Etapa 3 (Resultados):** Exibição das dezenas sorteadas de forma animada e estatísticas do jogo (soma das dezenas, quantidade de números pares e ímpares).
2. **Todas as Loterias Caixa Suportadas:**
   - Mega-Sena, Lotofácil, Quina, Lotomania, Dupla Sena, Dia de Sorte, Super Sete, +Milionária e Timemania.
3. **Regras Oficiais Respeitadas:**
   - Limites de números mínimos e máximos permitidos por bilhete.
   - Campos especiais dinâmicos (+Milionária com trevos de 1 a 6, Dia de Sorte com meses, Timemania com times reais e Super Sete ordenado por colunas de 0 a 9).
4. **Cópia Rápida:** Botão para copiar jogos individuais ou exportar todos de uma só vez formatados.
5. **Responsividade Integrada:** Desenvolvido para funcionar perfeitamente em celulares, tablets e computadores de alta resolução.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação:** HTML5 Semântico
- **Estilização:** CSS3 Vanilla (variáveis nativas, flexbox, grid, animações `@keyframes` e efeitos de desfoque/vidro)
- **Lógica:** Vanilla JavaScript (ES6+ Modules)
- **Testes Unitários:** [Vitest](https://vitest.dev/) para validação robusta da integridade matemática de geração de jogos.
- **Fontes:** Google Fonts (Outfit, Plus Jakarta Sans)
- **Ícones:** Font Awesome 6.4

---

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para rodar
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/caixa-loterias-gerador.git
   cd caixa-loterias-gerador
   ```
2. **Instale as dependências (para execução de testes):**
   ```bash
   npm install
   ```
3. **Execução local:**
   Como este projeto usa módulos ES6 nativos, basta rodar um servidor HTTP estático local ou clicar duas vezes no arquivo `index.html` (desde que seu navegador suporte módulos via protocolo `file://`, mas o recomendado é rodar com um servidor local como o Live Server do VS Code ou via npm):
   ```bash
   npx serve .
   ```

---

## 🧪 Como Executar os Testes Unitários

Para garantir que todos os jogos gerados obedeçam rigorosamente às diretrizes e ranges de números da Caixa Econômica Federal, nós incluímos uma bateria completa de testes unitários.

Para executar os testes:
```bash
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
