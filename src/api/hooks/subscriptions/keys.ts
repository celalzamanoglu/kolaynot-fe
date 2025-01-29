export const SUBSCRIPTION_KEYS = {
  all: ['subscriptions'] as const,
  status: () => [...SUBSCRIPTION_KEYS.all, 'status'] as const,
  products: () => [...SUBSCRIPTION_KEYS.all, 'products'] as const,
} as const; 