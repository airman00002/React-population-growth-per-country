import React from "react";
import { Bar } from "react-chartjs-2";
import "./../styles/population.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียน Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// create example data
const yearData = {
  labels: Array.from({ length: 72 }, (_, i) => 1950 + i), // ปี 1950 ถึง 2021
  datasets: [
    {
      label: "Year", // ชื่อกราฟ
      data: Array(72).fill(0), // ไม่แสดงกราฟเส้น
      borderColor: "transparent", // โปร่งใส
      backgroundColor: "transparent", //โปร่งใส
      pointBorderColor: "transparent", // โปร่งใส
      pointBackgroundColor: "transparent", // โปร่งใส
    },
  ],
};

const yearOptions = {
  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      enabled: false, 
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
      },
      grid: {
        display: false,
      },
      ticks: {
        callback: function (val, index) {
          const year = this.getLabelForValue(val);
          return year % 4 === 0 ? year : "";
        },
      },
      min: 1950, // เริ่มต้นที่ปี 1950
    },
    y: {
      display: false,
    },
  },
};

function MyLineChart() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative'}}>
      <div className="lineChartTopUp">
        <Bar data={yearData} options={yearOptions} />
      </div>
    </div>
  );
}

export default MyLineChart;