// Your script here.
let intervalId = undefined;

const userInput = document.querySelector("#userInput");
const startTimerButton = document.querySelector(".timer > button");

const stopTimerButton = document.querySelector("#stop-timer");

const countDownDisplay = document.getElementById("countDown");
const endsAtDisplay = document.getElementById("endTime");

startTimerButton.addEventListener("click", startNewTimer);


function startNewTimer(event) {

	// close any pre-existing timers
	if(intervalId) {
		clearInterval(intervalId);
	}

	// null check
	if (userInput.value === '') {
		alert("Enter a valid duration for timer");
		userInput.value = '10';
	}	

	// display initial value
	showCountdownFunction(userInput.value);
    showTimerEnd();
	
	// start timer
	intervalId =setInterval(()=> {
		decrementTimer(countDownDisplay.innerText);
	}, 1000);
	
}

function showCountdownFunction(selectedMinutes, h, m, s) {
    // console.info(selectedMinutes, h, m, s);
    
    if(h!==undefined && m!==undefined && s!==undefined) {
        countDownDisplay.textContent = `${h}:${m}:${s}`;		
        // console.info('displayed', countDownDisplay.textContent);

		if(h===0 && m=== 0 && s===0) {
			clearInterval(intervalId);
		}
        return;

	}	
	let hours = 0, minutes, seconds;
	
	if(parseInt(selectedMinutes) > 60) {
		hours = Math.floor(parseInt(selectedMinutes) / 60);
	}
	minutes = Math.floor(parseInt(selectedMinutes) % 60);
	seconds = 0;

	countDownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function showTimerEnd() {
	const timerDuration = Number(userInput.value);

	const currTime = new Date();
	currTime.setTime(currTime.getTime() + timerDuration*60*1000);

	const endTime = currTime.toLocaleTimeString();
	const displayTimerEnd = endTime.slice(0, endTime.lastIndexOf(':')) +" "+ endTime.slice(-2);

	endsAtDisplay.textContent = displayTimerEnd;
}

function decrementTimer(timerValue) {

	let seconds = Number(timerValue.slice(timerValue.lastIndexOf(':')+1));
	let minutes = Number(timerValue.slice(timerValue.indexOf(':') + 1, timerValue.lastIndexOf(":")));
	let hours = Number(timerValue.slice(0, timerValue.indexOf(':')));
    // console.log(hours, minutes, seconds);

    
	seconds--;
	if(hours === 0 && minutes===0 && seconds===0) {
		showCountdownFunction(undefined, hours, minutes, seconds);
	}
	else {
		if(seconds=== -1) {
			seconds = 59;
			minutes--;

			if(minutes < 0) {
                
                minutes = 59;
				hours--;
				
			}
		}
		showCountdownFunction(undefined, hours, minutes, seconds);
	}
	
}