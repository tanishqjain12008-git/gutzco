import { z } from "zod";

export const CONTACT_EMAIL = "tanishqjain12008@gmail.com";
// FormSubmit forwards form posts to the inbox with no server or keys, so it works on any host.
export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().regex(/^$|^[6-9]\d{9}$/, "Enter a 10-digit mobile number").optional().default(""),
  message: z.string().trim().min(5, "Add a short message").max(1500),
});
export type ContactDetails = z.infer<typeof contactSchema>;
