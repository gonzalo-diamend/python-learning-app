# Frontend (Next.js)

Dashboard de aprendizaje para Python: módulos, lecciones, quiz interactivo y progreso por usuario.

## Requisitos
- Node.js 18+
- Backend disponible (por defecto en `http://localhost:8000`)

## Setup local
1. `npm install`
2. `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 NEXT_PUBLIC_APP_PASSWORD=python123 npm run dev`
3. Abrir `http://localhost:3001`
4. Ingresar la contraseña configurada para acceder.

## Scripts útiles
- `npm run dev`: modo desarrollo.
- `npm run build`: build de producción.
- `npm run start`: levantar build de producción.
- `npm run typecheck`: verificación de tipos TypeScript.
- `npm run test`: tests unitarios (Node test runner + compilación temporal TS).

## CI
Se incluye workflow de GitHub Actions (`.github/workflows/ci.yml`) con:
- `npm ci`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Dependencias backend esperadas
La app consume:
- `GET /modules`
- `GET /modules/:module_id`
- `GET /modules/:module_id/lessons/:lesson_id`
- `GET /progress/:user_id/:module_id`
- `POST /progress`
- `POST /quiz/submit`
