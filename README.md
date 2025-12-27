
Önkoşullar
- Node.js (LTS önerilir)
- npm veya yarn
- Expo CLI: `npm install -g expo-cli` veya kullanmak istemiyorsanız `npx expo` komutları çalışır.

Kurulum
1. Depoyu klonlayın:
   git clone https://github.com/lutfukara63/Gida-Koruculari.git
2. Klasöre girin ve bağımlılıkları yükleyin:
   cd Gida-Koruculari
   npm install

Çalıştırma
- Geliştirme sunucusunu başlatmak için:
  `npx expo start`
- Android için: `npx expo run:android` (emülatör veya bağlı cihaz)
- iOS için: `npx expo run:ios` (macOS + Xcode)
- Web için: `npx expo start --web`

Proje yapısı
- app/  — Expo Router ile uygulama kodu (file-based routing)
- assets/ — görseller, fontlar
- tsconfig.json — TypeScript yapılandırması
- README.md — proje özeti ve talimatlar

Değerlendirme kontrol listesi 
- Uygulama problemsiz çalışıyor ve istenen akış tamamlanıyor. (Çalıştırma talimatları yukarıda)
- Kod okunabilir, typescript kullanımı ve tip kontrolleri mevcut.
- Kullanıcı arayüzü temel seviyede düzenli ve kullanıcı dostu.
- Proje dokümantasyonu; README, CONTRIBUTING, LICENSE, CHANGELOG eklendi.

- Canlı demo (telefon ekran paylaşımı veya emülatör ile) — uygulamanın OCR ve fotoğraf alma işlevselliğini gösterin.
- Kod üzerinden kısa walkthrough — özellikle OCR entegrasyonu, kamera izinleri ve dosya sistemi kullanımı.

İletişim
- Repo sahibi: https://github.com/lutfukara63

Licence
Bu repo ile birlikte eklenecek LICENSE dosyasına bakınız.

---
