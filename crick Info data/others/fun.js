const fs = require("fs");
const xlsx = require("xlsx");
let buffer = fs.readFileSync("./example.json");
// console.log(buffer + " ");
let myobj = {
  name: "karan",
  "roll no": 24,
};
let myobj2 = {
  name: "karan",
  age: 34,
};
// myobj = myobj.push(myobj2);
// let data = JSON.stringify(myobj);
let newobj = JSON.parse(myobj);
let alagdata = newobj.push({
  name: "karan",
  age: 34,
});
console.log(alagdata);
// let objdata = JSON.parse(buffer);
// objdata.push({
//   name: "karan",
//   " last Name": "rai",
//   age: 45,
//   single: true,
// });
// console.log(objdata);
// // objdata = JSON.stringify(objdata);
// // fs.writeFileSync("example.json", obj);

// let newWB = xlsx.utils.book_new();
// let newWS = xlsx.utils.json_to_sheet(objdata);
// xlsx.utils.book_append_sheet(newWB, newWS, "karan");
// xlsx.writeFile(newWB, "myxlse.xlsx");

// let wb = xlsx.readFile("myxlse.xlsx");
// let excelData = wb.Sheets["karan"];
// let ans = xlsx.utils.sheet_to_json(excelData);
// console.log("getting ans from reading", ans);

// // without fs module read file --------------------------

// // let objdata = require("./example.json");
// // // let objdata = JSON.parse(buffer);
// // objdata.push({
// //   name: "papa",
// //   " last Name": "rai",
// //   age: 45,
// //   single: true,
// // });
// // console.log(objdata);
// // objdata = JSON.stringify(objdata);
// // fs.writeFileSync("example.json", objdata);

// // to write the xlse file

// // let newWB = xlsx.utils.book_new();
// // let newWS = xlsx.utils.json_to_sheet(json);
// // xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
// // xlsx.writeFile(newWB, fileName);

// //  to read the xlse file

// // let wb = xlsx.readFile(filePath);
// // let excelData = wb.Sheets[sheetName];
// // let ans = xlsx.utils.sheet_to_json(excelData);
// // console.log(ans);
