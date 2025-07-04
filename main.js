// ================== 动态数字动画 ==================
function animateNumber(element, start, end, duration = 1000) {
  const range = end - start;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    element.textContent = Math.round(start + range * progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// ================== 示例数据（后续对接 /api/food-history, /api/activity-log） ==================
const intake = 1680; // 卡路里
const carb = 220;    // 碳水
const protein = 95;  // 蛋白质
const fat = 60;      // 脂肪

// ================== 页面加载后渲染动态数字和图表 ==================
document.addEventListener('DOMContentLoaded', () => {
  animateNumber(document.getElementById('intake-value'), 0, intake, 1200);
  animateNumber(document.getElementById('carb-value'), 0, carb, 1200);
  animateNumber(document.getElementById('protein-value'), 0, protein, 1200);
  animateNumber(document.getElementById('fat-value'), 0, fat, 1200);
  renderCalorieChart();
  renderMacroChart();
});

// ================== 卡路里表 ==================
function renderCalorieChart() {
  // 横坐标为早上/中午/下午/晚上，下午有摄入和消耗
  const labels = ['早上', '中午', '下午', '晚上'];
  const intakeData = [400, 600, 300, 500]; // 下午摄入300
  const burnData = [100, 250, 600, 0]; // 下午消耗600，其余为0

  const ctx = document.getElementById('calorieChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '摄入 (kcal)',
          data: intakeData,
          backgroundColor: 'rgba(255, 167, 38, 0.85)',
          borderRadius: 8,
          barPercentage: 0.6,
        },
        {
          label: '消耗 (kcal)',
          data: burnData,
          backgroundColor: 'rgba(76, 175, 80, 0.75)',
          borderRadius: 8,
          barPercentage: 0.6,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ffa726',
            font: { weight: 'bold', size: 16 }
          }
        },
        tooltip: {
          backgroundColor: '#ffa726',
          titleColor: '#fff',
          bodyColor: '#fff',
        },
        datalabels: {
          anchor: 'end',
          align: 'start',
          offset: 4,
          color: '#fff',
          font: { weight: 'bold', size: 16 },
          formatter: Math.round,
          clip: true
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 600
      },
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      onClick: (event, chartElements) => {
        if (chartElements.length > 0) {
          const datasetIndex = chartElements[0].datasetIndex;
          const index = chartElements[0].index;
          const label = event.chart.data.labels[index];
          const value = event.chart.data.datasets[datasetIndex].data[index];
          const type = event.chart.data.datasets[datasetIndex].label;
          alert(`${type} - ${label}: ${value}`);
        }
      },
      scales: {
        x: {
          ticks: { color: '#ffa726', font: { weight: 'bold' } },
          grid: { display: false }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutBounce'
      }
    },
    plugins: [ChartDataLabels]
  });
}

// ================== 三大营养素表 ==================
function renderMacroChart() {
  // 只显示早餐、午餐、晚餐的三大营养素
  const labels = ['早餐', '午餐', '晚餐'];
  const carbData =    [60,  90,  80];
  const proteinData = [20,  30,  25];
  const fatData =     [10,  15,  12];

  const ctx = document.getElementById('macroChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '碳水 (g)',
          data: carbData,
          backgroundColor: 'rgba(66, 165, 245, 0.85)',
          borderRadius: 8,
          barPercentage: 0.6,
        },
        {
          label: '蛋白质 (g)',
          data: proteinData,
          backgroundColor: 'rgba(102, 187, 106, 0.85)',
          borderRadius: 8,
          barPercentage: 0.6,
        },
        {
          label: '脂肪 (g)',
          data: fatData,
          backgroundColor: 'rgba(239, 83, 80, 0.85)',
          borderRadius: 8,
          barPercentage: 0.6,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#42a5f5',
            font: { weight: 'bold', size: 16 }
          }
        },
        tooltip: {
          backgroundColor: '#42a5f5',
          titleColor: '#fff',
          bodyColor: '#fff',
        },
        datalabels: {
          anchor: 'end',
          align: 'start',
          offset: 4,
          color: '#fff',
          font: { weight: 'bold', size: 16 },
          formatter: Math.round,
          clip: true
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 600
      },
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      onClick: (event, chartElements) => {
        if (chartElements.length > 0) {
          const datasetIndex = chartElements[0].datasetIndex;
          const index = chartElements[0].index;
          const label = event.chart.data.labels[index];
          const value = event.chart.data.datasets[datasetIndex].data[index];
          const type = event.chart.data.datasets[datasetIndex].label;
          alert(`${type} - ${label}: ${value}`);
        }
      },
      scales: {
        x: {
          ticks: { color: '#42a5f5', font: { weight: 'bold' } },
          grid: { display: false }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutBounce'
      }
    },
    plugins: [ChartDataLabels]
  });
}

// ================== 控制面板按钮事件 ==================
function captureImage() {
  // TODO: 对接摄像头接口 /api/capture
  alert('拍摄食物功能触发！（后续对接 /api/capture）');
}

function startExercise() {
  // TODO: 对接运动开始接口 /api/start-exercise
  alert('开始运动功能触发！（后续对接 /api/start-exercise）');
} 