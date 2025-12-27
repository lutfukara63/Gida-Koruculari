import { AnalysisResult } from '@/types/analysis';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `ROLE:
Sen uzman bir gıda mühendisi, toksikolog ve beslenme uzmanısın. Görevin, sana gönderilen ürün ambalajı fotoğraflarını analiz etmek ve insan sağlığına etkilerini değerlendirmektir.

TASK:
1. Görüntüdeki "İçindekiler" (Ingredients) metnini oku.
2. Zararlı katkı maddelerini, yapay tatlandırıcıları, tehlikeli koruyucuları (Örn: MSG, Aspartam, Sodyum Benzoat, Palm Yağı, Yüksek Fruktozlu Mısır Şurubu vb.) tespit et.
3. Ürüne 10 üzerinden bir sağlık puanı ver (10: Çok Sağlıklı, 0: Çok Zararlı).
4. Kullanıcıya net bir tavsiye ver (Tüket veya Uzak Dur).

OUTPUT FORMAT (JSON ONLY):
Cevabını sadece aşağıdaki JSON formatında ver, başka hiçbir metin ekleme:

{
  "product_name": "Tahmin edilen ürün adı veya türü",
  "health_score": 0-10 arası sayı,
  "risk_level": "Düşük" | "Orta" | "Yüksek",
  "verdict": "Tüketilebilir" | "Dikkatli Tüket" | "SAKIN TÜKETME",
  "harmful_ingredients": [
    {
      "name": "Maddenin adı (Örn: E102 Tartrazin)",
      "reason": "Neden zararlı olduğu (kısa açıklama)"
    }
  ],
  "summary_tr": "Kullanıcı için 2 cümlelik Türkçe özet. Neden yemeli veya yememeli, samimi ve uyarıcı bir dille yaz."
}`;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function analyzeProductImage(base64Image: string): Promise<AnalysisResult> {
   if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key bulunamadı. Lütfen .env dosyasına EXPO_PUBLIC_GEMINI_API_KEY ekleyin.');
   }

   const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

   const imagePart = {
      inlineData: {
         data: base64Image,
         mimeType: 'image/jpeg',
      },
   };

   try {
      const result = await model.generateContent([
         SYSTEM_PROMPT,
         imagePart,
      ]);

      const response = result.response;
      const text = response.text();

      // JSON parse - markdown code block varsa temizle
      let jsonText = text.trim();
      if (jsonText.startsWith('```json')) {
         jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith('```')) {
         jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith('```')) {
         jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();

      const analysisResult: AnalysisResult = JSON.parse(jsonText);
      return analysisResult;
   } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Ürün analiz edilemedi. Lütfen fotoğrafın net olduğundan emin olun ve tekrar deneyin.');
   }
}

export function getRiskColor(riskLevel: string): string {
   switch (riskLevel) {
      case 'Düşük':
         return '#22C55E'; // Green
      case 'Orta':
         return '#F59E0B'; // Amber
      case 'Yüksek':
         return '#EF4444'; // Red
      default:
         return '#6B7280'; // Gray
   }
}

export function getVerdictColor(verdict: string): string {
   switch (verdict) {
      case 'Tüketilebilir':
         return '#22C55E';
      case 'Dikkatli Tüket':
         return '#F59E0B';
      case 'SAKIN TÜKETME':
         return '#EF4444';
      default:
         return '#6B7280';
   }
}

export function getScoreColor(score: number): string {
   if (score >= 7) return '#22C55E';
   if (score >= 4) return '#F59E0B';
   return '#EF4444';
}
