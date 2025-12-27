import { HealthScoreGauge } from '@/components/HealthScoreGauge';
import { IngredientCard } from '@/components/IngredientCard';
import { RiskBadge } from '@/components/RiskBadge';
import { Colors } from '@/constants/theme';
import { analyzeProductImage } from '@/services/gemini';
import { saveToHistory } from '@/services/storage';
import { AnalysisResult } from '@/types/analysis';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AnalysisScreen() {
   const { imageBase64 } = useLocalSearchParams<{ imageBase64: string }>();
   const [loading, setLoading] = useState(true);
   const [result, setResult] = useState<AnalysisResult | null>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (imageBase64) {
         analyzeImage();
      }
   }, [imageBase64]);

   const analyzeImage = async () => {
      setLoading(true);
      setError(null);
      try {
         const analysisResult = await analyzeProductImage(imageBase64);
         setResult(analysisResult);
         // Save to history
         await saveToHistory(analysisResult, imageBase64);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
         setLoading(false);
      }
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
         <SafeAreaView style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
               <ActivityIndicator size="large" color={Colors.ui.primary} />
               <Text style={styles.loadingTitle}>Analiz Ediliyor...</Text>
               <Text style={styles.loadingSubtitle}>
                  İçindekiler listesi okunuyor ve değerlendiriliyor
               </Text>
               <View style={styles.loadingSteps}>
                  <Text style={styles.loadingStep}>🔍 Metin tanıma...</Text>
                  <Text style={styles.loadingStep}>🧪 Madde analizi...</Text>
                  <Text style={styles.loadingStep}>📊 Sağlık değerlendirmesi...</Text>
               </View>
            </View>
         </SafeAreaView>
      );
   }

   if (error) {
      return (
         <SafeAreaView style={styles.errorContainer}>
            <View style={styles.errorContent}>
               <Text style={styles.errorIcon}>😕</Text>
               <Text style={styles.errorTitle}>Analiz Başarısız</Text>
               <Text style={styles.errorMessage}>{error}</Text>
               <TouchableOpacity style={styles.retryButton} onPress={analyzeImage}>
                  <Text style={styles.retryButtonText}>Tekrar Dene</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Text style={styles.backButtonText}>Geri Dön</Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
      );
   }

   if (!result) {
      return null;
   }

   const verdictStyle = getVerdictStyle(result.verdict);

   return (
      <SafeAreaView style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace('/')}>
               <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Analiz Sonucu</Text>
            <View style={{ width: 32 }} />
         </View>

         <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
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

            {/* Scan Another Button */}
            <TouchableOpacity
               style={styles.scanAnotherButton}
               onPress={() => router.replace('/')}
            >
               <Text style={styles.scanAnotherText}>📷 Başka Ürün Tara</Text>
            </TouchableOpacity>
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
   closeButton: {
      fontSize: 24,
      color: '#6B7280',
      padding: 4,
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
   scanAnotherButton: {
      backgroundColor: Colors.ui.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
   },
   scanAnotherText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   // Loading styles
   loadingContainer: {
      flex: 1,
      backgroundColor: '#1F2937',
   },
   loadingContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
   },
   loadingTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
      marginTop: 24,
      marginBottom: 8,
   },
   loadingSubtitle: {
      fontSize: 16,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 32,
   },
   loadingSteps: {
      alignItems: 'flex-start',
   },
   loadingStep: {
      fontSize: 16,
      color: '#6B7280',
      marginVertical: 4,
   },
   // Error styles
   errorContainer: {
      flex: 1,
      backgroundColor: '#1F2937',
   },
   errorContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
   },
   errorIcon: {
      fontSize: 64,
      marginBottom: 24,
   },
   errorTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 12,
   },
   errorMessage: {
      fontSize: 16,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
   },
   retryButton: {
      backgroundColor: Colors.ui.primary,
      paddingHorizontal: 48,
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 16,
   },
   retryButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   backButton: {
      padding: 12,
   },
   backButtonText: {
      color: '#9CA3AF',
      fontSize: 16,
   },
});
