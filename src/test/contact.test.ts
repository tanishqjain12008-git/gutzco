import { describe, expect, it } from "vitest";
import { CONTACT_ENDPOINT, contactSchema } from "@/lib/contact";

describe("contact form", () => {
  it("sends messages to tanishqjain12008@gmail.com", () => {
    expect(CONTACT_ENDPOINT).toContain("tanishqjain12008@gmail.com");
  });
  it("requires a valid email", () => {
    expect(contactSchema.safeParse({ name: "Asha", email: "nope", message: "Hello there" }).success).toBe(false);
  });
});
