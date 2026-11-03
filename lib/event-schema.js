import { z } from "zod";
import { CATEGORIES } from "./constants";

// Shared by Create Event and Update Event forms
export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(5000),
  category: z.enum(CATEGORIES, { message: "Select an event type" }),
  image: z.string().trim().url("Image must be a valid URL"),
  location: z.string().trim().min(2, "Location is required").max(160),
  eventDate: z
    .string()
    .min(1, "Pick an event date")
    .refine((v) => new Date(v).getTime() > Date.now(), "Event date must be in the future"),
});

// datetime-local value <-> ISO, so the server stores the user's local time correctly
export function toISO(local) {
  return new Date(local).toISOString();
}

export function toLocalInput(value) {
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function minLocalInput() {
  return toLocalInput(Date.now() + 60 * 1000);
}
