export interface HarmfulIngredient {
  name: string;
  reason: string;
}

export interface AnalysisResult {
  product_name: string;
  health_score: number;
  risk_level: 'Düşük' | 'Orta' | 'Yüksek';
  verdict: 'Tüketilebilir' | 'Dikkatli Tüket' | 'SAKIN TÜKETME';
  harmful_ingredients: HarmfulIngredient[];
  summary_tr: string;
}

export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek';
export type Verdict = 'Tüketilebilir' | 'Dikkatli Tüket' | 'SAKIN TÜKETME';
