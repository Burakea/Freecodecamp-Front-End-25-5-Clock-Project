import React from "react";

/* eslint-disable no-unused-expressions */

function App() {
/* eslint-disable no-unused-expressions */
const [breakNumbers, setBreakNumbers] = React.useState(5);
const [sessionNumbers, setSessionNumbers] = React.useState(25)
const [play, setPlay] = React.useState(false)
const [timingType, setTimingType] = React.useState("SESSION")
const [timeLeft, setTimeLeft] = React.useState(1500);

const timeout = setTimeout(()=>{
  if(timeLeft>=0 && play){
    setTimeLeft(prev => prev -1)
  }
},1000)


const handleBreakIncrement = () =>{
    if(breakNumbers < 60){
      setBreakNumbers((prevBreak)=> prevBreak + 1)
    }
}


const handleBreakDecrement = () =>{
  if(breakNumbers > 1){
    setBreakNumbers((prevBreak)=> prevBreak - 1)
  }
}

const handleSessionIncrement = () =>{
  if(sessionNumbers < 60){
    setSessionNumbers(prevSession => prevSession + 1)
    setTimeLeft(prev => prev+60)
  }
}

const handleSessionDecrement = () =>{
  if(sessionNumbers > 1){
    setSessionNumbers(prevSession => prevSession - 1)
    setTimeLeft(prev => prev-60)
  }
}

const timeFormatter = () =>{
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft -( minutes * 60);
  const formattedSeconds = seconds < 10 ? "0"+ seconds : seconds
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
  return `${formattedMinutes}:${formattedSeconds}`
}

 
const handlePlay =() =>{
  clearTimeout(timeout)
  if(play){
    setPlay(false);
  } else {
    setPlay(true)
  }
}

const resetTimer = () =>{
  const audio = document.getElementById("beep")
  if(!timeLeft && timingType === "SESSION"){
    setTimeLeft(breakNumbers * 60)
    setTimingType("BREAK")
    audio.play()
  }
  if(!timeLeft && timingType === "BREAK"){
    setTimeLeft(sessionNumbers * 60)
    setTimingType("SESSION")
    audio.pause()
    audio.currentTime = 0;
  }
}

const clock =() =>{
  if(play){
    timeout
    resetTimer()
  }else{
    clearTimeout(timeout)
  }
}

const handleReset = () =>{
  clearTimeout(timeout);
  setPlay(false);
  setTimeLeft(1500);
  setBreakNumbers(5);
  setSessionNumbers(25);
  setTimingType("SESSION");
  const audio = document.getElementById("beep");
  audio.pause()
  audio.currentTime =0;
}

React.useEffect(()=>{
  return clock()
},[play, timeLeft, timeout])

const title = timingType === "SESSION" ? "Session" : "Break";



  return (
    <div className="hugger">
         <div className="container">
      <div>
        <h2 id="break-label" className="break-h">Break Length</h2>
        <div className="break-container">
        <button disabled={play} id="break-decrement" onClick={handleBreakDecrement}>Decrease</button>
        <p id="break-length">{breakNumbers}</p>
        <button disabled={play} id="break-increment" onClick={handleBreakIncrement}>Increase</button>
        </div>
      </div>
      <div >
      <h2 id="session-label" className="session-h">Session Length</h2>
        <div className="session-container">
        <button disabled={play} id="session-decrement" onClick={handleSessionDecrement}>Decrease</button>
        <p id="session-length">{sessionNumbers}</p>
        <button disabled={play} id="session-increment" onClick={handleSessionIncrement}>Increase</button>
        </div>
      </div>
    </div>
     <div className="bottom-container">
     <h3 id="timer-label">{title}</h3>
     <p id="time-left">{timeFormatter()}</p>
     <button id="start_stop" onClick={handlePlay}>Start/Stop</button>
     <button id="reset" onClick={handleReset}>Reset</button>
   </div>
   <audio preload="auto" id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/mpeg" ></audio>
    </div>
  );
}

export default App;

/* eslint-disable-line */


