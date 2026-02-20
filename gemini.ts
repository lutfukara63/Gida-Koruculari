import { AnalysisResult } from '@/types/analysis';
import axios from 'axios';

// API endpoint should point to your backend server
const BACKEND_API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const SYSTEM_PROMPT = `ROLE: Sen uzman bir gıda mühendisi, toksikolog ve beslenme uzmanısın. Görevin, sana gönderilen ürün ambalajı fotoğraflarını analiz etmek ve insan sağlığına etkilerini değerlendirmektir.
TASK: 1. Görüntüdeki "İçindekiler" (Ingredients) metnini oku. 2. Zararlı katkı maddelerini, yapay tatlandırıcıları, tehlikeli koruyucuları (Örn: MSG, Aspartam, Sodyum Benzoat, Palm Yağı, Yüksek Fruktozlu Mısır Şurubu vb.) tespit et. 3. Ürüne 10 üzerinden bir sağlık puanı ver (10: Çok Sağlıklı, 0: Çok Zararlı). 4. Kullanıcıya net bir tavsiye ver (Tüket veya Uzak Dur).
OUTPUT FORMAT (JSON ONLY): Cevabını sadece aşağıdaki JSON formatında ver, başka hiçbir metin ekleme: { "product_name": "Tahmin edilen ürün adı veya türü", "health_score": 0-10 arası sayı, "risk_level": "Düşük" | "Orta" | "Yüksek", "verdict": "Tüketilebilir" | "Dikkatli Tüket" | "SAKIN TÜKETME", "harmful_ingredients": [ { "name": "Maddenin adı (Örn: E102 Tartrazin)", "reason": "Neden zararlı olduğu (kısa açıklama)" } ], "summary_tr": "Kullanıcı için 2 cümlelik Türkçe özet. Neden yemeli veya yememeli, samimi ve uyarıcı bir dille yaz." }
`;

/**
 * Analyzes a product image by sending it to the backend server
 * The actual API key is kept secure on the backend
 * @param base64Image - Base64 encoded image string
 * @returns Analysis result from backend
 */
export async function analyzeProductImage(base64Image: string): Promise<AnalysisResult> {
 if (!base64Image) {
 throw new Error('Görüntü verisi bulunamadı.');
 }
 try {
 const response = await axios.post<AnalysisResult>(
 `${BACKEND_API_URL}/api/analyze`,
 {
 image: base64Image,
 systemPrompt: SYSTEM_PROMPT,
 },
 {
 timeout: 30000,
 headers: {
 'Content-Type': 'application/json',
 },
 }
 );
 if (!response.data) {
 throw new Error('Sunucudan yanıt alınamadı.');
 }
 return response.data;
 } catch (error) {
 if (axios.isAxiosError(error)) {
 if (error.response?.status === 401) {
 throw new Error('Yetkilendirme hatası. Lütfen daha sonra tekrar deneyiniz.');
 } else if (error.response?.status === 429) {
 throw new Error('Çok fazla istek gönderildi. Lütfen biraz bekleyiniz.');
 } else if (error.code === 'ECONNABORTED') {
 throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyiniz.');
 }
 throw new Error(error.response?.data?.message || 'API hatası oluştu.');
 }
 throw new Error('Görüntü analiz edilemedi. Lütfen tekrar deneyiniz.');
 }
}