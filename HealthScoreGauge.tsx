import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HealthScoreGaugeProps {
   score: number;
   size?: number;
}

export function HealthScoreGauge({ score, size = 140 }: HealthScoreGaugeProps) {
   const getScoreColor = () => {
      if (score >= 8) return Colors.score.excellent;
      if (score >= 6) return Colors.score.good;
      if (score >= 4) return Colors.score.moderate;
      if (score >= 2) return Colors.score.poor;
      return Colors.score.bad;
   };

   const getScoreLabel = () => {
      if (score >= 8) return 'Çok Sağlıklı';
      if (score >= 6) return 'Sağlıklı';
      if (score >= 4) return 'Orta';
      if (score >= 2) return 'Riskli';
      return 'Zararlı';
   };

   const color = getScoreColor();

   return (
      <View style={[styles.container, { width: size, height: size }]}>
         <View style={[styles.outerRing, { borderColor: color, width: size, height: size }]}>
            <View style={[styles.innerCircle, { width: size - 20, height: size - 20 }]}>
               <Text style={[styles.scoreText, { color, fontSize: size * 0.35 }]}>{score}</Text>
               <Text style={styles.maxScore}>/10</Text>
            </View>
         </View>
         <Text style={[styles.label, { color }]}>{getScoreLabel()}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   outerRing: {
      borderRadius: 999,
      borderWidth: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
   },
   innerCircle: {
      borderRadius: 999,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   scoreText: {
      fontWeight: '800',
   },
   maxScore: {
      fontSize: 14,
      color: '#9CA3AF',
      fontWeight: '500',
      marginTop: -4,
   },
   label: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 12,
   },
});
