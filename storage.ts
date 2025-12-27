import { AnalysisResult } from '@/types/analysis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'scan_history';

export interface HistoryItem {
   id: string;
   result: AnalysisResult;
   timestamp: number;
   imagePreview?: string; // Optional: first 100 chars of base64 for thumbnail
}

export async function saveToHistory(result: AnalysisResult, imageBase64?: string): Promise<void> {
   try {
      const history = await getHistory();
      const newItem: HistoryItem = {
         id: Date.now().toString(),
         result,
         timestamp: Date.now(),
         imagePreview: imageBase64?.substring(0, 500), // Small preview
      };

      // Add to beginning of array (newest first)
      history.unshift(newItem);

      // Keep only last 50 items
      const trimmedHistory = history.slice(0, 50);

      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
   } catch (error) {
      console.error('Error saving to history:', error);
   }
}

export async function getHistory(): Promise<HistoryItem[]> {
   try {
      const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
      if (historyJson) {
         return JSON.parse(historyJson);
      }
      return [];
   } catch (error) {
      console.error('Error getting history:', error);
      return [];
   }
}

export async function clearHistory(): Promise<void> {
   try {
      await AsyncStorage.removeItem(HISTORY_KEY);
   } catch (error) {
      console.error('Error clearing history:', error);
   }
}

export async function deleteHistoryItem(id: string): Promise<void> {
   try {
      const history = await getHistory();
      const filteredHistory = history.filter(item => item.id !== id);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
   } catch (error) {
      console.error('Error deleting history item:', error);
   }
}

export function formatTimestamp(timestamp: number): string {
   const date = new Date(timestamp);
   const now = new Date();
   const diffMs = now.getTime() - date.getTime();
   const diffMins = Math.floor(diffMs / 60000);
   const diffHours = Math.floor(diffMs / 3600000);
   const diffDays = Math.floor(diffMs / 86400000);

   if (diffMins < 1) return 'Az önce';
   if (diffMins < 60) return `${diffMins} dakika önce`;
   if (diffHours < 24) return `${diffHours} saat önce`;
   if (diffDays < 7) return `${diffDays} gün önce`;

   return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });
}
