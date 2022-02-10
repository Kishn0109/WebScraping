const cheerio = require("cheerio");
const request = require("request");
import scorecordfun from "./scorecard";
// const path=require("path");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let homeLink = "https://www.espncricinfo.com/";

request(url, cb);

function cb(error, response, html) {
  if (error) {
    console.log(error);
  }
  if (html) {
    extractlink(html);
  }
}
function extractlink(html) {
  // const viewAll= a[data-hover="View All Results"];
  let $ = cheerio.load(html);
  let ancharElement = $('a[data-hover="View All Results"]');
  let link = ancharElement.attr("href");
  let fullLink = "https://www.espncricinfo.com/" + link;
  console.log(fullLink);
  extractResultHtml(fullLink);
}
function extractResultHtml(link) {
  request(link, (error, response, html) => {
    if (error) {
      console.log(error);
    }
    if (html) {
      handeleMatchResult(html);
    }
  });
}
function handeleMatchResult(html) {
  let $ = cheerio.load(html);
  let Scorcard_links = $('a[data-hover="Scorecard"]');
  console.log("aaya");
  console.log("from ", $(Scorcard_links[0]).attr("href"));
  // for(let i=0;i<Scorcard_links.length;i++){
  //   $()
  // }
  Scorcard_links.map((idx, scorcardElement) => {
    let link = homeLink + $(Scorcard_links[0]).attr("href");
    handelscorecard(link);
  });
}
function handelscorecard(link) {
  request(link, (error, response, html) => {
    if (error) {
      console.log(error);
    }
    if (html) {
      scorecordfun.scorecordfun(html);
      // scorecard(html);
    }
  });
}
