import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./../styles/population.css";
import regionColors from "../constant/defaultColor.js";
import getSymbol from "../constant/symbol.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // นำเข้า plugin
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from "chart.js";
import { fetchPopulationData } from "../services/populationService";

ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels // เพิ่มเข้าไปที่นี่  
);

function PopulationGrowthPerCountryChart() {
  const [currentYear, setCurrentYear] = useState(1950);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prevYear) => {
        // หากถึงปีล่าสุด ให้วนกลับไปที่ปีเริ่มต้น
        if (prevYear >= 2021) return 1950;
        return prevYear + 1;
      });
    }, 100);

    return () => clearInterval(interval); // ทำความสะอาดเมื่อคอมโพเนนต์ถูกยกเลิก
  }, []);

  // กรองข้อมูลสำหรับปีปัจจุบันและเรียงลำดับ
  const filteredData = data
    .filter((item) => item.year === currentYear)
    .sort((a, b) => b.totalPopulation - a.totalPopulation)
    .slice(0, 12);

  const totalPopulationForYear = data
    .filter((item) => item.year === currentYear) // กรองข้อมูลตามปี
    .reduce((sum, item) => sum + item.totalPopulation, 0); // คำนวณผลรวม

  if (loading) return <h1>Loading...</h1>;
  if (!data || data.length === 0) return <h1>No data available</h1>;


  const totalYears = 2021 - 1950;
  const pointerPosition = ((currentYear - 1950) / totalYears) * 100; // เปลี่ยนเป็นเปอร์เซ็นต์
  
  //* 1.Chart Data
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

  //* 2.Chart Options
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
    </div>
  );
}

export default PopulationGrowthPerCountryChart;
