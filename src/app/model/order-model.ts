export class OrderRequest {
  customerName!: string;
  phoneNo!: string;
  houseNo!: string;
  area!: string;
  countryId!: number;
  stateId!: number;
  cityId!: number;
  pinCode!: string;
  paymentMode!: number;
  userId?: number;
  guestToken?: string | null;
  couponCode?: string | null;
}
