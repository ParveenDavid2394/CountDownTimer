const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


// get target elements
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2020, 9, 7, 0, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const day = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const seconds = futureDate.getSeconds();

giveaway.textContent = `Giveaway ends on ${day}, ${date} ${month} ${year},   ${formatTime(hours)}:${formatTime(minutes)}am`;

// future date in ms
const futureTime = futureDate.getTime();

// format time -> place 0 infront of the digit
function formatTime(item) {
	if (item < 10) {
		return item = `0${item}`;
	}

	return item
}

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime-today;

  // values in ms ( Constants )
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // convert values from ms back to original
  let d = Math.floor(t / oneDay);
  let h = Math.floor(t % oneDay / oneHour);
  let min = Math.floor(t % oneHour / oneMinute);
  let sec = Math.floor(t% oneMinute / 1000);

  // set up value array
  const values = [d,h,min,sec];

  // place the values into the timer
  items.forEach( (item, index) => {
    item.innerHTML = formatTime(values[index]);
  })

  // if countdown expired, use clearInterval to stop reloading page
  if (t < 0) {
	  clearInterval(countdown);
	  // place text to replace countdown
	  deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
  }

}

// countdown timer -> use setInterval, calls function every 1000ms or 1s
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();