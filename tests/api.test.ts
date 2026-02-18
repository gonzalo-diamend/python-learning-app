import * as assert from "node:assert/strict";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { AddressInfo } from "node:net";
import { test } from "node:test";

import { ApiError, fetchJson, postJson } from "../lib/api";

const originalTimeout = process.env.NEXT_PUBLIC_API_TIMEOUT_MS;
process.env.NEXT_PUBLIC_API_TIMEOUT_MS = "300";

type HttpHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

const withTimeoutValue = async (timeoutMs: string, run: () => Promise<void>) => {
  const prev = process.env.NEXT_PUBLIC_API_TIMEOUT_MS;
  process.env.NEXT_PUBLIC_API_TIMEOUT_MS = timeoutMs;
  try {
    await run();
  } finally {
    if (prev === undefined) {
      delete process.env.NEXT_PUBLIC_API_TIMEOUT_MS;
    } else {
      process.env.NEXT_PUBLIC_API_TIMEOUT_MS = prev;
    }
  }
};

const withServer = async (handler: HttpHandler, run: (baseUrl: string) => Promise<void>): Promise<void> => {
  const server = createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const originalBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  process.env.NEXT_PUBLIC_API_BASE_URL = baseUrl;

  try {
    await run(baseUrl);
  } finally {
    if (originalBase === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = originalBase;
    }
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
};

test("fetchJson obtiene payload JSON", async () => {
  await withServer((req, res) => {
    if (req.url === "/modules") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify([{ id: "m1" }]));
      return;
    }
    res.statusCode = 404;
    res.end();
  }, async () => {
    const data = await fetchJson<Array<{ id: string }>>("/modules");
    assert.equal(data[0].id, "m1");
  });
});

test("postJson envía payload y recibe respuesta", async () => {
  await withServer((req, res) => {
    if (req.url === "/progress" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += String(chunk);
      });
      req.on("end", () => {
        const parsed = JSON.parse(body);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true, user: parsed.user_id }));
      });
      return;
    }

    res.statusCode = 404;
    res.end();
  }, async () => {
    const response = await postJson<{ ok: boolean; user: string }>("/progress", { user_id: "demo-user" });
    assert.equal(response.ok, true);
    assert.equal(response.user, "demo-user");
  });
});

test("fetchJson lanza ApiError con status cuando backend responde error HTTP", async () => {
  await withServer((_req, res) => {
    res.statusCode = 500;
    res.end();
  }, async () => {
    await assert.rejects(
      () => fetchJson("/modules"),
      (error: unknown) => error instanceof ApiError && error.status === 500 && error.code === undefined
    );
  });
});

test("fetchJson lanza ApiError timeout cuando la respuesta tarda demasiado", async () => {
  await withTimeoutValue("20", async () => {
    await withServer((_req, res) => {
      setTimeout(() => {
        res.end();
      }, 200);
    }, async () => {
      await assert.rejects(
        () => fetchJson("/slow"),
        (error: unknown) => error instanceof ApiError && error.code === "timeout" && error.status === 0
      );
    });
  });
});

test.after(() => {
  if (originalTimeout === undefined) {
    delete process.env.NEXT_PUBLIC_API_TIMEOUT_MS;
  } else {
    process.env.NEXT_PUBLIC_API_TIMEOUT_MS = originalTimeout;
  }
});


test("fetchJson usa mock API cuando NEXT_PUBLIC_USE_MOCK_API=true", async () => {
  const prev = process.env.NEXT_PUBLIC_USE_MOCK_API;
  process.env.NEXT_PUBLIC_USE_MOCK_API = "true";

  try {
    const modules = await fetchJson<Array<{ id: string }>>("/modules");
    assert.equal(modules.length > 0, true);
  } finally {
    if (prev === undefined) {
      delete process.env.NEXT_PUBLIC_USE_MOCK_API;
    } else {
      process.env.NEXT_PUBLIC_USE_MOCK_API = prev;
    }
  }
});

test("postJson quiz/submit responde usando mock API", async () => {
  const prev = process.env.NEXT_PUBLIC_USE_MOCK_API;
  process.env.NEXT_PUBLIC_USE_MOCK_API = "true";

  try {
    const result = await postJson<{ score: number; total: number }>("/quiz/submit", {
      module_id: "python-basics",
      lesson_id: "intro-print",
      answers: [1],
    });

    assert.equal(result.total, 1);
    assert.equal(result.score, 1);
  } finally {
    if (prev === undefined) {
      delete process.env.NEXT_PUBLIC_USE_MOCK_API;
    } else {
      process.env.NEXT_PUBLIC_USE_MOCK_API = prev;
    }
  }
});
