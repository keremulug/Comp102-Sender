# Mailer

`Mailer`, Node.js ve Express kullanılarak hazırlanmış iki küçük backend örneğini aynı repoda birleştirir:

- `Register`: basit kullanıcı kayıt ve giriş akışı
- `NodeMailer`: test maili ve karşılama maili gönderen servis

Bu repo eğitim, pratik ve temel backend mantığını öğrenme amacıyla hazırlanmıştır.

## Proje İçeriği

### 1. Register

`Register` klasörü, kullanıcı oluşturma ve giriş yapma mantığını gösteren basit bir Express uygulamasıdır.

Öne çıkan özellikler:

- `POST /users` ile yeni kullanıcı ekleme
- `POST /users/login` ile kullanıcı doğrulama
- `bcrypt` ile şifreleri hash'leme
- Verileri geçici olarak bellekte saklama

Not: Bu bölümde veriler veritabanına değil, uygulama içindeki bir diziye kaydedilir. Sunucu yeniden başlatıldığında kullanıcılar silinir.

### 2. NodeMailer

`NodeMailer` klasörü, e-posta gönderme işlemini gösteren ikinci bir Express uygulamasıdır.

Öne çıkan özellikler:

- `POST /api/user/signup` ile Ethereal test hesabı üzerinden örnek mail gönderme
- `POST /api/product/getMail` ile Gmail hesabı üzerinden kullanıcıya karşılama maili gönderme
- `Mailgen` ile HTML formatında şık e-posta şablonu üretme

## Kullanılan Teknolojiler

- Node.js
- Express
- Nodemailer
- Mailgen
- bcrypt
- Nodemon

## Klasör Yapısı

```text
Mailer/
├── NodeMailer/
│   ├── controller/
│   ├── routes/
│   ├── env.js
│   ├── server.js
│   └── package.json
├── Register/
│   ├── server.js
│   ├── request.rest
│   └── package.json
├── package.json
└── README.md
```

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları ilgili klasörlerde kurabilirsiniz.

### Kök klasör

```bash
npm install
```

### Register servisi

```bash
cd Register
npm install
```

### NodeMailer servisi

```bash
cd NodeMailer
npm install
```

## Çalıştırma

İki servis birbirinden bağımsızdır. İsterseniz ayrı terminallerde çalıştırabilirsiniz.

### Register servisi

```bash
cd Register
npm run devStart
```

Sunucu adresi:

```text
http://localhost:3000
```

### NodeMailer servisi

```bash
cd NodeMailer
npm start
```

Sunucu adresi:

```text
http://localhost:5001
```

## API Endpoint'leri

### Register

#### `GET /users`

Sistemde tutulan kullanıcı listesini döndürür.

#### `POST /users`

Yeni kullanıcı oluşturur.

Örnek istek:

```json
{
  "name": "kerem",
  "password": "123456"
}
```

Beklenen sonuç:

- Şifre `bcrypt` ile hash'lenir
- Kullanıcı bellekte tutulur
- Başarılı işlemde `201 Created` döner

#### `POST /users/login`

Kullanıcı girişini kontrol eder.

Örnek istek:

```json
{
  "name": "kerem",
  "password": "123456"
}
```

Olası cevaplar:

- `Success`
- `Not Allowed`
- `Cannot find user`

### NodeMailer

#### `POST /api/user/signup`

Ethereal test hesabı ile örnek bir e-posta gönderir.

Bu endpoint geliştirme ve test amacıyla uygundur. Başarılı cevap içinde preview linki döner.

#### `POST /api/product/getMail`

Belirtilen kullanıcı e-posta adresine HTML formatında karşılama maili gönderir.

Örnek istek:

```json
{
  "userEmail": "example@mail.com"
}
```

Beklenen sonuç:

- Gmail transport oluşturulur
- `Mailgen` ile HTML mail hazırlanır
- Kullanıcıya "Welcome to MentCare!" başlıklı mail gönderilir

## NodeMailer Yapılandırması

`NodeMailer/env.js` dosyasında gönderen hesabın bilgileri tutulur.

Mevcut yapı:

```js
module.exports = {
  EMAIL: "your-email@gmail.com",
  PASSWORD: "your-app-password"
}
```

Önemli not:

- Gerçek Gmail şifresi yerine App Password kullanılmalıdır
- Hassas bilgiler doğrudan repoya eklenmemelidir
- Gerçek projelerde `.env` kullanılması önerilir

## Örnek Kullanım Senaryosu

1. `Register` servisi ile kullanıcı oluşturulur
2. Kullanıcı giriş bilgisi doğrulanır
3. `NodeMailer` servisi ile kullanıcıya hoş geldin maili gönderilir

Bu akış, temel bir kayıt ve bilgilendirme sistemi mantığını göstermektedir.

## Geliştirme Notları

- `Register` tarafında veritabanı yoktur
- Kullanıcı doğrulama basit tutulmuştur
- `NodeMailer` tarafında hata yönetimi geliştirilebilir
- Girdi doğrulama ve güvenlik kontrolleri artırılabilir
- Hassas bilgilerin `env.js` yerine ortam değişkenlerinde tutulması daha güvenlidir

## Geliştirme İçin Öneriler

- MongoDB veya PostgreSQL ekleyerek kullanıcıları kalıcı saklama
- JWT ile gerçek kimlik doğrulama ekleme
- `express-validator` ile istek doğrulama
- `.env` ve `dotenv` kullanarak gizli bilgileri koruma
- Swagger veya Postman koleksiyonu ekleme
- Testler için Jest veya Supertest kullanma

## Lisans

Bu proje [MIT benzeri bir lisans dosyasıyla](/Users/kerem/Desktop/Mailer/LICENSE) birlikte paylaşılmaktadır. Ayrıntılar için [LICENSE](/Users/kerem/Desktop/Mailer/LICENSE) dosyasına bakabilirsiniz.

## Katkı

Projeyi fork'layabilir, geliştirebilir ve pull request açabilirsiniz.

---

Bu proje, Express tabanlı backend geliştirme, kullanıcı doğrulama ve e-posta gönderme mantığını öğrenmek için iyi bir başlangıç örneğidir.
