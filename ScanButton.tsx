import { Colors } from '@/constants/theme';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ScanButtonProps {
   onCameraPress: () => void;
   onGalleryPress: () => void;
}

export function ScanButton({ onCameraPress, onGalleryPress }: ScanButtonProps) {
   const [showOptions, setShowOptions] = React.useState(false);

   return (
      <>
         <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setShowOptions(true)}
            activeOpacity={0.8}
         >
            <View style={styles.buttonInner}>
               <Text style={styles.scanIcon}>📷</Text>
               <Text style={styles.buttonText}>Ürün Tara</Text>
            </View>
         </TouchableOpacity>

         <Modal
            visible={showOptions}
            transparent
            animationType="fade"
            onRequestClose={() => setShowOptions(false)}
         >
            <Pressable style={styles.overlay} onPress={() => setShowOptions(false)}>
               <View style={styles.optionsContainer}>
                  <Text style={styles.optionsTitle}>Nasıl taramak istersiniz?</Text>

                  <TouchableOpacity
                     style={styles.optionButton}
                     onPress={() => {
                        setShowOptions(false);
                        onCameraPress();
                     }}
                  >
                     <Text style={styles.optionIcon}>📸</Text>
                     <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Kamera ile Çek</Text>
                        <Text style={styles.optionDesc}>Ürün etiketini şimdi fotoğrafla</Text>
                     </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.optionButton}
                     onPress={() => {
                        setShowOptions(false);
                        onGalleryPress();
                     }}
                  >
                     <Text style={styles.optionIcon}>🖼️</Text>
                     <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Galeriden Seç</Text>
                        <Text style={styles.optionDesc}>Daha önce çekilmiş fotoğrafı kullan</Text>
                     </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.cancelButton}
                     onPress={() => setShowOptions(false)}
                  >
                     <Text style={styles.cancelText}>İptal</Text>
                  </TouchableOpacity>
               </View>
            </Pressable>
         </Modal>
      </>
   );
}

const styles = StyleSheet.create({
   mainButton: {
      backgroundColor: Colors.ui.primary,
      borderRadius: 24,
      paddingVertical: 20,
      paddingHorizontal: 48,
      shadowColor: Colors.ui.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
   },
   buttonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
   },
   scanIcon: {
      fontSize: 28,
   },
   buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '700',
   },
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
   },
   optionsContainer: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
   },
   optionsTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1F2937',
      textAlign: 'center',
      marginBottom: 24,
   },
   optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
   },
   optionIcon: {
      fontSize: 32,
      marginRight: 16,
   },
   optionTextContainer: {
      flex: 1,
   },
   optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 2,
   },
   optionDesc: {
      fontSize: 13,
      color: '#6B7280',
   },
   cancelButton: {
      marginTop: 8,
      paddingVertical: 14,
      alignItems: 'center',
   },
   cancelText: {
      fontSize: 16,
      color: '#6B7280',
      fontWeight: '500',
   },
});
