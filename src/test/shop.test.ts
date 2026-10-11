import { describe, expect, it } from "vitest";
import { deliverySchema, getBill, PRODUCT } from "@/lib/shop";

const valid = { name: "Test Person", email: "test@example.com", phone: "9876543210", address: "10 Test Street", city: "Delhi", pin: "110001" };
describe("Gutz checkout rules", () => {
  it("prices each can at 100 rupees", () => { expect(getBill(3).subtotal).toBe(300); });
  it("uses 100 ml cans", () => { expect(PRODUCT.volume).toBe("100 ml"); });
  it("delivers for free", () => { expect(getBill(2)).toEqual({ subtotal: 200, delivery: 0, total: 200 }); });
  it("accepts Delhi delivery only", () => { expect(deliverySchema.safeParse(valid).success).toBe(true); expect(deliverySchema.safeParse({ ...valid, city: "Mumbai" }).success).toBe(false); });
});