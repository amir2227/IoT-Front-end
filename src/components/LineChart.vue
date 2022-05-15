<template>
  <Chart
    :size="{ width: 900, height: 500 }"
    :data="this.chartdata"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Area
        :dataKeys="['date', 'total']"
        type="monotone"
        :areaStyle="{ fill: 'url(#grad)' }"
      />
      <Line
        :dataKeys="['date', 'total']"
        type="monotone"
        :lineStyle="{
          stroke: '#9f7aea',
        }"
      />
      <Marker
        v-if="true"
        :value="1000"
        label="Mean."
        color="green"
        :strokeWidth="Number(2)"
        strokeDasharray="6 6"
      />
      <defs>
        <linearGradient id="grad" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          total: { color: '#9f7aea' },
          avg: { hide: true },
          inc: { hide: true },
        }"
      />
    </template>
  </Chart>
</template>
<script >
import { defineComponent, ref } from "vue";
import { Chart, Grid, Line, Area, Marker, Tooltip } from "vue3-charts";

// const dates = this.chartData.map((d) => d.date).reverse();
// const totals = this.chartData.map((d) => d.total).reverse();
export default defineComponent({
  name: "LineChart",
  components:{Chart, Grid, Line, Area, Marker, Tooltip},
  setup() {
     
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });
    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 150"],
        type: "linear",
        ticks: 8,
      },
    });
    return { direction, margin, axis };
  },
  props: {
    label: {
      type: String,
    },
    chartdata: {
      type: Array,
    },
  },

});
</script>
