const cheerio = require("cheerio");
const request = require("request");

request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary",
  function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    handeltastballdata(body); // Print the HTML for the Google homepage.
  }
);

function handeltastballdata(html) {
  let CheerioHtml = cheerio.load(html);
  let Allballs = CheerioHtml(
    ".match-comment-wrapper .match-comment-long-text p"
  );
  let lastBallClass = Allballs[0];
  let data = CheerioHtml(lastBallClass).text();
  console.log(data);
}
