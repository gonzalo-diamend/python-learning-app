# Contrato backend

## Autenticación por sesión/cookie

### `POST /auth/login`
Body:
```json
{ "user_id": "ana-python", "password": "secret" }
```
Respuesta 200:
```json
{ "authenticated": true, "user_id": "ana-python" }
```
Notas:
- Debe setear cookie de sesión (`HttpOnly`, `Secure` en prod, `SameSite=Lax` o más estricto).

### `GET /auth/session`
Respuesta 200:
```json
{ "authenticated": true, "user_id": "ana-python" }
```

### `POST /auth/logout`
Body: `{}`
Respuesta 200:
```json
{ "ok": true }
```

## Contenido académico

### `GET /modules`
Respuesta 200:
```json
[
  {
    "id": "python-basics",
    "title": "Fundamentos de Python",
    "description": "Variables, tipos de datos...",
    "level": "Inicial",
    "lesson_count": 2
  }
]
```

### `GET /modules/:module_id`
Respuesta 200:
```json
{
  "id": "python-basics",
  "title": "Fundamentos de Python",
  "lessons": [
    { "id": "intro-print", "title": "Tu primer print" }
  ]
}
```

### `GET /modules/:module_id/lessons/:lesson_id`
Respuesta 200:
```json
{
  "id": "intro-print",
  "title": "Tu primer print",
  "goal": "Mostrar texto en pantalla",
  "theory": "...",
  "example": "print('Hola')",
  "quiz": {
    "questions": [
      {
        "text": "¿Qué hace print('Hola')?",
        "options": ["A", "B", "C"],
        "correct_index": 1
      }
    ]
  }
}
```

## Progreso y quiz

### `GET /progress/:user_id/:module_id`
Respuesta 200:
```json
{ "completion_percent": 50 }
```

### `POST /progress`
Body:
```json
{ "user_id": "ana-python", "module_id": "python-basics", "completed_lessons": ["intro-print"] }
```
Respuesta 200:
```json
{ "ok": true }
```

### `POST /quiz/submit`
Body:
```json
{ "user_id": "ana-python", "module_id": "python-basics", "lesson_id": "intro-print", "answers": [1] }
```
Respuesta 200:
```json
{ "score": 1, "total": 1, "correct_indices": [1] }
```
