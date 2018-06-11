<template>
</template>


<script>
var spinalSystem;
var viewer;
import event from "./component/event.vue";
import Vue from "vue";

export default {
  name: "addGroup",

  data() {
    return {
      tabPanel: [],
      selectedGroup: null
    };
  },
  components: {},
  props: [],
  methods: {
    displayChart: function(hideOrShow) {
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
        }
        if (this.selectedGroup != selectedGroup) {
          return;
        } else {
          console.log(this.panel);
          this.displayChart(this.panel);
        }
      });
    }

    //   event.$on("createChartsEvent", hideOrShow => {
    //     this.panel.push(hideOrShow);
    //   });
    //   event.$on("chartsEvent", selectedGroup => {
    //     for (let i = 0; i < this.panel.length; i++) {
    //       const element = this.panel[i];
    //       if (
    //         element.titleLabel.indexOf("charts : " + selectedGroup.name.get()) >
    //         -1
    //       ) {
    //         if (element.isVisible()) {
    //           element.setVisible(false);
    //           // console.log("panel is not visible : " + this.panel.isVisible());
    //         } else {
    //           element.setVisible(true);
    //           // console.log("panel is visible : " + this.panel.isVisible());
    //         }
    //       }
    //     }
    //     console.log("event listener");
    //   });
    // }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
  }
};
</script>