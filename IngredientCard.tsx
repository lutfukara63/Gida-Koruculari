import { Colors } from '@/constants/theme';
import { HarmfulIngredient } from '@/types/analysis';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IngredientCardProps {
   ingredient: HarmfulIngredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
   return (
      <View style={styles.card}>
         <View style={styles.header}>
            <View style={styles.iconContainer}>
               <Text style={styles.icon}>⚠️</Text>
            </View>
            <Text style={styles.name}>{ingredient.name}</Text>
         </View>
         <Text style={styles.reason}>{ingredient.reason}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: Colors.risk.high,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
   },
   iconContainer: {
      marginRight: 10,
   },
   icon: {
      fontSize: 20,
   },
   name: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1F2937',
      flex: 1,
   },
   reason: {
      fontSize: 14,
      color: '#4B5563',
      lineHeight: 20,
      marginLeft: 30,
   },
});
