import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RiskBadgeProps {
   riskLevel: 'Düşük' | 'Orta' | 'Yüksek';
   size?: 'small' | 'medium' | 'large';
}

export function RiskBadge({ riskLevel, size = 'medium' }: RiskBadgeProps) {
   const getBackgroundColor = () => {
      switch (riskLevel) {
         case 'Düşük':
            return Colors.risk.low;
         case 'Orta':
            return Colors.risk.medium;
         case 'Yüksek':
            return Colors.risk.high;
         default:
            return '#6B7280';
      }
   };

   const getSize = () => {
      switch (size) {
         case 'small':
            return { paddingHorizontal: 8, paddingVertical: 4, fontSize: 12 };
         case 'large':
            return { paddingHorizontal: 20, paddingVertical: 10, fontSize: 18 };
         default:
            return { paddingHorizontal: 14, paddingVertical: 6, fontSize: 14 };
      }
   };

   const sizeStyles = getSize();

   return (
      <View style={[styles.badge, { backgroundColor: getBackgroundColor(), paddingHorizontal: sizeStyles.paddingHorizontal, paddingVertical: sizeStyles.paddingVertical }]}>
         <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>
            {riskLevel === 'Düşük' && '✓ '}
            {riskLevel === 'Orta' && '⚠ '}
            {riskLevel === 'Yüksek' && '✕ '}
            {riskLevel} Risk
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   badge: {
      borderRadius: 20,
      alignSelf: 'flex-start',
   },
   text: {
      color: '#FFFFFF',
      fontWeight: '700',
   },
});
