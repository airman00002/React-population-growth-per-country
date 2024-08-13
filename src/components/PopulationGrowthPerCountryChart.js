import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./../styles/population.css";
import regionColors from "../constant/defaultColor.js";
import getSymbol from "../constant/symbol.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // นำเข้า plugin
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from "chart.js";
import { fetchPopulationData } from "../services/populationService";
import MyLineChart from "./MyLineChart";
import { ClipLoader } from "react-spinners"; // นำเข้า loader ที่ต้องการใช้

// 1.Register necessary components for ChartJS
ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels // เพิ่มเข้าไปที่นี่  
);

function PopulationGrowthPerCountryChart() {
  const [currentYear, setCurrentYear] = useState(1950);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // 2.Fetch population data on component mount
  useEffect(() => {
    fetchPopulationData()
      .then((response) => {
        console.log(response);
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  // 3. Update current year in an interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prevYear) => {
        // หากถึงปีล่าสุด ให้วนกลับไปที่ปีเริ่มต้น
        if (prevYear >= 2021) return 1950;
        return prevYear + 1;
      });
    }, 100);

    return () => clearInterval(interval); // clear เมื่อคอมโพเนนต์ถูกยกเลิก
  }, []);

  // 4.Filter and sort data for the current year
  const filteredData = data
    .filter((item) => item.year === currentYear)
    .sort((a, b) => b.totalPopulation - a.totalPopulation)
    .slice(0, 12);

  // 5.Calculate total population for the current year
  const totalPopulationForYear = data
    .filter((item) => item.year === currentYear) // กรองข้อมูลตามปี
    .reduce((sum, item) => sum + item.totalPopulation, 0); // คำนวณผลรวม

    if (loading) {
      return (
        <div className="loading-container">
          <ClipLoader color={"#3498db"} size={300}  speedMultiplier={0.5}/>
        </div>
      );
    }
  if (!data || data.length === 0) return <h1>No data available</h1>;


  // 6.Calculate pointer position for the year timeline
  const totalYears = 2021 - 1950;
  const pointerPosition = ((currentYear - 1950) / totalYears) * 100; // เปลี่ยนเป็นเปอร์เซ็นต์
  
  //* 7.Chart data configuration
  const chartData = {
    // แกน X
    labels: filteredData.map((item) => item.countryName),
    datasets: [
      {
        // แกน Y
        label: "Total Population",
        data: filteredData.map((item) => item.totalPopulation),
        backgroundColor: filteredData.map(
          (item) => regionColors[item.region] || "rgba(73, 255, 192, 0.6)"
        ),
      },
    ],
  };

  //* 8.Chart options configuration
  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        position: "top",
        ticks: {
          callback: function (value) {
            return value.toLocaleString("en-US");
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {  
      datalabels: {  
        anchor: 'end',  
        align: 'end',  
        formatter: (value, context) => {  
          const flag = getSymbol(context.chart.data.labels[context.dataIndex]);  
          return `${flag} ${value.toLocaleString("en-US")}`;  
        },  
        color: "black",  
        offset: 4, 
        font: {  
          size: 16,  
        },  
      },  
    },  
  }; 

  return (
    <div>
      {/* 1. Year and Total */}
      <div className="chart-container">
      <div className="year-total-container">
                  <h1 className="setFontSizeOfYear">{currentYear}</h1>
                  <h4 className="setFontSizeOfTotal">
                    Total: {totalPopulationForYear.toLocaleString("en-US")}
                  </h4>
                </div>
        </div>

      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <div style={{position: "absolute",top: "0%",width: "100%",height: "100%"}}>
          
          {/* 2.Bar */}
            <Bar className="myBarPopulaiton" data={chartData} options={chartOptions}/>
      
          {/* 3.Year Pointer */}
          <div className="timeline">
            <div className="pointer" style={{ left: `${pointerPosition}%` }} // กำหนดตำแหน่งของ pointer
            />
          </div>
        </div>
      </div>

       <MyLineChart />
    </div>

    
  );
}

export default PopulationGrowthPerCountryChart;
