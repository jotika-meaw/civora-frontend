export const CATEGORIES = [
  "Cleanup",
  "Donation",
  "Plantation",
  "Education",
  "Health",
  "Food",
  "Environment",
  "Community",
  "Other",
];

export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
