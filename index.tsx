import { ScanButton } from '@/components/ScanButton';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
   const insets = useSafeAreaInsets();

   const handleCameraPress = () => {
      router.push('/camera');
   };

   const handleGalleryPress = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
         alert('Galeriye erişim izni gerekli!');
         return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ['images'],
         quality: 0.8,
         allowsEditing: true,
         base64: true, // Get base64 directly from ImagePicker
      });

      if (!result.canceled && result.assets[0]) {
         const base64 = result.assets[0].base64;
         if (base64) {
            router.push({
               pathname: '/analysis',
               params: { imageBase64: base64 },
            });
         } else {
            alert('Görsel base64 formatına dönüştürülemedi. Lütfen tekrar deneyin.');
         }
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" />

         {/* Header */}
         <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <Text style={styles.logo}>🛡️</Text>
            <Text style={styles.appName}>LabelGuard</Text>
            <Text style={styles.tagline}>AI Destekli Ürün Analizi</Text>
         </View>

         {/* Main Content */}
         <View style={styles.content}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
               <Text style={styles.heroTitle}>
                  Ürünün sağlığa{'\n'}zararlı mı?
               </Text>
               <Text style={styles.heroSubtitle}>
                  İçindekiler listesinin fotoğrafını çek,{'\n'}
                  AI anında analiz etsin.
               </Text>
            </View>

            {/* Features */}
            <View style={styles.features}>
               <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>⚡</Text>
                  <Text style={styles.featureText}>3 saniyede analiz</Text>
               </View>
               <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🎯</Text>
                  <Text style={styles.featureText}>Zararlı madde tespiti</Text>
               </View>
               <View style={styles.featureItem}>
                  <Text style={styles.featureIcon}>🌿</Text>
                  <Text style={styles.featureText}>Sağlık puanlaması</Text>
               </View>
            </View>

            {/* Scan Button */}
            <View style={styles.buttonContainer}>
               <ScanButton
                  onCameraPress={handleCameraPress}
                  onGalleryPress={handleGalleryPress}
               />
            </View>

            {/* Info */}
            <Text style={styles.infoText}>
               E-kodları, katkı maddelerini ve alerjenleri anında öğren
            </Text>
         </View>

         {/* Footer */}
         <View style={styles.footer}>
            <Text style={styles.footerText}>
               Powered by Google Gemini 2.5 Flash
            </Text>
            <Text style={styles.footerText}>
               Made by Furkan Ermağ
            </Text>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
   },
   header: {
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 16,
   },
   logo: {
      fontSize: 48,
      marginBottom: 8,
   },
   appName: {
      fontSize: 28,
      fontWeight: '800',
      color: '#1F2937',
      letterSpacing: -0.5,
   },
   tagline: {
      fontSize: 14,
      color: '#6B7280',
      marginTop: 4,
   },
   content: {
      flex: 1,
      paddingHorizontal: 24,
   },
   heroSection: {
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 40,
   },
   heroTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1F2937',
      textAlign: 'center',
      lineHeight: 40,
      marginBottom: 16,
   },
   heroSubtitle: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: 24,
   },
   features: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 48,
      paddingHorizontal: 8,
   },
   featureItem: {
      alignItems: 'center',
   },
   featureIcon: {
      fontSize: 28,
      marginBottom: 8,
   },
   featureText: {
      fontSize: 12,
      color: '#4B5563',
      fontWeight: '500',
      textAlign: 'center',
   },
   buttonContainer: {
      alignItems: 'center',
      marginBottom: 24,
   },
   infoText: {
      fontSize: 13,
      color: '#9CA3AF',
      textAlign: 'center',
   },
   footer: {
      paddingVertical: 20,
      alignItems: 'center',
   },
   footerText: {
      fontSize: 12,
      color: '#D1D5DB',
   },
});
