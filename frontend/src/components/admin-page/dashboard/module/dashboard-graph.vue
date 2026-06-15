<template>
  <div class="mt-10">
    <div class="w-full max-h-full h-[50vh]">
      <h2 class="text-center mt-4 text-[16px] font-medium text-gray-600 mb-6">
        Monthly and Daily Data
      </h2>
      <canvas ref="chartCanvas" class="px-6"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "DashboardGraph",
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
          backgroundColor: "#159769",
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
          backgroundColor: "rgb(23, 163, 166)",
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
            boxRadius: 20,
            font: {
              size: 12,
              weight: "regular",
              family: "Poppins, sans-serif",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
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
            color: "#ffffff",
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
        type: "bar",
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
  max-height: auto;
}
</style>
