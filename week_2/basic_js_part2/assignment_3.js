// Question 1 + 2
var workingHours = [6, 6, 7, 7, 8, 8, 6, 7, 8, 7];

var total = 0;

for (var i = 0; i <= workingHours.length - 1; i++) {
  total = total + workingHours[i] * 25;
  console.log(`Peter earned $${workingHours[i] * 25} today`);
}

console.log(`Peter made $${total} in the last two weeks!`);

// Question 3
function getRandomInt(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

var yearlyRevenue = 0;

for (var i = 1; i <= 250; i++) {
  yearlyRevenue = yearlyRevenue + getRandomInt(6, 8) * 25;
}

console.log(`Peter's Estimated Yearly Revenue: $${yearlyRevenue}`);

function estimateRevenue(week) {
  var yearlyRevenue = 0;

  for (var i = 1; i <= week * 5; i++) {
    yearlyRevenue = yearlyRevenue + getRandomInt(6, 8) * 25;
  }

  return yearlyRevenue;
}

console.log(`Peter's Estimated Revenue in ${5} weeks: $${estimateRevenue(5)}`);
