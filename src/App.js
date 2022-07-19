import React, { useState, useEffect } from "react";
import { WeatherComponent } from "./components/WeatherComponent";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

function App() {
  const [theme, setTheme] = useState("light");
  const [dayOrNight, setDayOrNight] = useState("d");

  // const themeToggler = (dayOrNight) => {
  //   // theme === "light" ? setTheme("dark") : setTheme("light");
  // };

  const handleCallback = (weatherTime) => {
    setDayOrNight(weatherTime);
    console.log(dayOrNight);
    if (dayOrNight === "d") {
      setTheme("light");
    } else if (dayOrNight === "n") {
      setTheme("dark");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="app">
          <WeatherComponent parentCallback={handleCallback} />
          {/* <button onClick={themeToggler}>Switch Theme</button> */}
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
