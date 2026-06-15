<template>
  <div class="">
    <div
      class="w-full bg-white rounded-2xl min-max-h-full h-[60vh] p-6 shadow-sm"
    >
      <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">
        Monthly and Daily Data
      </h2>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "ChartComponent",
  setup() {
    const chartCanvas = ref(null);

    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Monthly Data",
          data: [65, 59, 80, 81, 56, 55, 40, 55, 60, 90, 75, 80],
          borderColor: "#4c51bf",
          backgroundColor: "rgba(76, 81, 191, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#4c51bf",
          pointBorderColor: "#fff",
          pointBorderWidth: 3,
        },
        {
          label: "Daily Data",
          data: [1, 2, 3, 5, 3, 6, 7, 8, 6, 9, 10, 11],
          borderColor: "#f56565",
          backgroundColor: "rgba(245, 101, 101, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#f56565",
          pointBorderColor: "#fff",
          pointBorderWidth: 3,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 20,
            font: {
              size: 12,

              weight: "regular",
              family: "Poppins, sans-serif",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "#fff",
          bodyColor: "#fff",
          bodyFont: {
            size: 12,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
              family: "Poppins, sans-serif",
            },
            color: "#4a5568",
          },
          grid: {
            color: "#F8F8F8",
            borderColor: "#F8F8F8",
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
              family: "Poppins, sans-serif",
            },
            color: "#4a5568",
          },
          grid: {
            color: "#e2e8f0",
            borderColor: "#edf2f7",
          },
        },
      },
    };

    onMounted(() => {
      new Chart(chartCanvas.value, {
        type: "line",
        data: data,
        options: options,
      });
    });

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
canvas {
  max-height: 400px;
}
</style>
