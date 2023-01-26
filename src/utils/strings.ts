// Check if a string is a valid ID
export function isValidId(strId: string) {
  return /^\d+$/.test(strId);
}
