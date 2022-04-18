const Utils = {
  // 是否有當選註記
  isElected: (mark) => {
    switch (mark) {
      case "*":
        return true;
      case "":
      default:
        return false;
    }
  },

  // 加入千分位逗號
  addComma: (price) => {
    if (price === undefined || price === null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // 刪除逗號
  deleteComma: (strPrice) => {
    if (strPrice === undefined || strPrice === null) return "";
    return strPrice.split(",").join("");
  },

  // 政治獻金分析模式
  analyzeModals: {
    // 兩人 pk
    pk: "pk",

    // 個人資料
    single: "single",
  },
};

export default Utils;
