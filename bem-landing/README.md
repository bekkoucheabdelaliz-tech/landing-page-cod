# 📚 باقة BEM — Landing Page (Cash on Delivery)

## 🚀 تشغيل المشروع

```bash
npm create vite@latest bem-landing -- --template react
cd bem-landing
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

> انسخ `App.jsx` إلى `src/App.jsx` ثم شغّل `npm run dev`

---

## 🖼️ إضافة صورة المنتج

في ملف `App.jsx`، ابحث عن:
```js
image: "",  // أضف رابط أو مسار الصورة هنا
```

**خيار 1 — صورة محلية:**
1. ضع الصورة في مجلد `public/` باسم `product.jpg`
2. غيّر إلى: `image: "/product.jpg"`

**خيار 2 — رابط مباشر:**
```js
image: "https://example.com/my-product.jpg"
```

---

## 📊 ربط Google Sheets (خطوة بخطوة)

### الخطوة 1 — إنشاء Google Sheet
1. افتح [Google Sheets](https://sheets.google.com) وأنشئ ورقة جديدة
2. في السطر الأول، أضف هذه العناوين:
   ```
   A1: الاسم   B1: الهاتف   C1: الولاية   D1: المنتج   E1: التاريخ
   ```

### الخطوة 2 — إنشاء Apps Script
1. من القائمة: **Extensions → Apps Script**
2. احذف الكود الموجود والصق هذا:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data["الاسم"],
    data["الهاتف"],
    data["الولاية"],
    data["المنتج"],
    data["التاريخ"],
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### الخطوة 3 — نشر الـ Script
1. اضغط **Deploy → New deployment**
2. اختر **Web app**
3. اضبط:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. اضغط **Deploy** وانسخ الـ **URL**

### الخطوة 4 — أضف الـ URL في الكود
في `App.jsx`:
```js
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/YOUR_ID/exec";
```

> ⚠️ بعد كل تعديل على الـ Script، أنشئ **New Deployment** جديد وليس Manage Deployments.

---

## ✏️ تخصيص سريع

```js
const PRODUCT = {
  name: "باقة BEM",          // اسم المنتج
  tagline: "...",             // العنوان الرئيسي
  description: "...",         // الوصف
  price: "٩٩٠ دج",           // السعر الحالي
  oldPrice: "١٩٠٠ دج",       // السعر القديم
  image: "/product.jpg",      // صورة المنتج
};
```
