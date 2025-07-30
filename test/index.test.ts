import { it, expect } from "vitest";
import { env, SELF, introspectWorkflowInstance } from "cloudflare:test";

it("should test my introspection", async () => {
  let instance = await introspectWorkflowInstance(
    env.MY_WORKFLOW,
    "test-instance-id"
  );

  instance.modify((m) => {
    m.disableSleeps();
    m.mockStepImplementation({ name: "a" });
  });

  await instance.waitUntil({ status: "complete" });
});

it("should return testing", async () => {
  let response = await SELF.fetch("https://example.com/test");
  let data = await response.json();
  expect(data.status).toBe("testing");
});
