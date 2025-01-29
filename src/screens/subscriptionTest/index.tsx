import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useSubscriptionStatus, useProducts, usePurchase, useRestorePurchases } from '@api'
import type { Product } from '../../api/hooks/subscriptions/interfaces'
import { styles } from './styles'

export const SubscriptionTest = () => {
  const { data: subscriptionStatus, isLoading: isLoadingStatus } = useSubscriptionStatus()
  const { data: products, isLoading: isLoadingProducts } = useProducts()
  const { mutate: purchase, isPending: isPurchasing } = usePurchase()
  const { mutate: restorePurchases, isPending: isRestoring } = useRestorePurchases()

  const handlePurchase = (productId: string) => {
    purchase(productId)
  }

  if (isLoadingStatus || isLoadingProducts) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription Status</Text>
        <Text>Active: {subscriptionStatus?.isActive ? 'Yes' : 'No'}</Text>
        {subscriptionStatus?.expirationDate && (
          <Text>Expires: {new Date(subscriptionStatus.expirationDate).toLocaleDateString()}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Products</Text>
        {products?.map((product: Product) => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handlePurchase(product.id)} disabled={isPurchasing}>
              <Text style={styles.buttonText}>{isPurchasing ? 'Processing...' : 'Purchase'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.restoreButton]}
        onPress={() => restorePurchases()}
        disabled={isRestoring}
      >
        <Text style={styles.buttonText}>{isRestoring ? 'Restoring...' : 'Restore Purchases'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
