# Frontend (Next.js)

Dashboard de aprendizaje, muestra módulos, lecciones y permite registrar progreso/quiz.

## Setup
1. `cd apps/web`
2. `npm install` (o `yarn`/`pnpm`; la carpeta `node_modules` no está en repo)
3. `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev`

La app asume que el backend corre en el puerto 8000 y usa `/modules`, `/progress` y `/quiz/submit`.
