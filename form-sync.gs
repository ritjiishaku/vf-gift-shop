// ═══════════════════════════════════════════════════════════════
//  Gifts by VF — Form → Sheet sync
//  Copies each Google Form submission into the correct tab.
// ═══════════════════════════════════════════════════════════════

var TARGETS = [
  { tab: 'Sales Reps',    keys: ['commission_rate'] },
  { tab: 'Payouts',       keys: ['order_amount', 'commission'] },
  { tab: 'Testimonials',  keys: ['quote', 'rating'] },
  { tab: 'Portfolio',     keys: ['caption'] },
  { tab: 'Products',      keys: ['price', 'category'] },
  { tab: 'Why Us',        keys: ['icon'] },
  { tab: 'How to Order',  keys: ['title', 'description'] }
];

function onFormSubmit(e) {
  try {
    var row = {};

    // Preferred: map answers by their question title.
    if (e && e.namedValues) {
      for (var key in e.namedValues) {
        var v = e.namedValues[key];
        row[norm(key)] = String(v && v.length ? v[0] : '');
      }
    } else if (e && e.range && e.values) {
      var sheet = e.range.getSheet();
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      for (var i = 0; i < headers.length; i++) {
        row[norm(headers[i])] = e.values[i];
      }
    } else {
      return;
    }

    // Which tab does this form belong to?
    var target = null;
    for (var t = 0; t < TARGETS.length; t++) {
      var keys = TARGETS[t].keys;
      var ok = true;
      for (var k = 0; k < keys.length; k++) {
        if (!(keys[k] in row)) { ok = false; break; }
      }
      if (ok) { target = TARGETS[t]; break; }
    }

    if (!target) {
      Logger.log('No matching tab. Headers found: ' + Object.keys(row).join(', '));
      return;
    }

    var dest = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(target.tab);
    if (!dest) {
      Logger.log('Tab not found: ' + target.tab);
      return;
    }

    var destHeaders = dest.getRange(1, 1, 1, dest.getLastColumn()).getValues()[0].map(norm);
    var newRow = destHeaders.map(function (h) { return (h in row) ? row[h] : ''; });
    dest.appendRow(newRow);
    Logger.log('Added row to ' + target.tab);
  } catch (err) {
    Logger.log('onFormSubmit error: ' + err);
  }
}

function norm(s) {
  return String(s == null ? '' : s).trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
}
