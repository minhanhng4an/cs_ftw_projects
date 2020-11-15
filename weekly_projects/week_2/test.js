const fs = require("fs");
var leaderboard;

let data = fs.readFileSync("leaderboard.txt");

leaderboard = data.toString().split("\n");
leaderboard = leaderboard.map((x) => x.split(","));

for (let i = 0; i < leaderboard.length; i++) {
  if (parseInt(leaderboard[i][0]) < parseInt(newScore[0])) {
    leaderboard.splice(i, 0, newScore);
    break;
  }
}

leaderboard = leaderboard.splice(0, 10);

let newString = leaderboard.map((x) => x.join(","));
newString = newString.join("\n");

fs.writeFileSync("leaderboard.txt", newString);
