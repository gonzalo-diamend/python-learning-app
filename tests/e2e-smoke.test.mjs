import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const waitForServer = async (url, timeoutMs = 45_000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start: ${url}`);
};

test("ui smoke: landing y pantalla de login", async () => {
  const proc = spawn("npm", ["run", "dev:demo"], {
    cwd: process.cwd(),
    env: { ...process.env },
    stdio: "pipe",
  });

  try {
    await waitForServer("http://127.0.0.1:3001");
    const res = await fetch("http://127.0.0.1:3001");
    const html = await res.text();

    assert.equal(res.ok, true);
    assert.match(html, /Ingreso con sesión backend/i);
    assert.match(html, /Contraseña/i);
  } finally {
    proc.kill("SIGTERM");
  }
});
