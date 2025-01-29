import { useQuery, useMutation } from '@tanstack/react-query';
import Purchases from 'react-native-purchases';
import { SUBSCRIPTION_KEYS } from './keys';
import type { SubscriptionStatus, Product, PurchaseResult } from './interfaces';
import { useRevenueCat } from '@contexts';

// Hook to get subscription status
export const useSubscriptionStatus = () => {
  const { isInitialized } = useRevenueCat();

  return useQuery({
    queryKey: SUBSCRIPTION_KEYS.status(),
    queryFn: async (): Promise<SubscriptionStatus> => {
      if (!isInitialized) {
        return { isActive: false };
      }

      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const hasActiveSubscription = customerInfo.entitlements.active['premium_tier_1'] !== undefined;
        
        return {
          isActive: hasActiveSubscription,
          expirationDate: hasActiveSubscription 
            ? customerInfo.entitlements.active['premium_tier_1'].expirationDate ?? undefined
            : undefined,
          productId: hasActiveSubscription 
            ? customerInfo.entitlements.active['premium_tier_1'].productIdentifier ?? undefined
            : undefined,
        };
      } catch (error) {
        console.error('Error getting subscription status:', error);
        return { isActive: false };
      }
    },
    enabled: isInitialized,
  });
};

// Hook to get available products
export const useProducts = () => {
  const { isInitialized } = useRevenueCat();

  return useQuery({
    queryKey: SUBSCRIPTION_KEYS.products(),
    queryFn: async (): Promise<Product[]> => {
      if (!isInitialized) {
        console.log('RevenueCat not initialized, skipping product fetch');
        return [];
      }

      try {
        console.log('Fetching RevenueCat offerings...');
        const offerings = await Purchases.getOfferings();
        console.log('RevenueCat offerings response:', offerings);

        if (!offerings.current) {
          console.log('No current offerings available');
          return [];
        }

        return offerings.current.availablePackages.map((pkg) => {
          console.log('Processing package:', pkg.identifier, {
            title: pkg.product.title,
            price: pkg.product.priceString
          });
          
          return {
            id: pkg.identifier,
            title: pkg.product.title,
            description: pkg.product.description,
            price: pkg.product.priceString,
            priceAmount: pkg.product.price,
            currency: pkg.product.currencyCode,
            period: pkg.product.subscriptionPeriod || undefined,
          };
        });
      } catch (error) {
        console.error('Error getting products:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        return [];
      }
    },
    enabled: isInitialized,
  });
};

// Hook to purchase a product
export const usePurchase = () => {
  const { isInitialized } = useRevenueCat();

  return useMutation({
    mutationFn: async (productId: string): Promise<PurchaseResult> => {
      if (!isInitialized) {
        throw new Error('RevenueCat is not initialized');
      }

      try {
        const { customerInfo } = await Purchases.purchaseProduct(productId);
        const success = customerInfo.entitlements.active['premium'] !== undefined;
        
        return {
          success,
          productId: success ? productId : undefined,
        };
      } catch (error) {
        console.error('Error making purchase:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
  });
};

// Hook to restore purchases
export const useRestorePurchases = () => {
  const { isInitialized } = useRevenueCat();

  return useMutation({
    mutationFn: async (): Promise<boolean> => {
      if (!isInitialized) {
        throw new Error('RevenueCat is not initialized');
      }

      try {
        const customerInfo = await Purchases.restorePurchases();
        return customerInfo.entitlements.active['premium'] !== undefined;
      } catch (error) {
        console.error('Error restoring purchases:', error);
        return false;
      }
    },
  });
}; 