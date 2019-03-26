export interface JwtPayload {
  id: string;
  name: string;
}

export interface JwtResponse {
  token: string;
  expiresIn: number;
}
