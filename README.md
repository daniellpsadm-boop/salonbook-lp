# BarbFlow — Landing Page (deploy separado)

Site estático da landing, publicado em **projeto Vercel próprio** com domínio exclusivo (ex.: `barbflow.com.br` ou `www.barbflow.com.br`).

O app principal (login, demo, dashboard) continua no outro projeto Vercel na raiz do repositório.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `VITE_APP_URL` | Sim (produção) | URL do app principal, sem barra no final. Ex.: `https://app.salonbook.com.br` |

Os botões "Ver Demo" apontam para `{VITE_APP_URL}/demo/dashboard`.

## Deploy na Vercel (segundo projeto)

1. [vercel.com/new](https://vercel.com/new) → importe o **mesmo repositório** do BarbFlow.
2. **Project Name:** `barbflow-landing` (ou similar).
3. **Root Directory:** `LP` (obrigatório).
4. Framework: Vite (detectado via `LP/vercel.json`).
5. **Environment Variables** (Production + Preview):
   - `VITE_APP_URL` = URL do app principal.
6. Deploy.

## Domínio exclusivo

No projeto **barbflow-landing**:

1. **Settings → Domains → Add**
2. Exemplos:
   - `barbflow.com.br` (apex)
   - `www.barbflow.com.br`
3. Configure DNS no registrador conforme a Vercel indicar (A/CNAME).

No projeto do **app principal**, use outro host (ex.: `app.salonbook.com.br`) para não conflitar.

## Desenvolvimento local

```bash
cd LP
npm install
# opcional: copie .env.example para .env e defina VITE_APP_URL
npm run dev
```

Porta padrão do Vite: `5173` (ou a próxima livre).

## Build

```bash
cd LP
npm run build
npm run preview
```

## CLI (alternativa ao dashboard)

Na pasta `LP`:

```bash
npx vercel link
npx vercel env add VITE_APP_URL production
npx vercel --prod
npx vercel domains add barbflow.com.br
```
