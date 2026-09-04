# نظام تقييم التجربة التدريبية

## الملفات
- index.html: صفحة شاشة اللمس 1080×1920.
- logo_training.png: شعار مدينة تدريب الأمن العام بالمنطقة الشرقية.
- logo_security.png: شعار الأمن العام.
- Code.gs: كود Google Apps Script لحفظ التقييمات.

## ربط Google Sheets
1. أنشئ Google Sheet جديد.
2. افتح Extensions > Apps Script.
3. احذف الكود الموجود والصق محتوى Code.gs.
4. اضغط Deploy > New deployment.
5. اختر Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. اضغط Deploy وانسخ رابط Web app.
9. افتح index.html وابحث عن:
   APP_SCRIPT_URL = "ضع_رابط_تطبيق_Google_Apps_Script_هنا";
   واستبدل النص برابط Web app.
10. افتح index.html على شاشة اللمس.

سيُنشأ تبويب باسم "التقييمات" تلقائيًا، وتُحفظ الأعمدة:
التاريخ | الوقت | التقييم

## ملاحظة
يفضل تشغيل الصفحة في وضع ملء الشاشة (Kiosk) على جهاز العرض.
