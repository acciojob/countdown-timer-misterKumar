const countDownDisplay=document.querySelector("#countDown");
const endTimeDisplay=document.querySelector("#endTime");

document.querySelector("button").addEventListener("click",()=>{
    let countDownTime=document.querySelector("input").value;
    let currDate=new Date();
    let endTime=addMinutes(currDate,Number(countDownTime));
    console.log(endTime);
    countDownDisplay.textContent=currDate.toLocaleTimeString();
    endTimeDisplay.textContent=formatEndTime(endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    endTime=endTime.toLocaleTimeString();
    let displayTime = setInterval(()=>{
        let currTime = new Date().toLocaleTimeString();
        countDownDisplay.textContent=currTime;
        if( currTime==endTime) clearInterval(displayTime);
    },1000)
})

const addMinutes=(date,mins)=>{
    date.setMinutes(date.getMinutes()+mins);
    return date;
}

const formatEndTime=(timeString)=>{
    const [hours, minutes, meridiem] = timeString.split(/:| /);
    const formattedTimeString = `${parseInt(hours, 10)}:${minutes} ${meridiem}`;
    return formattedTimeString;
}