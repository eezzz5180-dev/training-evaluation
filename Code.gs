const SPREADSHEET_ID = "1Cv2DPfGlpqrT6jX34oA_m5kkb6664W810jFpEhGTUt4";

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName("التقييمات");

  if (!sheet) {
    sheet = spreadsheet.insertSheet("التقييمات");
    sheet.appendRow(["التاريخ", "الوقت", "التقييم"]);
  }

  const rating = e && e.parameter && e.parameter.rating
    ? e.parameter.rating
    : "غير محدد";

  const now = new Date();
  const timezone = "Asia/Riyadh";
  const date = Utilities.formatDate(now, timezone, "yyyy-MM-dd");
  const time = Utilities.formatDate(now, timezone, "HH:mm:ss");

  sheet.appendRow([date, time, rating]);
  updateSummary(spreadsheet);

  return ContentService
    .createTextOutput("OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

function testRating() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName("التقييمات");

  if (!sheet) {
    sheet = spreadsheet.insertSheet("التقييمات");
    sheet.appendRow(["التاريخ", "الوقت", "التقييم"]);
  }

  const now = new Date();
  const timezone = "Asia/Riyadh";
  const date = Utilities.formatDate(now, timezone, "yyyy-MM-dd");
  const time = Utilities.formatDate(now, timezone, "HH:mm:ss");

  sheet.appendRow([date, time, "اختبار"]);
  updateSummary(spreadsheet);
}

function updateSummary(spreadsheet) {
  let summary = spreadsheet.getSheetByName("الإحصائيات");

  if (!summary) {
    summary = spreadsheet.insertSheet("الإحصائيات");
  }

  summary.clear();

  summary.getRange("A1:B1").merge();
  summary.getRange("A1").setValue("إحصائيات تقييم التجربة التدريبية");
  summary.getRange("A1").setFontSize(18).setFontWeight("bold");

  summary.getRange("A3:B3").setValues([["نوع التقييم", "العدد"]]);
  summary.getRange("A4:A6").setValues([
    ["راضي"],
    ["محايد"],
    ["غير راضي"]
  ]);

  summary.getRange("B4").setFormula('=COUNTIF(التقييمات!C:C,"راضي")');
  summary.getRange("B5").setFormula('=COUNTIF(التقييمات!C:C,"محايد")');
  summary.getRange("B6").setFormula('=COUNTIF(التقييمات!C:C,"غير راضي")');

  summary.getRange("A8").setValue("إجمالي التقييمات");
  summary.getRange("B8").setFormula("=SUM(B4:B6)");

  summary.getRange("A3:B8").setBorder(true, true, true, true, true, true);
  summary.autoResizeColumns(1, 2);
}
