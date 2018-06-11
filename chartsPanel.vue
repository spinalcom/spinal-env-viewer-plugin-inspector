<template>
<charts v-if="data" :chart-data="data" :styles="{overflow}" :options="{responsive: true, maintainAspectRatio: false, legend: {labels : {fontColor : '#fff'}}}"></charts>
</template>


<script>
var spinalSystem;
var viewer;
import event from "./component/event.vue";
import Vue from "vue";
import charts from "./component/pieCharts.vue";
// import { mixins } from "vue-chartjs";

export default {
  name: "addGroup",

  data() {
    return {
      data: null,
      tabPanel: [],
      overflow: "auto",
      selectedGroup: null
    };
  },
  components: {
    charts
  },
  props: [],
  methods: {
    createCharts: function() {
      this.data = {
        labels: [],
        datasets: []
      };
      let obj = { backgroundColor: [], data: [] };
      for (let i = 0; i < this.selectedGroup.group.length; i++) {
        const element = this.selectedGroup.group[i];
        this.data.labels.push(element.name.get());
        obj.backgroundColor.push(element.color.get());
        obj.data.push(element.BIMObjects.length);
      }
      obj.borderWidth = 0;
      // obj.option.responsive = true;
      // obj.option = { responsive: true };
      this.data.datasets.push(obj);
      console.log(this.data);
    },
    displayChart: function(hideOrShow) {
      this.createCharts();
      if (hideOrShow.isVisible()) {
        hideOrShow.setVisible(false);
      } else {
        hideOrShow.setVisible(true);
      }
    },
    getEvent: function() {
      console.log("ceci est un test du getEvent");
      event.$on("chartsEvent", (selectedGroup, panel) => {
        if (this.selectedGroup == null) {
          this.selectedGroup = selectedGroup;
          this.panel = panel;
          this.selectedGroup.bind(this.createCharts);
        }
        if (this.selectedGroup != selectedGroup) {
          return;
        } else {
          console.log(this.panel);
          this.displayChart(this.panel);
        }
      });
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
  }
};
</script>