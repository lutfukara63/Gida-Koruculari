/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
   light: {
      text: '#11181C',
      background: '#fff',
      tint: tintColorLight,
      icon: '#687076',
      tabIconDefault: '#687076',
      tabIconSelected: tintColorLight,
   },
   dark: {
      text: '#ECEDEE',
      background: '#151718',
      tint: tintColorDark,
      icon: '#9BA1A6',
      tabIconDefault: '#9BA1A6',
      tabIconSelected: tintColorDark,
   },
   // LabelGuard specific colors
   risk: {
      low: '#22C55E',      // Green - Safe
      medium: '#F59E0B',   // Amber - Caution
      high: '#EF4444',     // Red - Danger
   },
   score: {
      excellent: '#22C55E', // 8-10
      good: '#84CC16',      // 6-7
      moderate: '#F59E0B',  // 4-5
      poor: '#F97316',      // 2-3
      bad: '#EF4444',       // 0-1
   },
   ui: {
      primary: '#6366F1',   // Indigo
      secondary: '#8B5CF6', // Violet
      card: '#1F2937',
      cardLight: '#F3F4F6',
      border: '#374151',
      borderLight: '#E5E7EB',
   },
};

export const Fonts = Platform.select({
   ios: {
      /** iOS `UIFontDescriptorSystemDesignDefault` */
      sans: 'system-ui',
      /** iOS `UIFontDescriptorSystemDesignSerif` */
      serif: 'ui-serif',
      /** iOS `UIFontDescriptorSystemDesignRounded` */
      rounded: 'ui-rounded',
      /** iOS `UIFontDescriptorSystemDesignMonospaced` */
      mono: 'ui-monospace',
   },
   default: {
      sans: 'normal',
      serif: 'serif',
      rounded: 'normal',
      mono: 'monospace',
   },
   web: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
   },
});
