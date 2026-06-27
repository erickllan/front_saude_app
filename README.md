#  App de Unidades de Saúde - Recife/PE
## Aluno: Erick Allan Gomes turma 49
 
Aplicativo mobile em React Native (Expo) que exibe as unidades de saúde do município do Recife, com busca por nome, bairro ou tipo, uso de GPS e histórico de pesquisas.
 
---
 
##  Sumário
 
- [Visão Geral](#visão-geral)
- [Telas](#telas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução Local](#instalação-e-execução-local)
- [Configuração da URL do Backend](#configuração-da-url-do-backend)
- [Observações Técnicas](#observações-técnicas)
- [Dependências principais](#dependências-principais)
---
 
## Visão Geral
 
O app consome a [API de Unidades de Saúde](https://github.com/seu-usuario/seu-repo-backend) para listar UBS, SPA/UPA, USF e Centros de Testagem HIV/IST/AIDS do Recife. O usuário pode buscar pelo nome, bairro ou tipo da unidade — cada pesquisa registra automaticamente a localização GPS no backend.
 
---
 
## Telas
 
###  Home (`/`)
- Solicita permissão de GPS ao abrir
- Exibe campo de busca por nome, bairro ou tipo
- Lista as unidades filtradas com tag colorida por tipo:
| Cor | Tipo |
|-----|------|
| 🟢 Verde | UBS |
| 🔴 Vermelho | SPA/UPA |
| 🟡 Amarelo | USF - Saúde da Família |
| 🟤 Vinho | Testagem HIV/IST/AIDS |
 
- A cada digitação, envia a localização e o termo buscado ao backend
### 📋 Histórico (`/historico`)
- Lista todas as pesquisas registradas no backend
- Exibe: termo buscado, total de unidades encontradas, coordenadas GPS e data/hora em formato brasileiro
---
 
## Estrutura do Projeto
 
```
/
├── app/
│   ├── index.tsx          # Tela principal (Home) — busca e listagem
│   └── historico.tsx      # Tela de histórico de pesquisas
├── assets/                # Imagens e ícones
├── app.json               # Configurações do Expo
├── package.json
└── README.md
```
 
> Projeto criado com **Expo Router** — a navegação entre telas é baseada em arquivos dentro da pasta `app/`.
 
---
 
## Pré-requisitos
 
- [Node.js](https://nodejs.org/) v18 ou superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Backend rodando localmente ([ver repo do backend](https://github.com/seu-usuario/seu-repo-backend))
---
 
## Instalação e Execução Local
 
**1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd <nome-da-pasta>
```
 
**2. Instale as dependências**
```bash
npm install
```
 
**3. Configure a URL do backend** (veja seção abaixo)
 
**4. Inicie o app**
```bash
npx expo start
```
 
Escaneie o QR Code com o **Expo Go** no celular. O celular e o computador precisam estar na **mesma rede Wi-Fi**.
 
---
 
## Configuração da URL do Backend
 
O app se comunica com o backend via IP local da máquina. Antes de rodar, substitua `seu IP` pelo IP da sua máquina nos arquivos:
 
**`app/index.tsx`** — dois lugares:
```ts
// Linha do fetch das unidades
fetch("http://SEU_IP:3000/unidades-saude")
 
// Linha do POST de localização
fetch("http://SEU_IP:3000/localizacao", { ... })
```
 
**`app/historico.tsx`:**
```ts
fetch(`http://SEU_IP:3000/localizacoes`)
```
 
> Para descobrir seu IP local: no Windows rode `ipconfig` no terminal; no Mac/Linux rode `ifconfig`. Use o IP que aparece em "IPv4" ou "inet", ex: `192.168.1.10`.
 
---
 
## Observações Técnicas
 
- **Permissão de GPS obrigatória:** se o usuário negar, o app exibe um alerta e não carrega os dados. A permissão é solicitada via `expo-location`.
- **Busca em tempo real:** o filtro roda localmente no array já carregado — sem nova requisição à API a cada letra digitada. Apenas o registro de histórico faz um POST ao backend.
- **Sem cache:** os dados são carregados uma única vez ao abrir o app. Para atualizar, é necessário reabrir a tela.
- **Histórico mais recente primeiro:** a tela de histórico inverte a lista recebida do backend (`.reverse()`), mostrando a última pesquisa no topo.
- **TypeScript:** o projeto usa TypeScript com Expo. Alguns tipos estão marcados como `any` para simplificar o desenvolvimento.
---
 
## Dependências principais
 
| Pacote | Uso |
|--------|-----|
| `expo` | Plataforma base do app |
| `expo-router` | Navegação baseada em arquivos |
| `expo-location` | Acesso ao GPS do dispositivo |
| `react-native` | Framework mobile |
