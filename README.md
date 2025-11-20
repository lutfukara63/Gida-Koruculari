# Gıda İçerik Analizi - Ekip Projesi

Bu repo, ambalaj üzerindeki içerik/yazıları OCR ile okuyup, içerik listesini ayrıştırarak ve gerekirse AI ile yardım alarak kullanıcılara sunan bir ekip projesidir. Proje ekip çalışması için yapılandırılmıştır: PR kuralları, issue/etiket şablonları ve CI örneği içerir.

Önemli not: Bu repo birden fazla geliştirici tarafından yönetilir. Lütfen `CONTRIBUTING.md` ve `CODE_OF_CONDUCT.md` kurallarını okuyun.

## Hızlı Başlangıç
1. Sanal ortam oluşturun:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   pip install -r requirements.txt
   ```

3. Backend çalıştırma (development):

   ```bash
   uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Branch & PR Politikası
- `main`: üretim hazır (korumalı)
- `develop`: geliştirme entegrasyonu
- `feature/*`: yeni özellik dalları
- `fix/*`: hata düzeltme dalları
- `release/*`: sürüm hazırlıkları

## Pull Request checklist (özet)
- İlgili issue bağlandı
- Kod stiline (Black, isort) uydu
- Unit test eklendi/güncellendi
- CI ye geçti

## Roller ve sahiblik
- `CODEOWNERS` dosyasında takım kod sahipleri belirtilir.
- Görevler issue'lara atanır; büyük değişiklikler için tasarım/DB şeması PR'ı açılmadan önce tartışılmalı.

## İletişim & Toplantılar
- Günlük veya haftalık senkronizasyon (takım kararı)
- Büyük veri/toplantı notları `docs/` altında saklanmalı

## Veri, modeller ve güvenlik
- Ham veri `dataset/` altında tutulur fakat hassas/kişisel veri repoya pushlanmaz.
- Model checkpointleri büyükse harici storage (S3, GDrive, DVC remote) kullanılmalı.
- `.env` dosyaları repoya eklenmez; `.env.example` eklenir.

Daha fazla bilgi: `CONTRIBUTING.md`, `.github/` klasörü ve `docs/` içeriğine bakın.
# Gıda İçerik Analizi - Ekip Projesi
Bu repo, ambalaj üzerindeki içerik/yazıları OCR ile okuyup, içerik listesini ayrıştırarak ve gerekirse AI ile yardım alarak kullanıcılara sunan bir ekip projesidir. Proje ekip çalışması için yapılandırılmıştır: PR kuralları, issue/etiket şablonları ve CI örneği içerir.

Önemli not: Bu repo birden fazla geliştirici tarafından yönetilir. Lütfen `CONTRIBUTING.md` ve `CODE_OF_CONDUCT.md` kurallarını okuyun.

## Hızlı Başlangıç
1. Sanal ortam oluşturun:

	```bash
	# Gıda İçerik Analizi - Ekip Projesi

	Bu repo, ambalaj üzerindeki içerik/yazıları OCR ile okuyup, içerik listesini ayrıştırarak ve gerekirse AI ile yardım alarak kullanıcılara sunan bir ekip projesidir. Proje ekip çalışması için yapılandırılmıştır: PR kuralları, issue/etiket şablonları ve CI örneği içerir.

	Önemli not: Bu repo birden fazla geliştirici tarafından yönetilir. Lütfen `CONTRIBUTING.md` ve `CODE_OF_CONDUCT.md` kurallarını okuyun.

	## Hızlı Başlangıç
	1. Sanal ortam oluşturun:

	   ```bash
	   python -m venv .venv
	   source .venv/bin/activate  # Windows: .venv\Scripts\activate
	   ```

	2. Bağımlılıkları yükleyin:

	   ```bash
	   pip install -r requirements.txt
	   ```

	3. Backend çalıştırma (development):

	   ```bash
	   uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
	   ```

	## Branch & PR Politikası
	- `main`: üretim hazır (korumalı)
	- `develop`: geliştirme entegrasyonu
	- `feature/*`: yeni özellik dalları
	- `fix/*`: hata düzeltme dalları
	- `release/*`: sürüm hazırlıkları

	## Pull Request checklist (özet)
	- İlgili issue bağlandı
	- Kod stiline (Black, isort) uydu
	- Unit test eklendi/güncellendi
	- CI ye geçti

	## Roller ve sahiblik
	- `CODEOWNERS` dosyasında takım kod sahipleri belirtilir.
	- Görevler issue'lara atanır; büyük değişiklikler için tasarım/DB şeması PR'ı açılmadan önce tartışılmalı.

	## İletişim & Toplantılar
	- Günlük veya haftalık senkronizasyon (takım kararı)
	- Büyük veri/toplantı notları `docs/` altında saklanmalı

	## Veri, modeller ve güvenlik
	- Ham veri `dataset/` altında tutulur fakat hassas/kişisel veri repoya pushlanmaz.
	- Model checkpointleri büyükse harici storage (S3, GDrive, DVC remote) kullanılmalı.
	- `.env` dosyaları repoya eklenmez; `.env.example` eklenir.

	Daha fazla bilgi: `CONTRIBUTING.md`, `.github/` klasörü ve `docs/` içeriğine bakın.