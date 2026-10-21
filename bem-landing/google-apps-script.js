/**
 * ════════════════════════════════════════════════
 *  Google Apps Script — باقة BEM (نسخة مضمونة 100%)
 *  صفحة: أوراق المراجعة
 * ════════════════════════════════════════════════
 */

function handleRequest(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // استخراج البيانات مهما كانت طريقة الإرسال (JSON أو FormData أو URL parameters)
    let data = {};
    
    // 1. فحص إذا كانت البيانات مرسلة كـ JSON في postData
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // إذا لم تكن JSON
      }
    }
    
    // 2. إذا كانت مرسلة كـ parameter أو FormData
    const param = (e && e.parameter) ? e.parameter : {};
    
    const name = data["الاسم"] || data["name"] || param["الاسم"] || param["name"] || "";
    const phone = data["الهاتف"] || data["phone"] || param["الهاتف"] || param["phone"] || "";
    const wilaya = data["الولاية"] || data["wilaya"] || param["الولاية"] || param["wilaya"] || "";
    const product = data["المنتج"] || data["product"] || param["المنتج"] || param["product"] || "باقة BEM";
    const date = data["التاريخ"] || data["date"] || param["التاريخ"] || param["date"] || new Date().toLocaleString("ar-DZ");

    // التأكد من وجود اسم أو هاتف على الأقل
    if (name || phone) {
      sheet.appendRow([
        name,
        phone,
        wilaya,
        product,
        date,
        "جديد ⏳"
      ]);

      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 1, 1, 6).setBackground("#e8f5e9"); // أخضر فاتح
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", received: { name, phone, wilaya } }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// يدعم كلا الطلبين POST و GET
function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}
