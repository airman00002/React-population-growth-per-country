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
// สร้างข้อมูลตัวอย่าง
const yearData = {
  labels: Array.from({ length: 72 }, (_, i) => 1950 + i), // ปี 1950 ถึง 2021
  datasets: [
    {
      label: "Year", // ชื่อกราฟ
      data: Array(72).fill(0), // ข้อมูลประชากรเป็น 0 เพื่อไม่แสดงกราฟเส้น
      borderColor: "transparent", // ทำให้เส้นโปร่งใส
      backgroundColor: "transparent", // ทำให้พื้นหลังโปร่งใส
      pointBorderColor: "transparent", // ทำให้จุดโปร่งใส
      pointBackgroundColor: "transparent", // ทำให้จุดโปร่งใส
    },
  ],
};

const yearOptions = {
  plugins: {
    legend: {
      display: false, // ไม่แสดง legend
    },
    tooltip: {
      enabled: false, // ไม่แสดง tooltip
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
      },
      grid: {
        display: false, // ไม่แสดงเส้น grid บนแกน X
      },
      ticks: {
        callback: function (val, index) {
          const year = this.getLabelForValue(val);
          return year % 4 === 0 ? year : ""; // แสดงปีที่หาร 4 ลงตัว
        },
      },
      min: 1950, // เริ่มต้นที่ปี 1950
    },
    y: {
      display: false, // ไม่แสดงแกน Y
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