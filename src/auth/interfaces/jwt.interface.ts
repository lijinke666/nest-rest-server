export interface JwtPayload {
  id: string;
  username: string;
}

export interface JwtResponse {
  token: string;
  expiresIn: number;
}
