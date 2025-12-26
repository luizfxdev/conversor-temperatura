# 🌡️ Calculadora de Temperatura

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/luizfxdev/conversor-temperatura)

Conversor de temperaturas moderno entre Celsius, Fahrenheit e Kelvin com interface cyberpunk interativa, visualização em gráficos dinâmicos e backend em Go.

---

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como uma solução completa para conversão de temperaturas, combinando um backend robusto em **Go (Golang)** com um frontend dinâmico em **JavaScript**, proporcionando uma experiência visual imersiva inspirada em design cyberpunk/tech.

### ✨ Características Principais

- 🔄 **Conversão Precisa**: Suporte completo para Celsius, Fahrenheit e Kelvin
- 📊 **Visualização Interativa**: 3 gráficos dinâmicos com Chart.js
- 🎨 **Design Cyberpunk**: Interface moderna com efeitos neon e animações
- 🧮 **Cálculos Detalhados**: Passo a passo completo das conversões
- 🌡️ **Pontos de Referência**: Exibição de congelamento e ebulição
- 📱 **Totalmente Responsivo**: Adaptado para desktop, tablet e mobile
- 🎵 **Controles de Áudio**: Player integrado para música ambiente
- 🎥 **Background Dinâmico**: Vídeo em alta resolução (3840x2160)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Go (Golang)** - Linguagem principal para cálculos e API REST
- **net/http** - Servidor HTTP nativo
- **encoding/json** - Serialização de dados
- **math** - Operações matemáticas precisas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com animações e efeitos
- **JavaScript (ES6+)** - Lógica de interação e manipulação DOM
- **Chart.js** - Biblioteca de gráficos interativos

### Design
- **Google Fonts** - Raleway e Orbitron
- **Flexbox/Grid** - Layouts responsivos
- **CSS Animations** - Efeitos visuais e transições
- **Backdrop Filter** - Blur e transparência

---

## 📁 Estrutura do Projeto

```
conversor-temperatura/
├── 📄 index.html          # Interface principal com inputs e dashboard
├── 🎨 styles.css          # Estilos visuais cyberpunk
├── 📊 dashboard.js        # Lógica frontend + gráficos Chart.js
├── ⚙️  calculator.go       # Backend Go com API REST
├── 📁 assets/
│   ├── 🎥 background.mp4  # Vídeo de fundo (3840x2160)
│   └── 🎵 theme.mp3       # Música ambiente
└── 📖 README.md
```

---

## 🚀 Como Usar

### Opção 1: Frontend Standalone (Recomendado para testes rápidos)

```bash
# Clone o repositório
git clone https://github.com/luizfxdev/conversor-temperatura.git
cd conversor-temperatura

# Abra o index.html diretamente no navegador
# A lógica de conversão está implementada em JavaScript
```

### Opção 2: Com Backend Go (Full Stack)

```bash
# Instale Go (se ainda não tiver)
# https://golang.org/dl/

# Execute o servidor
go run calculator.go

# O servidor estará rodando em http://localhost:8080
# Abra index.html no navegador
```

---

## 🎯 Funcionalidades Implementadas

### 1. Conversão de Temperaturas
- ✅ Celsius ↔ Fahrenheit
- ✅ Celsius ↔ Kelvin
- ✅ Fahrenheit ↔ Kelvin
- ✅ Validação de entradas
- ✅ Precisão de 2 casas decimais

### 2. Visualização de Dados
- ✅ **Gráfico de Barras**: Comparação entre as 3 escalas
- ✅ **Gráfico de Linha**: Distribuição dos valores
- ✅ **Gráfico de Referência**: Pontos de congelamento, valor atual e ebulição

### 3. Interface Interativa
- ✅ Inputs com validação em tempo real
- ✅ Seletores de escala intuitivos
- ✅ Botões com animações glow (neon effect)
- ✅ Container com scroll customizado
- ✅ Controles de áudio (play/pause)

### 4. Cálculos Detalhados
- ✅ Exibição passo a passo das fórmulas
- ✅ Conversão para todas as escalas simultaneamente
- ✅ Pontos de congelamento (0°C, 32°F, 273.15K)
- ✅ Pontos de ebulição (100°C, 212°F, 373.15K)

---

## 📐 Fórmulas Utilizadas

### Celsius ↔ Kelvin
```
K = C + 273.15
C = K − 273.15
```

### Celsius ↔ Fahrenheit
```
F = C × 9/5 + 32
C = (F − 32) × 5/9
```

### Fahrenheit ↔ Kelvin
```
K = (F − 32) × 5/9 + 273.15
F = (K − 273.15) × 9/5 + 32
```

---

## 🎨 Personalização

### Cores do Tema (styles.css)
```css
--cyan-primary: #03e9f4;      /* Botão Calcular */
--orange-primary: #ffa500;     /* Botão Retornar */
--background: rgba(5, 8, 1, 0.75);  /* Container */
--neon-glow: rgba(3, 233, 244, 0.5); /* Efeitos */
```

### Fontes
- **Orbitron**: Títulos e botões (estilo futurista)
- **Raleway**: Corpo do texto (legibilidade)

---

## 📱 Responsividade

| Dispositivo | Breakpoint | Adaptações |
|------------|------------|------------|
| Desktop | > 768px | Layout completo com grid |
| Tablet | 480px - 768px | Grid adaptado |
| Mobile | < 480px | Botões empilhados, fonte reduzida |

---

## 🧪 Exemplos de Testes

### Teste 1: Temperatura Ambiente
- **Entrada:** 25°C → **Resultado:** 77°F / 298.15K

### Teste 2: Temperatura Corporal
- **Entrada:** 98.6°F → **Resultado:** 37°C / 310.15K

### Teste 3: Zero Absoluto
- **Entrada:** 0K → **Resultado:** -273.15°C / -459.67°F

### Teste 4: Ponto de Ebulição
- **Entrada:** 100°C → **Resultado:** 212°F / 373.15K

### Teste 5: Ponto Especial
- **Entrada:** -40°F → **Resultado:** -40°C (único ponto onde C = F)

---

## 🎥 Assets Necessários

Coloque na pasta `assets/`:
- **background.mp4** - Vídeo tech/cyberpunk (3840x2160 recomendado)
- **theme.mp3** - Música ambiente (opcional)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)
---

## 🌟 Mostre seu apoio

Se este projeto foi útil para você, considere dar uma ⭐ no repositório!

---

<div align="center">

**Desenvolvido com 💙 usando Go, JavaScript e muita criatividade**

[⬆ Voltar ao topo](#-calculadora-de-temperatura)

</div>
