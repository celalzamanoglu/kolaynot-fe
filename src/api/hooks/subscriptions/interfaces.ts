export interface SubscriptionStatus {
  isActive: boolean;
  expirationDate?: string;
  productId?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  priceAmount: number;
  currency: string;
  period?: string;
}

export interface PurchaseResult {
  success: boolean;
  error?: string;
  productId?: string;
} 