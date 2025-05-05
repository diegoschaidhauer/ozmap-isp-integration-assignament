# OZmap ISP Integration Assignment

## Descrição

Este projeto tem como objetivo integrar dados de um sistema ISP simulado com a plataforma OZmap, utilizando o SDK oficial `@ozmap/ozmap-sdk`. A aplicação consulta, transforma e envia entidades como cabos, caixas, drop cables e clientes.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **MongoDB** (via Docker)
- **Mongoose**
- **json-server** (para simular o sistema ISP)
- **Winston** (logger)
- **dotenv**

##  Estrutura do Projeto

```
├── src
│   ├── app.ts              # Inicialização da aplicação
│   ├── services/           # Serviços de integração e regras de negócio
│   ├── mappers/            # Conversão de dados entre modelos
│   ├── repositories/       # Persistência dos dados sincronizados
│   ├── utils/              # Utilitários como logger
│   └── config/             # Configurações como conexão com MongoDB
├── db.json                # Mock do sistema ISP via json-server
├── .env                   # Variáveis de ambiente
└── README.md
```

##  Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/diegoschaidhauer/ozmap-isp-integration-assignament.git
cd ozmap-isp-integration-assignament

```

### 2. Configure o arquivo `.env`
Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
ISP_API_URL=http://localhost:4000
OZMAP_API_KEY=sem-a-api-key-somente-teste
OZMAP_BASE_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/ozmap_sync
SYNC_INTERVAL_MS=100000
SIMULATE_OZMAP=true
OZMAP_PROJECT_ID=64faabc123456
OZMAP_DEFAULT_CABLE_TYPE_ID=64fcableTypeId
OZMAP_BOX_TYPE_ID=64fboxTypeId

```

### 3. Suba o MongoDB via Docker
```bash
docker-compose up -d

```

### 4. Inicie o mock ISP
```bash
npx json-server --watch db.json --port 4000

```

### 5. Rode a aplicação em modo dev
```bash
npm run dev
```

## Resultado Esperado
A aplicação irá:
1. Buscar os dados simulados do ISP
2. Transformar para os formatos esperados pelo SDK
3. Enviar para o OZmap
4. Registrar no MongoDB que a entidade foi sincronizada com sucesso

Logs informativos serão exibidos no console.

---

## Arquitetura Aplicada

O projeto segue uma arquitetura em camadas, com separação de responsabilidades. A estrutura geral pode ser descrita como um Service-Repository Pattern, combinando princípios de Clean Architecture e boas práticas de engenharia de software.

### Camadas principais:

- **Services:**  
  Responsáveis pela orquestração da lógica de negócio e integração entre camadas.  
  Exemplo: `SyncService`, `OzmapService`, `IspService`.

- **Repositories:**  
  Responsáveis pela persistência de dados e abstração do banco de dados.  
  Exemplo: `SyncRepository`.

- **Mappers:**  
  Encapsulam a transformação de dados entre formatos (DTOs), garantindo desacoplamento e tipagem segura.  
  Exemplo: `CableMapper`, `BoxMapper`, `CustomerMapper`.

- **SDKs / Integrações externas:**  
  SDK oficial do OZmap, acessado via `@ozmap/ozmap-sdk`.

---

## Padrões de Projeto Aplicados

- **Repository Pattern:**  
  Abstrai a persistência de dados e facilita troca de fonte de dados (ex: Mongo, SQL).

- **Service Layer Pattern:**  
  Centraliza regras de negócio e interações entre as diferentes fontes de dados.

- **Mapper Pattern:**  
  Responsável pela conversão de dados do ISP para os DTOs esperados pelo OZmap.


---

##  PS: Considerações Pessoais

Durante o desenvolvimento deste desafio, enfrentei alguns pontos de dificuldade:

- Foi um pouco difíicil de identificar alguns casos de envio para o Ozmap, o que exigiu uma investigação mais profunda no arquivo `.d.ts` para compreender a estrutura correta dos DTOs.
- Houveram inconsistências nos nomes das entidades (`dropCable` vs `dropCables`), o que exigiu testes e análise do tipo de retorno do SDK.
- A integração com MongoDB foi feita via Docker, o que facilitou o setup local e pode ser facilmente replicado.
- Utilizei o Winston para geraçao de logs, que irá criar um arquivo sync.log na raiz do projeto



---

