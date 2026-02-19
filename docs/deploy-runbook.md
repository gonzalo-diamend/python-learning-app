# Runbook de deploy

## Variables requeridas
- `NEXT_PUBLIC_API_BASE_URL`: URL backend.
- `NEXT_PUBLIC_API_TIMEOUT_MS`: timeout requests.
- `NEXT_PUBLIC_USE_MOCK_API=false` en producción.

## Build y start
1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`
6. `npm run start`

## Health checks post-deploy
- Abrir `/` y validar login.
- Verificar sesión con refresh del navegador.
- Resolver un quiz y confirmar progreso.

## Rollback
1. Revertir a imagen/artifact anterior estable.
2. Reapuntar tráfico al deployment previo.
3. Ejecutar health checks post-rollback.

## Monitoreo mínimo recomendado
- Error rate frontend (Sentry o equivalente).
- Latencia y disponibilidad de endpoints backend (`/auth/session`, `/modules`, `/progress`).
- Métrica de conversiones de flujo (`login_ok`, `quiz_submit_ok`, `progress_save_ok`).
