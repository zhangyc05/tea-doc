<script setup lang="ts">
import { computed } from 'vue'

interface ScoreData {
  label: string
  value: number
}

interface StageRing {
  label: string
  max: number
  color: string
}

interface RadarChartProps {
  scores: ScoreData[]
  centerText?: string
  centerLabel?: string
  centerStatus?: string
  dimensionColors?: Record<string, string>
  stageRings?: StageRing[]
  size?: number
}

const props = withDefaults(defineProps<RadarChartProps>(), {
  centerText: '',
  centerLabel: '',
  centerStatus: '',
  dimensionColors: () => ({}),
  stageRings: () => [
    { label: '新手', max: 25, color: '#94a3b8' },
    { label: '胜任', max: 50, color: '#3b82f6' },
    { label: '骨干', max: 75, color: '#18b76b' },
    { label: '名师', max: 100, color: '#ff7a00' },
  ],
  size: 280,
})

const chartRadius = 78
const axisLabelRadius = 104
const stageFillOpacity = 0.18

const radarPoints = computed(() => {
  const scores = props.scores
  const count = scores.length
  const angleStep = (2 * Math.PI) / count

  return scores.map((score, index) => {
    const angle = angleStep * index - Math.PI / 2
    const normalizedValue = Math.max(0, Math.min(score.value, 100)) / 100
    const x = Math.cos(angle) * normalizedValue * chartRadius
    const y = Math.sin(angle) * normalizedValue * chartRadius
    return {
      x,
      y,
      label: score.label,
      value: score.value,
      color: getDimensionColor(score.label),
      stage: getStageLabel(score.value),
    }
  })
})

const backgroundPoints = computed(() => {
  const count = props.scores.length
  const angleStep = (2 * Math.PI) / count

  return Array.from({ length: count }, (_, index) => {
    const angle = angleStep * index - Math.PI / 2
    const x = Math.cos(angle) * chartRadius
    const y = Math.sin(angle) * chartRadius
    return { x, y }
  })
})

const axisLines = computed(() => {
  return backgroundPoints.value.map((point, index) => {
    const score = props.scores[index]
    return {
      ...point,
      label: score?.label ?? '',
      color: getDimensionColor(score?.label ?? ''),
    }
  })
})

const axisLabels = computed(() => {
  const scores = props.scores
  const count = scores.length
  const angleStep = (2 * Math.PI) / count

  return scores.map((score, index) => {
    const angle = angleStep * index - Math.PI / 2
    const x = Math.cos(angle) * axisLabelRadius
    const y = Math.sin(angle) * axisLabelRadius
    return {
      x,
      y,
      label: score.label,
      value: score.value,
      color: getDimensionColor(score.label),
    }
  })
})

const scoreLabels = computed(() => {
  return radarPoints.value.map(point => {
    const distance = Math.sqrt(point.x * point.x + point.y * point.y) || 1
    const offset = 13
    return {
      ...point,
      scoreX: point.x + (point.x / distance) * offset,
      scoreY: point.y + (point.y / distance) * offset,
    }
  })
})

const backgroundPolygonPoints = computed(() => {
  return backgroundPoints.value.map(point => {
    return `${point.x} ${point.y}`
  }).join(' ')
})

const radarPolygonPoints = computed(() => {
  return radarPoints.value.map(point => {
    return `${point.x} ${point.y}`
  }).join(' ')
})

const ringPolygons = computed(() => {
  return props.stageRings.map((ring, index) => {
    const maxScale = Math.max(0, Math.min(ring.max, 100)) / 100
    const previousMax = index === 0 ? 0 : props.stageRings[index - 1].max
    const minScale = Math.max(0, Math.min(previousMax, 100)) / 100
    return {
      ...ring,
      points: scalePolygonPoints(maxScale),
      innerPoints: scalePolygonPoints(minScale),
      bandPath: createBandPath(minScale, maxScale),
    }
  })
})

const stageLabels = computed(() => {
  return props.stageRings.map((ring, index) => ({
    ...ring,
    y: -chartRadius + (index + 0.72) * ((chartRadius * 2) / props.stageRings.length),
  }))
})

const centerPrimaryText = computed(() => props.centerLabel || props.centerText)
const centerSecondaryText = computed(() => props.centerStatus || '')

function scalePolygonPoints(scale: number) {
  return backgroundPoints.value.map(point => `${point.x * scale} ${point.y * scale}`).join(' ')
}

function polygonPath(scale: number, reverse = false) {
  const points = backgroundPoints.value.map(point => ({
    x: point.x * scale,
    y: point.y * scale,
  }))
  const orderedPoints = reverse ? points.reverse() : points
  return orderedPoints.map((point, index) => {
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  }).join(' ') + ' Z'
}

function createBandPath(minScale: number, maxScale: number) {
  if (minScale <= 0) return polygonPath(maxScale)
  return `${polygonPath(maxScale)} ${polygonPath(minScale, true)}`
}

function getDimensionColor(label: string) {
  return props.dimensionColors[label] || '#0b63f6'
}

function getStageLabel(value: number) {
  return props.stageRings.find(ring => value <= ring.max)?.label || props.stageRings[props.stageRings.length - 1]?.label || ''
}
</script>

<template>
  <div class="radar-chart-container">
    <svg :width="size" :height="size" viewBox="0 0 240 240" role="img" aria-label="学校教师队伍能力结构雷达图">
      <g transform="translate(120, 120)">
        <path
          v-for="ring in ringPolygons"
          :key="`band-${ring.label}`"
          class="radar-stage-band"
          :d="ring.bandPath"
          :fill="ring.color"
          :fill-opacity="stageFillOpacity"
          fill-rule="evenodd"
        />

        <polygon
          v-for="ring in ringPolygons"
          :key="ring.label"
          class="radar-stage-ring"
          :points="ring.points"
          fill="none"
          :stroke="ring.color"
          stroke-width="1.4"
        />

        <line
          v-for="line in axisLines"
          :key="`axis-${line.label}`"
          class="radar-axis-line"
          x1="0"
          y1="0"
          :x2="line.x"
          :y2="line.y"
          :stroke="line.color"
          stroke-width="2"
        />

        <polygon
          :points="backgroundPolygonPoints"
          fill="rgba(255, 255, 255, 0.44)"
          stroke="none"
        />

        <polygon
          :points="radarPolygonPoints"
          fill="rgba(11, 99, 246, 0.24)"
          stroke="#0b63f6"
          stroke-width="3.8"
          stroke-linejoin="round"
        />

        <circle
          v-for="point in radarPoints"
          :key="`point-${point.label}`"
          class="radar-axis-dot"
          :cx="point.x"
          :cy="point.y"
          r="4.8"
          :fill="point.color"
        >
          <title>{{ point.label }} {{ point.value }} 分，{{ point.stage }}阶段</title>
        </circle>

        <text
          v-for="point in scoreLabels"
          :key="`score-${point.label}`"
          class="radar-score-label"
          :x="point.scoreX"
          :y="point.scoreY"
          text-anchor="middle"
          dominant-baseline="middle"
          :fill="point.color"
        >
          {{ point.value }}
        </text>

        <text
          v-for="(label, index) in axisLabels"
          :key="`label-${index}`"
          :x="label.x"
          :y="label.y"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="11"
          :fill="label.color"
          font-weight="800"
        >
          {{ label.label }}
        </text>

        <text
          v-for="ring in stageLabels"
          :key="`stage-label-${ring.label}`"
          class="radar-stage-label"
          x="88"
          :y="ring.y"
          text-anchor="start"
          dominant-baseline="middle"
          :fill="ring.color"
        >
          {{ ring.label }}
        </text>

        <g v-if="centerPrimaryText" class="radar-center-core">
          <circle r="24" fill="#ffffff" stroke="#bfe7d2" stroke-width="2" />
          <circle r="18" fill="#eafff2" />
          <text
            x="0"
            y="-5"
            text-anchor="middle"
            dominant-baseline="middle"
            :font-size="8"
            fill="#49617f"
            font-weight="800"
          >
            {{ centerPrimaryText }}
          </text>
          <text
            v-if="centerSecondaryText"
            x="0"
            y="9"
            text-anchor="middle"
            dominant-baseline="middle"
            :font-size="9"
            fill="#13a854"
            font-weight="950"
          >
            {{ centerSecondaryText }}
          </text>
        </g>

        <text
          v-else-if="centerText"
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

    <div class="radar-legend">
      <div
        v-for="(ring, index) in stageRings"
        :key="ring.label"
        class="legend-item"
      >
        <span class="legend-dot" :style="{ background: ring.color }"></span>
        <span class="legend-text">
          {{ index === 0 ? 0 : stageRings[index - 1].max }}-{{ ring.max }} {{ ring.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.radar-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-admin-lg);
}

.radar-chart-container svg {
  overflow: visible;
}

.radar-stage-ring {
  opacity: 0.68;
}

.radar-stage-band {
  pointer-events: none;
}

.radar-axis-line {
  opacity: 0.58;
}

.radar-axis-dot {
  stroke: #fff;
  stroke-width: 2.4;
  filter: drop-shadow(0 4px 8px rgba(11, 99, 246, 0.18));
}

.radar-score-label {
  font-size: 8px;
  font-weight: 950;
  paint-order: stroke;
  stroke: #fff;
  stroke-width: 3px;
}

.radar-stage-label {
  font-size: 9px;
  font-weight: 900;
  opacity: 0.72;
}

.radar-center-core {
  filter: drop-shadow(0 8px 14px rgba(20, 101, 70, 0.14));
}

.radar-legend {
  display: flex;
  gap: var(--space-admin-md);
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
}

.legend-text {
  font-size: 11px;
  color: var(--color-text-secondary);
}
</style>
