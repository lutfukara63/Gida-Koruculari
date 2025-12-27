import { Colors } from '@/constants/theme';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
   const [permission, requestPermission] = useCameraPermissions();
   const [facing, setFacing] = useState<CameraType>('back');
   const [isTakingPhoto, setIsTakingPhoto] = useState(false);
   const cameraRef = useRef<CameraView>(null);

   if (!permission) {
      return (
         <View style={styles.container}>
            <Text style={styles.message}>Kamera izni yükleniyor...</Text>
         </View>
      );
   }

   if (!permission.granted) {
      return (
         <SafeAreaView style={styles.permissionContainer}>
            <View style={styles.permissionContent}>
               <Text style={styles.permissionIcon}>📷</Text>
               <Text style={styles.permissionTitle}>Kamera İzni Gerekli</Text>
               <Text style={styles.permissionText}>
                  Ürün etiketlerini tarayabilmek için kamera erişimine ihtiyacımız var.
               </Text>
               <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                  <Text style={styles.permissionButtonText}>İzin Ver</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                  <Text style={styles.cancelButtonText}>Vazgeç</Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
      );
   }

   const takePicture = async () => {
      if (cameraRef.current && !isTakingPhoto) {
         setIsTakingPhoto(true);
         try {
            const photo = await cameraRef.current.takePictureAsync({
               quality: 0.8,
               base64: true, // Get base64 directly from camera
            });

            if (photo?.base64) {
               // Navigate to analysis screen with base64 image
               router.push({
                  pathname: '/analysis',
                  params: { imageBase64: photo.base64 },
               });
            } else {
               throw new Error('Fotoğraf base64 formatına dönüştürülemedi');
            }
         } catch (error) {
            console.error('Error taking picture:', error);
            alert('Fotoğraf çekilemedi. Lütfen tekrar deneyin.');
         } finally {
            setIsTakingPhoto(false);
         }
      }
   };

   return (
      <View style={styles.container}>
         <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
         >
            {/* Overlay with frame guide */}
            <View style={styles.overlay}>
               <SafeAreaView style={styles.topBar}>
                  <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                     <Text style={styles.backButtonText}>← Geri</Text>
                  </TouchableOpacity>
               </SafeAreaView>

               <View style={styles.frameContainer}>
                  <View style={styles.frame}>
                     <View style={[styles.corner, styles.topLeft]} />
                     <View style={[styles.corner, styles.topRight]} />
                     <View style={[styles.corner, styles.bottomLeft]} />
                     <View style={[styles.corner, styles.bottomRight]} />
                  </View>
                  <Text style={styles.instruction}>
                     İçindekiler listesini çerçeve içine alın
                  </Text>
               </View>

               <View style={styles.controls}>
                  <TouchableOpacity
                     style={[styles.captureButton, isTakingPhoto && styles.captureButtonDisabled]}
                     onPress={takePicture}
                     disabled={isTakingPhoto}
                  >
                     <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                  <Text style={styles.captureHint}>
                     {isTakingPhoto ? 'Çekiliyor...' : 'Fotoğraf Çek'}
                  </Text>
               </View>
            </View>
         </CameraView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000',
   },
   camera: {
      flex: 1,
   },
   overlay: {
      flex: 1,
      backgroundColor: 'transparent',
   },
   topBar: {
      paddingHorizontal: 16,
      paddingTop: 8,
   },
   backButton: {
      padding: 12,
   },
   backButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   frameContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
   },
   frame: {
      width: '100%',
      aspectRatio: 1.5,
      position: 'relative',
   },
   corner: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderColor: Colors.ui.primary,
      borderWidth: 3,
   },
   topLeft: {
      top: 0,
      left: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderTopLeftRadius: 8,
   },
   topRight: {
      top: 0,
      right: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderTopRightRadius: 8,
   },
   bottomLeft: {
      bottom: 0,
      left: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomLeftRadius: 8,
   },
   bottomRight: {
      bottom: 0,
      right: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomRightRadius: 8,
   },
   instruction: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
      marginTop: 24,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
   },
   controls: {
      paddingBottom: 50,
      alignItems: 'center',
   },
   captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: '#FFFFFF',
   },
   captureButtonDisabled: {
      opacity: 0.5,
   },
   captureButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
   },
   captureHint: {
      color: '#FFFFFF',
      fontSize: 14,
      marginTop: 12,
      fontWeight: '500',
   },
   message: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
      padding: 20,
   },
   permissionContainer: {
      flex: 1,
      backgroundColor: '#1F2937',
   },
   permissionContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
   },
   permissionIcon: {
      fontSize: 64,
      marginBottom: 24,
   },
   permissionTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 12,
      textAlign: 'center',
   },
   permissionText: {
      fontSize: 16,
      color: '#9CA3AF',
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
   },
   permissionButton: {
      backgroundColor: Colors.ui.primary,
      paddingHorizontal: 48,
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 16,
   },
   permissionButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
   },
   cancelButton: {
      padding: 12,
   },
   cancelButtonText: {
      color: '#9CA3AF',
      fontSize: 16,
   },
});
