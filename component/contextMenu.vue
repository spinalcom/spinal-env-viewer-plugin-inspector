<template>
    <md-menu md-direction="bottom-end">
      <md-button class="md-icon-button" @click.stop md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item  @click="rename(selectedGroup)">
            <md-icon>border_color</md-icon>Edit name
        </md-menu-item>

        <!-- <md-menu-item><share :selectedGroup="selectedGroup"></share></md-menu-item>
        <md-menu-item @click="pdf(selectedGroup)">
          <md-icon>picture_as_pdf</md-icon>Export pdf</md-menu-item> -->
        <md-menu-item @click="charts(selectedGroup)">
          <md-icon>insert_chart</md-icon>Charts</md-menu-item>
        <md-menu-item @click="deleteGroup(selectedGroup)">
          <md-icon>delete_forever</md-icon>Delete</md-menu-item>
      </md-menu-content>
    </md-menu>
</template>


<script>
var spinalSystem;
var viewer;

import event from "./event.vue";
import Vue from "vue";
import share from "./share.vue";
var chartsPanel = require("./chartsManager.js");
var pdf = require("./CreatePdf.js");

export default {
  name: "contextMenu",

  data() {
    return {
      active: false,
      value: "",
      test: true
    };
  },
  components: {
    share
  },
  props: ["selectedGroup", "tabPanel"],
  methods: {
    rename: function(group) {
      console.log("rename");
      event.$emit("renameGroup", group);
    },
    share: function(group) {
      console.log(group);
    },
    pdf: function(group) {
      // cette fonction ne marche pas
      pdf.createRapport(group);
    },
    charts: function(group) {
      console.log("Charts panel called");

      let panel = chartsPanel.createPanel(group);
      event.$emit("chartsEvent", group, panel);

      // var hideOrShow = null;
      // let check = false;
      // console.log(group);
      // for (let i = 0; i < this.tabPanel.length; i++) {
      //   if (
      //     this.tabPanel[i].titleLabel.indexOf("charts : " + group.name.get()) >
      //     -1
      //   ) {
      //     check = true;
      //     hideOrShow = this.tabPanel[i];
      //   }
      // }
      // if (check) {
      //   console.log("panel charts exist for this element");
      //   event.$emit("chartsEvent", group);
      // } else {
      //   console.log("panel charts not exist");
      //   hideOrShow = new PanelClass(viewer, "charts : " + group.name.get());
      //   var _container = document.createElement("div");
      //   _container.className = hideOrShow.container.id + "-pannelcontainer";
      //   _container.style.height = "calc(100% - 45px)";
      //   _container.style.overflowY = "auto";
      //   hideOrShow.container.style.minWidth = "395px";
      //   hideOrShow.container.style.width = "450px";
      //   hideOrShow.container.style.height = "300px";
      //   hideOrShow.container.style.minHeight = "200px";
      //   hideOrShow.container.style.right = "0px";
      //   hideOrShow.container.appendChild(_container);
      //   new chartsComponentCtor().$mount(_container);
      //   event.$emit("createChartsEvent", hideOrShow);
      //   event.$emit("chartsEvent", group);
      // }
      // console.log("event chart is send");
    },
    deleteGroup: function(group) {
      event.$emit("deleteGroup", group);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    // this.getEvent();
  }
};
</script>