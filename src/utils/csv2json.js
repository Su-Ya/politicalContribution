// source: https://github.com/martindrapeau/csvjson-app/blob/master/js/csvjson/csv2json.js

String.prototype.trim = function (characters) {
  characters = defaultToWhiteSpace(characters);
  return this.replace(new RegExp(`^${characters}+|${characters}+$`, "g"), "");
};

function defaultToWhiteSpace(characters) {
  if (characters == null) return "\\s";
  else if (characters.source) return characters.source;
  else return "[" + escapeRegExp(characters) + "]";
}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}

function CSVtoArray(strData, strDelimiter) {
  strDelimiter = strDelimiter || ",";
  var objPattern = new RegExp(
    // Delimiters
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // 有引號 ("") 的字串
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields
      "([^\\" +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  var aryData = [[]],
    aryMatches = null;
  while ((aryMatches = objPattern.exec(strData))) {
    var strMatchedDelimiter = aryMatches[1]; // 取得分隔符
    // 檢查分隔符是否有長度 (每列開頭) + 是否不是該分隔符 + 最後一列不是空的 (只有換行)
    // 如果為 ture 代表是某列之開頭，所以需為陣列新增一列
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter &&
      aryMatches[0] !== "\r\n" &&
      aryMatches[0] !== "\n"
    )
      aryData.push([]);

    // 如果有引號的字串就使用引號，如沒有使用引號的字串則檢查是否為空欄位
    var strMatchedValue = aryMatches[2]
      ? aryMatches[2].trim().replace(/\"\"/g, '"')
      : aryMatches[2] == ""
      ? aryMatches[2]
      : aryMatches[3];

    if (aryMatches[0] !== "\r\n")
      aryData[aryData.length - 1].push(strMatchedValue);
  }
  return aryData;
}

/**
 * options:
 *  - parseNumbers:     optional / true
 *  - separator (分隔):  optional / "," / ";" / "  " (Tab)
 */
function convert(csv, options) {
  var separator = options.separator;

  var ary = CSVtoArray(csv, separator);
  if (!ary) throw "csv is empty";

  var keys = ary.shift();
  if (keys.length == 0) throw "error";
  // keys = keys.map(function (key) {
  //   console.log(key);
  //   return key.trim().trim('"');
  // });

  var json = [];
  for (var i = 0; i < ary.length; i++) {
    var row = {},
      hashKey;
    for (var k = 0; k < keys.length; k++) {
      // var value = ary[i][k].trim().trim('"');
      // var number = value === "" ? NaN : value - 0;
      // row[keys[k]] = isNaN(number) || !options.parseNumbers ? value : number;
      row[keys[k]] = ary[i][k];
    }
    json.push(row);
  }
  return json;
}
export default convert;
