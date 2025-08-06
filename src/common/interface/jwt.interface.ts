export interface JwtPayload {
  id: string | number;
  email: string;
  role: string;
  permissions: string[];
}
