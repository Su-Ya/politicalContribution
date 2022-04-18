const Utils = {
  isElected: (mark) => {
    switch (mark) {
      case "*":
        return true;
      case "":
      default:
        return false;
    }
  },
  addComma: (price) => {
    if (price === undefined || price === null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  deleteComma: (strPrice) => {
    if (strPrice === undefined || strPrice === null) return "";
    return strPrice.split(",").join("");
  },
};

export default Utils;
