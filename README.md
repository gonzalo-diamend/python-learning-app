# Frontend (Next.js)

Dashboard de aprendizaje para Python: módulos, lecciones, quiz interactivo y progreso por usuario.

## Requisitos
- Node.js 18+
- Backend HTTP disponible (por defecto `http://localhost:8000`)

## Setup local
1. `npm install`
2. `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev`
3. Abrir `http://localhost:3001`
4. Iniciar sesión con usuario/contraseña válidos del backend.

## Modo rápido (sin backend, recomendado para arrancar ya)
1. `npm install`
2. `npm run dev:demo`
3. Abrir `http://localhost:3001`
4. Credenciales demo: cualquier usuario + contraseña `python123`

Este modo usa API mock en memoria (`NEXT_PUBLIC_USE_MOCK_API=true`) para practicar sin servicios externos.

## Scripts útiles
- `npm run dev`: modo desarrollo.
- `npm run dev:demo`: modo demo con API mock (sin backend).
- `npm run build`: build de producción.
- `npm run start`: levantar build de producción.
- `npm run start:demo`: levantar build usando API mock.
- `npm run typecheck`: verificación de tipos TypeScript.
- `npm run lint`: reglas mínimas de calidad (Next + React).
- `npm run test`: tests unitarios.
- `npm run test:e2e`: pruebas UI/E2E del flujo principal.
- `npm run test:integration`: integración contra backend real (requiere env vars).

## Variables de entorno
- `NEXT_PUBLIC_API_BASE_URL`: URL base backend.
- `NEXT_PUBLIC_API_TIMEOUT_MS`: timeout de requests.
- `NEXT_PUBLIC_USE_MOCK_API`: usar mock API (`true`/`false`).
- `BACKEND_BASE_URL`: para `test:integration`.
- `BACKEND_TEST_USER`: usuario de pruebas backend real.
- `BACKEND_TEST_PASSWORD`: contraseña del usuario de pruebas.

## Documentación operativa
- Contrato backend: `docs/backend-contract.md`.
- Runbook deploy: `docs/deploy-runbook.md`.
