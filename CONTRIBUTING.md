# Katkıda Bulunma Rehberi

Teşekkürler — projeye katkıda bulunmak istiyorsunuz! Aşağıdaki adımlar ekip içindeki standartları korumak için hazırlanmıştır.

1. Issue açma
	- Hata/özellik için uygun template kullanın.
	- Title kısa ve açıklayıcı olsun.
	- Tek bir amaca odaklı issue açın.

2. Branch ismi
	- `feature/<kısa-açıklama>`
	- `fix/<kısa-açıklama>`
	- `chore/<kısa-açıklama>`

3. Kodlama standartları
	- Python: Black + isort
	- Linting: flake8 (opsiyonel CI'de)
	- Test ekleyin: pytest kullanın; kritik mantık için unit test şart.

4. Commit mesajları
	- Kısa ve açıklayıcı olun. Örnek: "feature: add ingredient parser for parentheses"
	- Tek PR içinde birden fazla konseptten kaçının.

5. Pull Request
	- İlgili issue numarasını bağlayın (ör. Fixes #12).
	- Değişikliklerin kısa özeti ve test adımları ekleyin.
	- PR açıklamasına reviewer önerileri yazın.

6. Kod sahibi ve review
	- `CODEOWNERS` dosyasına göre review atanır.
	- En az 1 onay gerekir; kritik değişikliklerde 2 onay istenebilir.

7. Veri ve modeller
	- Ham veri repoya eklenmez. Küçük örnek veriler `dataset/sample/` içinde olabilir.
	- Model checkpoint'leri harici depolarda saklanmalı; repo'ya büyük dosya pushlanmamalı.

8. Güvenlik
	- API anahtarlarını veya gizli bilgileri repoya commit etmeyin.
	- `.env.example` kullanın.

Teşekkürler!
