import React from "react";
import PopulationGrowthPerCountryChart from "./components/PopulationGrowthPerCountryChart";
import RegionLayout from "./components/RejionLayout";
import MyLineChart from "./components/MyLineChart";

function App() {
  return (
    <div style={{padding: "30px"}} className="App">
      <header className="App-header">
        <h1 >Population growth per country, 1950 to 2021</h1>
        <h2>Click in the legend below to filter by continent 👇</h2>

        {/* Display region and color */}
        <RegionLayout />
        {/* Display Chart and All Data */}
        <PopulationGrowthPerCountryChart />

        {/* <MyLineChart /> */}
    
      </header>
    </div>
  );
}

export default App;
