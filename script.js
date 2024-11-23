let startTimerbtn= document.getElementById("set");
let timerList= document.getElementById("timerlist");

let timers=[];

startTimerbtn.addEventListener("click",()=>{
    const hours= parseInt(document.getElementById("hours").value) || 0;
    const minutes= parseInt(document.getElementById("minutes").value) || 0;
    const seconds= parseInt(document.getElementById("seconds").value) || 0;
    
    const totalSeconds= hours*3600 + minutes*60 + seconds;

    if(totalSeconds>0)
    {
        createTimer(totalSeconds);
    }
    else
    {
        alert("please enter valid time!");
    }
        
});

function createTimer(duration)
{
    const timerId= Date.now();
    const timerElement= document.createElement("div");
    timerElement.className="timer-item";
    timerElement.dataset.id= timerId;

    const timeDisplay= document.createElement("span");
    timeDisplay.textContent = formatTime(duration);
    timerElement.appendChild(timeDisplay);


    const stopButton= document.createElement("button");
    stopButton.textContent="Delete";
    stopButton.addEventListener("click",()=>stopTimer(timerId));

    timerElement.appendChild(stopButton);

    timerList.innerHTML=""; //this will clear no active timer message
    timerList.appendChild(timerElement);

    const timer={id: timerId, duration, element: timerElement, interval: null};

    timer.interval= setInterval(()=>{
        timer.duration--;
        timeDisplay.textContent= formatTime(timer.duration);

        if(timer.duration<=0)
        {
            clearInterval(timer.interval);
            timerElement.classList.add("completed");
            timeDisplay.textContent= "Time is UP!";
            displayGif(timerElement); //show Gif
            playApiAudio(); //play sounds from API
        }
    },1000);

    timers.push(timer);
}

function stopTimer(timerId)
{
    const timer = timers.find((t) => t.id === timerId);
    if (timer) 
    {
        clearInterval(timer.interval);
        timers = timers.filter((t) => t.id !== timerId);
        timer.element.remove();
        if (timers.length === 0) timerList.innerHTML = "<p>No active timers.</p>";
  }
}

function formatTime(seconds){
    const h=String(Math.floor(seconds/3600)).padStart(2,"0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function playApiAudio() {
    const audio = new Audio("https://storage.googleapis.com/acciojob-open-file-collections/ab49cbce-b4a4-42c9-bf99-8952f45bdf04_image.gif");
    audio.play();
  }
  
  function displayGif(timerElement) {
    const gifElement = document.createElement("img");
    gifElement.src = "https://storage.googleapis.com/acciojob-open-file-collections/ab49cbce-b4a4-42c9-bf99-8952f45bdf04_image.gif";
    gifElement.alt = "Timer Ended";
    gifElement.style.width = "100%";
    gifElement.style.borderRadius = "5px";
  
    // Replace timer display with GIF
    timerElement.innerHTML = ""; // Clear existing content
    timerElement.appendChild(gifElement);
  }