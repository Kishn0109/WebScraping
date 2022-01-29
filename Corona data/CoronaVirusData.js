const cheerio = require("cheerio");
const request = require("request");

request(
  "https://www.worldometers.info/coronavirus/",
  function cb(error, response, html) {
    if (error) {
      console.log(error);
    } else {
      handelhtml(html);
    }
  }
);
function handelhtml(html) {
  let selectTool = cheerio.load(html);
  let coronaData = selectTool(".maincounter-number span");
  //   console.log(coronaData);
  let cases = coronaData[0];
  let totaldeth = coronaData[1];
  let recover = coronaData[2];
  console.log("cases:", selectTool(cases).text());
  console.log("deth:", selectTool(totaldeth).text());
  console.log("recover:", selectTool(recover).text());
}
