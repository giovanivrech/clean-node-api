export interface Authentication {
  auth: (email: string, string: string) => Promise<string>
}
