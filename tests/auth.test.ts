import * as assert from "node:assert/strict";
import { test } from "node:test";
import { fetchSession, login, logout } from "../lib/auth";

test("auth mock: login/session/logout", async () => {
  const prev = process.env.NEXT_PUBLIC_USE_MOCK_API;
  process.env.NEXT_PUBLIC_USE_MOCK_API = "true";

  try {
    const before = await fetchSession();
    assert.equal(before.authenticated, false);

    const logged = await login("demo-user", "python123");
    assert.equal(logged.authenticated, true);
    assert.equal(logged.user_id, "demo-user");

    const session = await fetchSession();
    assert.equal(session.authenticated, true);
    assert.equal(session.user_id, "demo-user");

    const out = await logout();
    assert.equal(out.ok, true);

    const after = await fetchSession();
    assert.equal(after.authenticated, false);
  } finally {
    if (prev === undefined) {
      delete process.env.NEXT_PUBLIC_USE_MOCK_API;
    } else {
      process.env.NEXT_PUBLIC_USE_MOCK_API = prev;
    }
  }
});
