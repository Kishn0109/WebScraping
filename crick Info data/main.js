const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const scorecardmodulo = require("./AllResult");
// const am=e
// import scorecordfun from "./scorecard";
// const path=require("path");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let homeLink = "https://www.espncricinfo.com/";
let teamdirpath = path.join(__dirname, "team");
// console.log(teamdirpath);
if (!fs.existsSync(teamdirpath)) {
  fs.mkdirSync(teamdirpath);
  console.log("ye to hai ");
}
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
  Scorcard_links.map((idx, scorcardElement) => {
    let link = homeLink + $(Scorcard_links[idx]).attr("href");
    scorecardmodulo.scorcardfile(link);
  });
}
function handelscorecard(link) {
  request(link, (error, response, html) => {
    if (error) {
      console.log(error);
    }
    if (html) {
      scorecard(html);
      // scorecard(html);
    }
  });
}
function scorecard(html) {
  let $ = cheerio.load(html);
  let match_header_info = $(".match-header-info.match-info-MATCH .description")
    .text()
    .split(",");
  let matchNo = match_header_info[0];
  let date = match_header_info[2];
  // console.log(match_header_info[0]);
  // console.log(match_header_info[2]);
  let winingTeam = $(
    ".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text"
  ).text();
  let winingteamSplit = winingTeam.split(" ");
  let WiningTeamName = winingteamSplit;
  console.log(winingTeam, matchNo, date, WiningTeamName[0]);

  console.log("`````````````````````````");
  let tabls = $(".card.content-block.match-scorecard-table .Collapsible");
  let tablehtml = "";
  for (let i = 0; i < tabls.length; i++) {
    tablehtml += $(tabls[i]).html();
    let otIdx = i == 0 ? 1 : 0;
    let myteamName = $(tabls[i]).find("h5").text().split("INNINGS")[0].trim();
    let opponentTeam = $(tabls[otIdx])
      .find("h5")
      .text()
      .split("INNINGS")[0]
      .trim();
    let myteambatsman = $(".table.batsman");
    let myteamTable = myteambatsman[i];
    let alltr = $(myteamTable).find("tbody tr");
    for (let i = 0; i < alltr.length; i++) {
      let alltds = $(alltr[i]).find("td");
      for (let i = 0; i < alltds.length; i++) {
        if ($(alltds[i]).hasClass("batsman-cell")) {
          let batsmanName = $(alltds[0]).text();
          let Balls = $(alltds[3]).text();
          let Fours = $(alltds[5]).text();
          let Sixes = $(alltds[6]).text();
          let StrikRate = $(alltds[7]).text();
          console.log(
            `${myteamName} ${batsmanName} ,${Balls} , ${Fours} ,${Sixes} , ${StrikRate}`
          );
          handelmakingfolder(
            myteamName,
            opponentTeam,
            batsmanName,
            Balls,
            Fours,
            Sixes,
            StrikRate
          );
        }
      }
    }
  }
}
function handelmakingfolder(
  myteamName,
  opponentTeam,
  batsmanName,
  Balls,
  Fours,
  Sixes,
  StrikRate
) {
  let myteamdirpath = path.join(teamdirpath, myteamName);
  if (!fs.existsSync(myteamdirpath)) {
    fs.mkdirSync(myteamdirpath);
  }
  let batsmanNamefilepath = path.join(myteamdirpath, batsmanName + ".xlsx");
  if (!fs.existsSync(batsmanNamefilepath)) {
    fs.writeFileSync(batsmanNamefilepath, "");
  }
  let objdata = {
    myteamName,
    opponentTeam,
    Balls,
    Fours,
    Sixes,
    StrikRate,
  };
  let readdata = excelReader(batsmanNamefilepath, batsmanName);
  readdata.push(objdata);
  excelWriter(batsmanNamefilepath, batsmanName, readdata);
}

function excelWriter(fileName, sheetName, jsonData) {
  let newWB = xlsx.utils.book_new();
  // Creating a new WorkBook
  let newWS = xlsx.utils.json_to_sheet(jsonData);
  // Json is converted to sheet format (rows and cols)
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  xlsx.writeFile(newWB, fileName);
}

function excelReader(fileName, sheetName) {
  if (fs.existsSync(fileName) == false) {
    return [];
  }
  let wb = xlsx.readFile(fileName);

  let excelData = wb.Sheets[sheetName];
  let ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}
