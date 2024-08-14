export function toMySQLTime(jsTime: Date) {
  return jsTime.toISOString().split('T')[0];
}
