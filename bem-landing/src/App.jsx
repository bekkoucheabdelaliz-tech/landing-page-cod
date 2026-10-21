import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  ChevronDown,
  Sparkles,
  ArrowDown,
  AlertCircle,
  Loader2,
  PartyPopper,
  Banknote,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";

// ─────────────────────────────────────────────
// ⚙️  بيانات المنتج — عدّل هنا فقط
// ─────────────────────────────────────────────
const PRODUCT = {
  name: "باقة BEM",
  tagline: "كل ما تحتاجه لاجتياز شهادة التعليم المتوسط",
  description:
    "باقة شاملة ومنظّمة تضم جميع الدروس والملخصات والتمارين المحلولة لجميع المواد. صُمِّمت خصيصاً لمساعدة تلميذ BEM على النجاح بتفوق.",
  price: "٩٩٠ دج",
  oldPrice: "١٩٠٠ دج",
  image: "/product1.jpg",   // ملف الكتب (product1)
  image2: "/product2.jpg",  // صورة المكتب (product2)
};

// ── Google Sheets Web App URL ──
// سيتم توليده تلقائياً — راجع ملف google-apps-script.js
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyLWg2qC_HqtFzgN4jOOODEuqWMpWwUSpZcun3VVHoQj_CFayFb_J4d-8T7xaJP4is7/exec";

const WILAYAS = [
  "01 - أدرار",
  "02 - الشلف",
  "03 - الأغواط",
  "04 - أم البواقي",
  "05 - باتنة",
  "06 - بجاية",
  "07 - بسكرة",
  "08 - بشار",
  "09 - البليدة",
  "10 - البويرة",
  "11 - تمنراست",
  "12 - تبسة",
  "13 - تلمسان",
  "14 - تيارت",
  "15 - تيزي وزو",
  "16 - الجزائر",
  "17 - الجلفة",
  "18 - جيجل",
  "19 - سطيف",
  "20 - سعيدة",
  "21 - سكيكدة",
  "22 - سيدي بلعباس",
  "23 - عنابة",
  "24 - قالمة",
  "25 - قسنطينة",
  "26 - المدية",
  "27 - مستغانم",
  "28 - المسيلة",
  "29 - معسكر",
  "30 - ورقلة",
  "31 - وهران",
  "32 - البيض",
  "33 - إليزي",
  "34 - برج بوعريريج",
  "35 - بومرداس",
  "36 - الطارف",
  "37 - تندوف",
  "38 - تيسمسيلت",
  "39 - الوادي",
  "40 - خنشلة",
  "41 - سوق أهراس",
  "42 - تيبازة",
  "43 - ميلة",
  "44 - عين الدفلى",
  "45 - النعامة",
  "46 - عين تموشنت",
  "47 - غرداية",
  "48 - غليزان",
  "49 - تيميمون",
  "50 - برج باجي مختار",
  "51 - أولاد جلال",
  "52 - بني عباس",
  "53 - إن صالح",
  "54 - إن قزام",
  "55 - تقرت",
  "56 - جانت",
  "57 - المغير",
  "58 - المنيعة",
];

const FEATURES = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "جميع المواد في مكان واحد",
    desc: "رياضيات، علوم، عربية، فرنسية، تاريخ وجغرافيا — كل شيء ملخّص ومرتّب بشكل واضح.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "تمارين محلولة خطوة بخطوة",
    desc: "مئات التمارين المحلولة مع شرح كل خطوة لتضمن الفهم الكامل قبل الامتحان.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "توصيل سريع لبابك",
    desc: "الدفع عند الاستلام فقط. لا تدفع أي شيء قبل أن تمسك الباقة بيدك.",
  },
];

// ─────────────────────────────────────────────
// 🔤  مكوّنات مساعدة
// ─────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
      {children}
    </span>
  );
}

function PriceBadge() {
  return (
    <div className="flex items-center gap-3 justify-center flex-wrap">
      <span className="text-4xl font-black text-emerald-400">
        {PRODUCT.price}
      </span>
      <span className="text-xl text-slate-400 line-through font-medium">
        {PRODUCT.oldPrice}
      </span>
      <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
        وفّر 48%
      </span>
    </div>
  );
}

// ── صورة المنتج مع Placeholder ──
function ProductImage() {
  if (PRODUCT.image) {
    return (
      <div className="w-full max-w-sm mx-auto mt-2 mb-1">
        {/* الصورة الرئيسية — ملف الكتب */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-300">
          <img
            src={PRODUCT.image}
            alt="باقة BEM — ملف العلوم والرياضيات"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        {/* الصورة الثانية — أجواء المراجعة */}
        {PRODUCT.image2 && (
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 mt-3 hover:scale-105 transition-transform duration-300">
            <img
              src={PRODUCT.image2}
              alt="باقة BEM — أجواء المراجعة"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    );
  }
  // Placeholder يظهر حتى تضيف الصورة
  return (
    <div className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/10 backdrop-blur-sm aspect-video flex flex-col items-center justify-center gap-3">
      <BookOpen className="w-16 h-16 text-emerald-300 opacity-80" />
      <span className="text-white/60 text-sm font-medium">صورة المنتج</span>
      <span className="text-white/40 text-xs">أضف مسار الصورة في PRODUCT.image</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// 🏠  Header
// ─────────────────────────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-center">
        <span className="text-base font-black tracking-wide text-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          {PRODUCT.name}
        </span>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────
// 🦸  Hero Section
// ─────────────────────────────────────────────
function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      {/* decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 pt-12 pb-14 flex flex-col items-center text-center gap-5">
        <Badge>الأكثر طلباً هذا الموسم 📚</Badge>

        <h1 className="text-3xl sm:text-4xl font-black leading-tight">
          {PRODUCT.tagline}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg">
          {PRODUCT.description}
        </p>

        {/* صورة المنتج */}
        <ProductImage />

        <PriceBadge />

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {["✅ دفع عند الاستلام", "🚚 توصيل لكل الولايات", "🔁 ضمان استرجاع"].map(
            (t) => (
              <span
                key={t}
                className="bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                {t}
              </span>
            )
          )}
        </div>

        <button
          onClick={scrollToForm}
          className="mt-2 w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all duration-200 text-white font-black text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/30"
        >
          اطلب الآن وادفع عند الاستلام
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>

        <p className="text-slate-400 text-xs">
          🔒 معلوماتك آمنة — لا حاجة لبطاقة بنكية
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ✨  Features Section
// ─────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-center text-2xl font-black text-slate-800 mb-8">
          لماذا تختارين{" "}
          <span className="text-emerald-600">{PRODUCT.name}؟</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                {f.icon}
              </div>
              <h3 className="font-black text-slate-800 text-base">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 📋  Order Form Section
// ─────────────────────────────────────────────
const INITIAL_FORM = { name: "", phone: "", wilaya: "" };
const INITIAL_ERRORS = { name: "", phone: "", wilaya: "" };

function OrderFormSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = { name: "", phone: "", wilaya: "" };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "الاسم الكامل مطلوب";
      valid = false;
    }

    const phoneRegex = /^(05|06|07)\d{8}$/;
    if (!form.phone) {
      newErrors.phone = "رقم الهاتف مطلوب";
      valid = false;
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام)";
      valid = false;
    }

    if (!form.wilaya) {
      newErrors.wilaya = "الولاية مطلوبة";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // ── إرسال البيانات بطريقة متوافقة 100% مع Google Apps Script بدون قيود CORS ──
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("wilaya", form.wilaya);
      formData.append("product", PRODUCT.name);
      formData.append("date", new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers" }));

      // مفاتيح بالعربية أيضاً للتوافق التام
      formData.append("الاسم", form.name);
      formData.append("الهاتف", form.phone);
      formData.append("الولاية", form.wilaya);
      formData.append("المنتج", PRODUCT.name);
      formData.append("التاريخ", new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers" }));

      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (err) {
      console.error("Sheets error:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  /* ─── Success State ─── */
  if (submitted) {
    return (
      <section id="order-form" className="bg-gradient-to-b from-slate-50 to-emerald-50 py-14 px-4">
        <div className="max-w-md mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 p-8 text-center flex flex-col items-center gap-5">
            {/* Animated icon */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <span className="absolute -top-1 -left-1 text-2xl animate-bounce">🎉</span>
            </div>

            {/* Success headline */}
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-black text-slate-800">
                تم تسجيل طلبك بنجاح!
              </h3>
              <p className="text-emerald-600 font-bold text-base">
                سنتصل بك قريباً لتأكيد الطلبية
              </p>
            </div>

            {/* Green success banner */}
            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <PartyPopper className="w-4 h-4 shrink-0" />
                <span>تفاصيل طلبك</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-right">
                <span className="text-slate-500">الاسم:</span>
                <span className="font-bold text-slate-700">{form.name}</span>
                <span className="text-slate-500">رقم الهاتف:</span>
                <span className="font-bold text-slate-700 dir-ltr">{form.phone}</span>
                <span className="text-slate-500">الولاية:</span>
                <span className="font-bold text-slate-700">{form.wilaya}</span>
              </div>
            </div>

            {/* COD reminder */}
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <Banknote className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-amber-700 text-xs font-medium leading-relaxed text-right">
                <strong>الدفع عند الاستلام فقط</strong> — لا تدفع أي مبلغ الآن.
                سيتصل بك أحد وكلائنا لتأكيد الموعد.
              </p>
            </div>

            {/* Delivery note */}
            <p className="text-slate-400 text-xs">
              📦 طلبك سيصلكِ إلى <strong className="text-slate-600">{form.wilaya}</strong> خلال 3–5 أيام عمل
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Form State ─── */
  return (
    <section id="order-form" className="bg-gradient-to-b from-slate-50 to-slate-100 py-14 px-4">
      <div className="max-w-md mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full mb-3">
            🛒 اطلب الآن
          </span>
          <h2 className="text-2xl font-black text-slate-800">
            أكمل بياناتك للطلب
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            ادفع عند الاستلام — بدون أي مخاطرة
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
          {/* Price reminder */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-6">
            <span className="text-sm text-slate-600 font-medium">
              {PRODUCT.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 line-through text-xs">
                {PRODUCT.oldPrice}
              </span>
              <span className="text-emerald-700 font-black text-base">
                {PRODUCT.price}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                الاسم الكامل
                <span className="text-red-400 text-xs font-normal mr-auto">* مطلوب</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="مثال: فاطمة بن علي"
                className={`w-full border-2 ${
                  errors.name
                    ? "border-red-400 bg-red-50 focus:ring-red-300"
                    : "border-slate-200 bg-slate-50 focus:ring-emerald-400"
                } rounded-xl px-4 py-3 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              />
              {errors.name && (
                <div className="flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 text-xs font-medium">{errors.name}</p>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                رقم الهاتف
                <span className="text-red-400 text-xs font-normal mr-auto">* مطلوب</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0612345678"
                maxLength={10}
                inputMode="numeric"
                className={`w-full border-2 ${
                  errors.phone
                    ? "border-red-400 bg-red-50 focus:ring-red-300"
                    : "border-slate-200 bg-slate-50 focus:ring-emerald-400"
                } rounded-xl px-4 py-3 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all dir-ltr text-right`}
              />
              {errors.phone ? (
                <div className="flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 text-xs font-medium">{errors.phone}</p>
                </div>
              ) : (
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <span>💡</span> يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام
                </p>
              )}
            </div>

            {/* Wilaya */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                الولاية
                <span className="text-red-400 text-xs font-normal mr-auto">* مطلوب</span>
              </label>
              <div className="relative">
                <select
                  name="wilaya"
                  value={form.wilaya}
                  onChange={handleChange}
                  className={`w-full appearance-none border-2 ${
                    errors.wilaya
                      ? "border-red-400 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 bg-slate-50 focus:ring-emerald-400"
                  } rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all cursor-pointer`}
                >
                  <option value="">اختاري ولايتك</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {errors.wilaya && (
                <div className="flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 text-xs font-medium">{errors.wilaya}</p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed text-white font-black text-base py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  تأكيد الطلب
                </>
              )}
            </button>

            {/* COD reassurance note */}
            <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Banknote className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-amber-700 text-xs font-semibold text-center leading-relaxed">
                الدفع يكون عند استلام المنتج، لا تدفع أي شيء الآن
              </p>
            </div>

            <p className="text-center text-slate-400 text-xs">
              🔒 بياناتك محمية ولن تُشارك مع أي طرف ثالث
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mt-6 text-center">
          {[
            { icon: "🛡️", label: "دفع آمن" },
            { icon: "↩️", label: "ضمان الاسترجاع" },
            { icon: "🚚", label: "توصيل سريع" },
          ].map((b) => (
            <div
              key={b.label}
              className="bg-white rounded-xl py-3 px-2 shadow-sm border border-slate-100 flex flex-col items-center gap-1"
            >
              <span className="text-xl">{b.icon}</span>
              <span className="text-xs text-slate-600 font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 🦶  Footer
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-center text-xs py-8 px-4">
      <p className="text-slate-300 font-semibold text-sm mb-1">
        {PRODUCT.name}
      </p>
      <p>© {new Date().getFullYear()} — جميع الحقوق محفوظة</p>
      <p className="mt-3 flex items-center justify-center gap-2">
        <span>تابعنا على الفيسبوك:</span>
        <a
          href="https://www.facebook.com/people/%D8%A3%D9%88%D8%B1%D8%A7%D9%82-%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AC%D8%B9%D8%A9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
        >
          📘 أوراق المراجعة
        </a>
      </p>
    </footer>
  );
}

// ─────────────────────────────────────────────
// 🚀  App Root
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <OrderFormSection />
      </main>
      <Footer />
    </div>
  );
}
