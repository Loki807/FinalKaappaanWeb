export interface LoginResponse {
   token: string;
   name: string;
   role: string;
   message?: string;

   // Custom metadata from backend
   serviceType?: string;
   isFirstLogin?: boolean;
   isEmailConfirmed?: boolean;

   // Optional details if embedded directly
   tenantId?: string;
   tenantName?: string;
}
