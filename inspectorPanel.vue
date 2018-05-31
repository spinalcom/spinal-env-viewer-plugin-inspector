<template>
  <md-content class="container md-scrollbar">
    <add-group :inspector="inspector"></add-group>
    
    <list-inspector-panel :list="list" :tabPanel="tabPanel"></list-inspector-panel>
    <rename></rename>
    <deleteGroup :inspector="inspector"></deleteGroup>
  </md-content>
</template>

<script>
var spinalSystem;
var viewer;
import Vue from "vue";

import addGroup from "./component/addGroup.vue";
import listInspectorPanel from "./component/listInspectorPanel.vue";
import referentialEvent from "./component/event.vue";
import referentialPanel from "./referentialPanel.vue";
import themePanel from "./themePanel.vue";
import rename from "./component/renameGroup.vue";
import deleteGroup from "./component/deleteGroup.vue";

const refComponentCtor = Vue.extend(referentialPanel);
const themeComponentCtor = Vue.extend(themePanel);
export default {
  name: "inspector",

  data() {
    return {
      inspector: {},
      list: [],
      tabPanel: []
    };
  },
  components: {
    addGroup,
    listInspectorPanel,
    rename,
    deleteGroup
  },
  methods: {
    onModelChange: function() {
      this.list = [];
      for (let i = 0; i < this.inspector.length; i++) {
        this.list.push(this.inspector[i]);
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    spinalSystem.getModel().then(forgeFile => {
      if (forgeFile) {
        if (forgeFile.inspector) {
          console.log("inspector is here");
          forgeFile.inspector.load(inspector => {
            this.inspector = inspector;
            this.inspector.bind(this.onModelChange);
          });
        } else {
          console.log("inspector is not here");
          var list = new Lst();
          forgeFile.add_attr({
            inspector: new Ptr(list)
          });
          forgeFile.inspector.load(inspector => {
            this.inspector = inspector;
            this.inspector.bind(this.onModelChange);
          });
        }
      }
    });
    var check = false;
    var check2 = false;
    for (let i = 0; i < this.tabPanel.length; i++) {
      if (this.tabPanel[i].titleLabel.indexOf("theme: ") > -1) {
        check = true;
      }
      if (this.tabPanel[i].titleLabel.indexOf("referential: ") > -1) {
        check2 = true;
      }
    }
    if (!check) {
      let hideOrShow = new PanelClass(viewer, "theme:");
      var _container = document.createElement("div");
      _container.className = hideOrShow.container.id + "-pannelcontainer";
      _container.style.height = "calc(100% - 45px)";
      _container.style.overflowY = "auto";
      hideOrShow.container.style.minWidth = "395px";
      hideOrShow.container.style.width = "450px";
      hideOrShow.container.style.height = "300px";
      hideOrShow.container.style.minHeight = "200px";
      hideOrShow.container.style.right = "0px";
      hideOrShow.container.appendChild(_container);
      new themeComponentCtor().$mount(_container);
      this.tabPanel.push(hideOrShow);
    }
    if (!check2) {
      let hideOrShow = new PanelClass(viewer, "referential:");
      var _container = document.createElement("div");
      _container.className = hideOrShow.container.id + "-pannelcontainer";
      _container.style.height = "300px";
      _container.style.overflowY = "auto";

      hideOrShow.container.style.minWidth = "482px";
      hideOrShow.container.style.width = "482px";
      hideOrShow.container.style.height = "300px";
      hideOrShow.container.style.minHeight = "200px";

      hideOrShow.container.style.left = "40%";
      hideOrShow.container.appendChild(_container);
      new refComponentCtor().$mount(_container);
      this.tabPanel.push(hideOrShow);
    }
  }
};
</script>

<style>
.container {
  height: calc(100% - 48px);
  overflow-y: auto;
  box-sizing: border-box;
}
</style>