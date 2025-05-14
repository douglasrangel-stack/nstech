## Objetivo do Projeto

O objetivo deste projeto é implementar as páginas de agendamento de caminhões de forma que fiquem o mais próximo possível dos protótipos fornecidos. Abaixo estão os protótipos das telas esperadas:

### Protótipos

#### Novo Agendamento

![Novo Agendamento](public/assets/New.png)

#### Lista de Agendamentos

![Lista de Agendamentos](public/assets/List.png)

## Status Atual

Atualmente, as páginas implementadas ainda não estão completamente alinhadas com os protótipos. Algumas melhorias são bem-vindas para atingir o objetivo, além de testes unitários funcionais. Além disso, o campo "Motorista" ainda não foi implementado na página de "Novo Agendamento" e "Agendamentos". Os protótipos foram criados utilizando MUI.

Os protótipos devem ser guias, mas as páginas podem ser acrescidas de detalhes (talvez, um rodapé?), campos adicionais (ex: CPF do Motorista) e funções adicionais (por exemplo, uma página de visualização, ou um `<Dialog>` para remoção de Agendamentos).

## Como Executar

Para executar o projeto, siga os passos abaixo:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## API Fake (json-server)

Este projeto utiliza o `json-server` para simular uma API REST durante o desenvolvimento. Para que tudo funcione corretamente, siga os passos abaixo:

1. Instale o `json-server` globalmente (caso ainda não tenha):

   ```bash
   npm install -g json-server
   ```

2. Inicie o `json-server`:

   ```bash
   json-server --watch src/mock/db.json --port 3001
   ```

3. A API estará disponível em: [http://localhost:3001/agendamentos](http://localhost:3001/agendamentos)

⚠️ **Importante:** O `json-server` só funciona em ambiente local. Para produção (como Vercel), é necessário usar as rotas da API do Next.js ou um backend real.
