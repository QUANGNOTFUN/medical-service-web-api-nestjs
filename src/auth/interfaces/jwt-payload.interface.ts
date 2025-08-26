
export interface JwtPayload {
  email: string;
  role: number;
  iat?: number;
  exp?: number;
} 