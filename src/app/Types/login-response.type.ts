export interface LoginResponse {
 token: string;
  name: string;
  role: string;
  message?: string;
  requirePasswordChange?: boolean;

  tenantId: string;       // from backend
  tenantName: string;     // from backend
   // from backend
}
