const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timer, seTtimer] = React.useState(1500);
  const [timing, settiming] = React.useState("SESSION");

  const [play, setPlay] = React.useState(false);

  const timeout = setTimeout(() => {
    if (timer && play) {
      seTtimer(timer - 1);
    }
  }, 1000);

  const breakInc = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const breakDec = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleInc = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimer(timer + 60);
    }
  };

  const handleDec = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimer(timer - 60);
    }
  };

  const reset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimer(1500);
    setBreakLength(5);
    setSessionLength(25);
    settiming("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timer && timing === "SESSION") {
      seTtimer(breakLength * 60);
      settiming("BREAK");
      audio.play();
    }
    if (!timer && timing === "BREAK") {
      seTtimer(sessionLength * 60);
      settiming("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timer, timeout]);

  const formatter = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timing === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="bool">
        <h1>25 + 5 Clock...</h1>
        <div className="display">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button onClick={breakInc} disabled={play} id="break-increment">
                +
              </button>
              <strong id="break-length">{breakLength}</strong>
              <button disabled={play} onClick={breakDec} id="break-decrement">
                -
              </button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <button
                id="session-increment"
                disabled={play}
                onClick={handleInc}
              >
                +
              </button>
              <strong id="session-length">{sessionLength}</strong>
              <button
                id="session-decrement"
                disabled={play}
                onClick={handleDec}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="time">
          <div className="wrap">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{formatter()}</h3>
          </div>
          <button onClick={handlePlay} id="start_stop">
            Go/Stop
          </button>
          <button onClick={reset} id="reset">
            R
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
