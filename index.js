const CSV = require("./lib/csv");
const csvString = require("./lib/csv-string-test");

const csv = new CSV([], []);
csv.readString(csvString);
console.log(csv.lines);
console.log(csv);
