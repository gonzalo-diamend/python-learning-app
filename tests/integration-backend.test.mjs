import test from "node:test";
import assert from "node:assert/strict";

const baseUrl = process.env.BACKEND_BASE_URL;
const userId = process.env.BACKEND_TEST_USER;
const password = process.env.BACKEND_TEST_PASSWORD;

const hasConfig = Boolean(baseUrl && userId && password);

const runOrSkip = hasConfig ? test : test.skip;

runOrSkip("backend real: auth/session/login/logout", async () => {
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, password }),
  });

  assert.equal(loginRes.ok, true);

  const sessionCookie = loginRes.headers.get("set-cookie");
  assert.ok(sessionCookie, "backend debe devolver cookie de sesión");

  const sessionRes = await fetch(`${baseUrl}/auth/session`, {
    headers: { Cookie: sessionCookie },
  });
  assert.equal(sessionRes.ok, true);

  const sessionPayload = await sessionRes.json();
  assert.equal(sessionPayload.authenticated, true);

  const logoutRes = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: { Cookie: sessionCookie, "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(logoutRes.ok, true);
});

runOrSkip("backend real: módulos y progreso", async () => {
  const modulesRes = await fetch(`${baseUrl}/modules`);
  assert.equal(modulesRes.ok, true);

  const modules = await modulesRes.json();
  assert.ok(Array.isArray(modules) && modules.length > 0, "debe haber módulos");

  const moduleId = modules[0].id;
  const moduleDetailRes = await fetch(`${baseUrl}/modules/${moduleId}`);
  assert.equal(moduleDetailRes.ok, true);
  const moduleDetail = await moduleDetailRes.json();
  assert.ok(Array.isArray(moduleDetail.lessons) && moduleDetail.lessons.length > 0, "debe haber lecciones");

  const lessonId = moduleDetail.lessons[0].id;
  const lessonRes = await fetch(`${baseUrl}/modules/${moduleId}/lessons/${lessonId}`);
  assert.equal(lessonRes.ok, true);

  const progressWrite = await fetch(`${baseUrl}/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, module_id: moduleId, completed_lessons: [lessonId] }),
  });
  assert.equal(progressWrite.ok, true);

  const progressRead = await fetch(`${baseUrl}/progress/${userId}/${moduleId}`);
  assert.equal(progressRead.ok, true);

  const progress = await progressRead.json();
  assert.ok(typeof progress.completion_percent === "number");
});
