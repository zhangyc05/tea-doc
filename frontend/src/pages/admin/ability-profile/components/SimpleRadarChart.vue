<script setup lang="ts">
import { computed } from 'vue'

interface ScoreData {
  label: string
  value: number
}

interface RadarChartProps {
  scores: ScoreData[]
  centerText?: string
  size?: number
}

const props = withDefaults(defineProps<RadarChartProps>(), {
  centerText: '',
  size: 280,
})

// 计算雷达图的多边形点
const radarPoints = computed(() => {
  const scores = props.scores
  const count = scores.length
  const angleStep = (2 * Math.PI) / count

  // 假设最大值为100
  const maxValue = 100
  const radius = 80 // 雷达图半径

  return scores.map((score, index) => {
    const angle = angleStep * index - Math.PI / 2
    const normalizedValue = score.value / maxValue
    const x = Math.cos(angle) * normalizedValue * radius
    const y = Math.sin(angle) * normalizedValue * radius
    return { x, y }
  })
})

// 背景多边形点
const backgroundPoints = computed(() => {
  const count = props.scores.length
  const angleStep = (2 * Math.PI) / count
  const radius = 80

  return Array.from({ length: count }, (_, index) => {
    const angle = angleStep * index - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  })
})

// 生成多边形路径字符串
const generatePolygonPath = (points: { x: number; y: number }[]) => {
  if (points.length === 0) return ''

  const path = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${command} ${point.x} ${point.y}`
  }).join(' ')

  return path + ' Z'
}

// 轴标签位置
const axisLabels = computed(() => {
  const scores = props.scores
  const count = scores.length
  const angleStep = (2 * Math.PI) / count
  const radius = 95

  return scores.map((score, index) => {
    const angle = angleStep * index - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y, label: score.label }
  })
})

// 计算背景多边形点字符串
const backgroundPolygonPoints = computed(() => {
  return backgroundPoints.value.map(point => {
    return `${point.x} ${point.y}`
  }).join(' ')
})

// 计算数据多边形点字符串
const radarPolygonPoints = computed(() => {
  return radarPoints.value.map(point => {
    return `${point.x} ${point.y}`
  }).join(' ')
})
</script>

<template>
  <div class="radar-chart-container">
    <svg :width="size" :height="size" viewBox="0 0 200 200">
      <g transform="translate(100, 100)">
        <!-- 背景多边形（五层同心多边形） -->
        <polygon
          v-for="i in 5"
          :key="`bg-${i}`"
          :points="backgroundPolygonPoints"
          :transform="`scale(${i / 5})`"
          fill="none"
          stroke="#e2e8f0"
          stroke-width="1"
        />

        <!-- 数据多边形 -->
        <polygon
          :points="radarPolygonPoints"
          fill="rgba(47, 191, 155, 0.2)"
          stroke="var(--color-primary)"
          stroke-width="2"
        />

        <!-- 轴线 -->
        <line
          v-for="(point, index) in backgroundPoints"
          :key="`axis-${index}`"
          x1="0"
          y1="0"
          :x2="point.x"
          :y2="point.y"
          stroke="#e2e8f0"
          stroke-width="1"
        />

        <!-- 轴标签 -->
        <text
          v-for="(label, index) in axisLabels"
          :key="`label-${index}`"
          :x="label.x"
          :y="label.y"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="11"
          fill="#64748b"
        >
          {{ label.label }}
        </text>

        <!-- 中心文字 -->
        <text
          v-if="centerText"
          x="0"
          y="0"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="10"
          fill="#64748b"
          font-weight="500"
        >
          {{ centerText }}
        </text>
      </g>
    </svg>

    <!-- 图例 -->
    <div class="radar-legend">
      <div class="legend-item">
        <span class="legend-dot"></span>
        <span class="legend-text">0-25 新手教师</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot"></span>
        <span class="legend-text">25-50 胜任教师</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot"></span>
        <span class="legend-text">50-75 骨干教师</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot"></span>
        <span class="legend-text">75-100 名师教师</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.radar-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.radar-legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
}

.legend-text {
  font-size: 11px;
  color: var(--color-text-secondary);
}
</style>