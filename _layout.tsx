import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarIcon({ name, color }: { name: string; color: string }) {
   const icons: { [key: string]: string } = {
      home: '🏠',
      history: '📋',
   };
   return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
         <Text style={{ fontSize: 24 }}>{icons[name] || '📱'}</Text>
      </View>
   );
}

export default function TabLayout() {
   const colorScheme = useColorScheme();
   const insets = useSafeAreaInsets();

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors.ui.primary,
            tabBarInactiveTintColor: '#9CA3AF',
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
               backgroundColor: '#FFFFFF',
               borderTopWidth: 1,
               borderTopColor: '#E5E7EB',
               paddingTop: 8,
               paddingBottom: Math.max(insets.bottom, 12),
               height: 65 + Math.max(insets.bottom, 0),
            },
            tabBarLabelStyle: {
               fontSize: 12,
               fontWeight: '600',
            },
         }}>
         <Tabs.Screen
            name="index"
            options={{
               title: 'Ana Sayfa',
               tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
         />
         <Tabs.Screen
            name="explore"
            options={{
               title: 'Geçmiş',
               tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
            }}
         />
      </Tabs>
   );
}
