import { z } from "zod";

export const PRODUCT = { name: "Gutz Elixir", volume: "100 ml", price: 100, delivery: 0 } as const;
export const quantitySchema = z.number().int().min(1).max(99);
export const deliverySchema = z.object({
  name: z.string().trim().min(2, "Add your full name.").max(100),
  email: z.string().trim().email("Add a valid email address.").max(254),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  address: z.string().trim().min(5, "Add your delivery address.").max(300),
  city: z.string().trim().refine((value) => value.toLowerCase() === "delhi" || value.toLowerCase() === "new delhi", "We're delivering in Delhi only right now."),
  pin: z.string().regex(/^110\d{3}$/, "Enter a Delhi PIN code (110xxx)."),
});
export function getBill(quantity: number) {
  const validQuantity = quantitySchema.parse(quantity);
  return { subtotal: PRODUCT.price * validQuantity, delivery: PRODUCT.delivery, total: PRODUCT.price * validQuantity + PRODUCT.delivery };
}
export const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;