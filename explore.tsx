import { RiskBadge } from '@/components/RiskBadge';
import { Colors } from '@/constants/theme';
import { clearHistory, deleteHistoryItem, formatTimestamp, getHistory, HistoryItem } from '@/services/storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HistoryScreen() {
   const [history, setHistory] = useState<HistoryItem[]>([]);
   const [loading, setLoading] = useState(true);
   const insets = useSafeAreaInsets();

   useFocusEffect(
      useCallback(() => {
         loadHistory();
      }, [])
   );

   const loadHistory = async () => {
      setLoading(true);
      const items = await getHistory();
      setHistory(items);
      setLoading(false);
   };

   const handleClearHistory = () => {
      Alert.alert(
         'Geçmişi Temizle',
         'Tüm tarama geçmişini silmek istediğinize emin misiniz?',
         [
            { text: 'İptal', style: 'cancel' },
            {
               text: 'Temizle',
               style: 'destructive',
               onPress: async () => {
                  await clearHistory();
                  setHistory([]);
               },
            },
         ]
      );
   };

   const handleDeleteItem = (id: string) => {
      Alert.alert(
         'Kaydı Sil',
         'Bu tarama kaydını silmek istediğinize emin misiniz?',
         [
            { text: 'İptal', style: 'cancel' },
            {
               text: 'Sil',
               style: 'destructive',
               onPress: async () => {
                  await deleteHistoryItem(id);
                  setHistory(prev => prev.filter(item => item.id !== id));
               },
            },
         ]
      );
   };

   const handleOpenDetail = (id: string) => {
      router.push({
         pathname: '/history-detail',
         params: { id },
      });
   };

   const getScoreColor = (score: number) => {
      if (score >= 7) return Colors.risk.low;
      if (score >= 4) return Colors.risk.medium;
      return Colors.risk.high;
   };

   const renderItem = ({ item }: { item: HistoryItem }) => (
      <TouchableOpacity
         style={styles.historyCard}
         onPress={() => handleOpenDetail(item.id)}
         onLongPress={() => handleDeleteItem(item.id)}
         activeOpacity={0.7}
      >
         <View style={styles.cardHeader}>
            <View style={styles.productInfo}>
               <Text style={styles.productName} numberOfLines={1}>
                  {item.result.product_name}
               </Text>
               <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
            </View>
            <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(item.result.health_score) }]}>
               <Text style={styles.scoreText}>{item.result.health_score}</Text>
            </View>
         </View>

         <View style={styles.cardBody}>
            <RiskBadge riskLevel={item.result.risk_level} size="small" />
            <Text style={styles.verdict}>{item.result.verdict}</Text>
         </View>

         {item.result.harmful_ingredients && item.result.harmful_ingredients.length > 0 && (
            <Text style={styles.harmfulCount}>
               ⚠️ {item.result.harmful_ingredients.length} zararlı madde tespit edildi
            </Text>
         )}

         <Text style={styles.summary} numberOfLines={2}>
            {item.result.summary_tr}
         </Text>

         <Text style={styles.actionHint}>Detay için dokun • Silmek için basılı tut</Text>
      </TouchableOpacity>
   );

   if (loading) {
      return (
         <SafeAreaView style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
               <Text style={styles.headerTitle}>Tarama Geçmişi</Text>
            </View>
            <View style={styles.loadingContainer}>
               <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
            <Text style={styles.headerTitle}>Tarama Geçmişi</Text>
            {history.length > 0 && (
               <TouchableOpacity onPress={handleClearHistory}>
                  <Text style={styles.clearButton}>Temizle</Text>
               </TouchableOpacity>
            )}
         </View>

         {history.length === 0 ? (
            <View style={styles.emptyContainer}>
               <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📋</Text>
                  <Text style={styles.emptyTitle}>Henüz Tarama Yok</Text>
                  <Text style={styles.emptyText}>
                     Taradığınız ürünler burada görünecek.{'\n'}
                     Ana sayfadan ilk taramanızı yapın!
                  </Text>
               </View>
            </View>
         ) : (
            <FlatList
               data={history}
               keyExtractor={(item) => item.id}
               renderItem={renderItem}
               contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
               showsVerticalScrollIndicator={false}
            />
         )}

         <View style={styles.statsBar}>
            <Text style={styles.statsText}>
               Toplam {history.length} tarama
            </Text>
         </View>
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
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1F2937',
   },
   clearButton: {
      fontSize: 14,
      color: Colors.risk.high,
      fontWeight: '600',
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
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
   },
   emptyState: {
      alignItems: 'center',
   },
   emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
   },
   emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 8,
   },
   emptyText: {
      fontSize: 14,
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: 22,
   },
   listContent: {
      padding: 16,
   },
   historyCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
   },
   cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
   },
   productInfo: {
      flex: 1,
      marginRight: 12,
   },
   productName: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 4,
   },
   timestamp: {
      fontSize: 12,
      color: '#9CA3AF',
   },
   scoreCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
   },
   scoreText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
   },
   cardBody: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
   },
   verdict: {
      fontSize: 13,
      color: '#4B5563',
      fontWeight: '500',
   },
   harmfulCount: {
      fontSize: 13,
      color: Colors.risk.high,
      marginBottom: 8,
   },
   summary: {
      fontSize: 13,
      color: '#6B7280',
      lineHeight: 18,
   },
   actionHint: {
      fontSize: 11,
      color: '#D1D5DB',
      textAlign: 'center',
      marginTop: 8,
   },
   statsBar: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      alignItems: 'center',
   },
   statsText: {
      fontSize: 13,
      color: '#9CA3AF',
   },
});
