import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { IngredientCard } from '@/components/IngredientCard';
import { RiskBadge } from '@/components/RiskBadge';
import { Colors } from '@/constants/theme';
import { formatTimestamp, getHistory, HistoryItem } from '@/services/storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryDetailScreen() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [item, setItem] = useState<HistoryItem | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadItem();
   }, [id]);

   const loadItem = async () => {
      const history = await getHistory();
      const found = history.find(h => h.id === id);
      setItem(found || null);
      setLoading(false);
   };

   const getVerdictStyle = (verdict: string) => {
      switch (verdict) {
         case 'Tüketilebilir':
            return { backgroundColor: Colors.risk.low, emoji: '✅' };
         case 'Dikkatli Tüket':
            return { backgroundColor: Colors.risk.medium, emoji: '⚠️' };
         case 'SAKIN TÜKETME':
            return { backgroundColor: Colors.risk.high, emoji: '🚫' };
         default:
            return { backgroundColor: '#6B7280', emoji: '❓' };
      }
   };

   if (loading) {
      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
               <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
         </SafeAreaView>
      );
   }

   if (!item) {
      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.backButton}>← Geri</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
               <Text style={styles.errorIcon}>😕</Text>
               <Text style={styles.errorText}>Kayıt bulunamadı</Text>
            </View>
         </SafeAreaView>
      );
   }

   const result = item.result;
   const verdictStyle = getVerdictStyle(result.verdict);

   return (
      <SafeAreaView style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
               <Text style={styles.backButton}>← Geri</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tarama Detayı</Text>
            <View style={{ width: 50 }} />
         </View>

         <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            {/* Timestamp */}
            <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>

            {/* Product Name */}
            <Text style={styles.productName}>{result.product_name}</Text>

            {/* Verdict Banner */}
            <View style={[styles.verdictBanner, { backgroundColor: verdictStyle.backgroundColor }]}>
               <Text style={styles.verdictEmoji}>{verdictStyle.emoji}</Text>
               <Text style={styles.verdictText}>{result.verdict}</Text>
            </View>

            {/* Score and Risk */}
            <View style={styles.scoreSection}>
               <HealthScoreGauge score={result.health_score} size={160} />
               <View style={styles.riskContainer}>
                  <RiskBadge riskLevel={result.risk_level} size="large" />
               </View>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
               <Text style={styles.summaryIcon}>💡</Text>
               <Text style={styles.summaryTitle}>AI Değerlendirmesi</Text>
               <Text style={styles.summaryText}>{result.summary_tr}</Text>
            </View>

            {/* Harmful Ingredients */}
            {result.harmful_ingredients && result.harmful_ingredients.length > 0 && (
               <View style={styles.ingredientsSection}>
                  <Text style={styles.sectionTitle}>
                     ⚠️ Dikkat Edilmesi Gereken Maddeler ({result.harmful_ingredients.length})
                  </Text>
                  {result.harmful_ingredients.map((ingredient, index) => (
                     <IngredientCard key={index} ingredient={ingredient} />
                  ))}
               </View>
            )}

            {/* Safe Message */}
            {(!result.harmful_ingredients || result.harmful_ingredients.length === 0) && (
               <View style={styles.safeCard}>
                  <Text style={styles.safeIcon}>🌿</Text>
                  <Text style={styles.safeTitle}>Zararlı Madde Tespit Edilmedi</Text>
                  <Text style={styles.safeText}>
                     Bu üründe bilinen zararlı katkı maddesi bulunamadı.
                  </Text>
               </View>
            )}
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      backgroundColor: '#FFFFFF',
   },
   backButton: {
      fontSize: 16,
      color: Colors.ui.primary,
      fontWeight: '600',
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
   },
   scrollView: {
      flex: 1,
   },
   content: {
      padding: 20,
      paddingBottom: 40,
   },
   timestamp: {
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 8,
   },
   productName: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1F2937',
      textAlign: 'center',
      marginBottom: 16,
   },
   verdictBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      marginBottom: 24,
   },
   verdictEmoji: {
      fontSize: 28,
      marginRight: 12,
   },
   verdictText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
   },
   scoreSection: {
      alignItems: 'center',
      marginBottom: 24,
   },
   riskContainer: {
      marginTop: 16,
   },
   summaryCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
   },
   summaryIcon: {
      fontSize: 32,
      marginBottom: 8,
   },
   summaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#6B7280',
      marginBottom: 8,
   },
   summaryText: {
      fontSize: 16,
      color: '#1F2937',
      lineHeight: 24,
   },
   ingredientsSection: {
      marginBottom: 24,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 16,
   },
   safeCard: {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: Colors.risk.low,
   },
   safeIcon: {
      fontSize: 48,
      marginBottom: 12,
   },
   safeTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: Colors.risk.low,
      marginBottom: 8,
   },
   safeText: {
      fontSize: 14,
      color: '#4B5563',
      textAlign: 'center',
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   loadingText: {
      fontSize: 16,
      color: '#6B7280',
   },
   errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   errorIcon: {
      fontSize: 64,
      marginBottom: 16,
   },
   errorText: {
      fontSize: 18,
      color: '#6B7280',
   },
});
