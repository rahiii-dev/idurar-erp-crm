export function env(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`❌ Environment variable ${key} is required`);
  }
  return value;
}

export function envChecker(requiredKeys: string[]): void {
  const missing = requiredKeys.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`❌ Missing environment variables: ${missing.join(', ')}`);
  }
}