const cheerio = require("cheerio");
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
        }
      }
    }
  }
}
module.exports = {
  scorecordfun: scorecard(),
};
