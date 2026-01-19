export interface CreateTenantRequest {
name: string;
addressLine1?: string;
addressLine2?: string;
city: string;
stateOrDistrict?: string;
postalCode?: string;
contactNumber: string;

serviceType:string;

}