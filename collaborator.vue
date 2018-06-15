<template>
  <md-content class="container-inspector md-scrollbar">
    <apps v-if="activeApp == false" :collaborator="collaborator"></apps>
    <inspector-panel :tab-panel="tabPanel" :inspector="inspector" v-if="activeApp == true"></inspector-panel>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import Vue from "vue";
import inspectorPanel from "./inspectorPanel.vue";
import apps from "./component/apps.vue";
import event from "./component/event.vue";
import referentialPanel from "./referentialPanel.vue";
import themePanel from "./themePanel.vue";
const refComponentCtor = Vue.extend(referentialPanel);
const themeComponentCtor = Vue.extend(themePanel);

export default {
  name: "newFile",

  data() {
    return {
      collaborator: {},
      inspector: {},
      activeApp: false,
      tabPanel: []
    };
  },
  components: {
    inspectorPanel,
    apps
  },
  props: [],
  methods: {
    getEvent: function() {
      event.$on("selectedApp", (app, active) => {
        this.inspector = app.inspector;
        this.activeApp = active;
      });
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;

    this.getEvent();

    spinalSystem.getModel().then(forgeFile => {
      if (forgeFile) {
        if (forgeFile.collaborator) {
          console.log("collaborator is here");
          forgeFile.collaborator.load(collaborator => {
            this.collaborator = collaborator;
            console.log(this.collaborator);
            // this.collaborator.bind(this.onModelChange);
          });
        } else {
          console.log("collaborator is not here");
          var list = new Lst();
          forgeFile.add_attr({
            collaborator: new Ptr(list)
          });
          forgeFile.collaborator.load(collaborator => {
            this.collaborator = collaborator;
            // this.collaborator.bind(this.onModelChange);
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
      let hideOrShow = new PanelClass(viewer, "theme :");
      var _container = document.createElement("div");
      _container.className = hideOrShow.container.id + "-pannelcontainer";
      _container.style.height = "calc(100% - 45px)";
      _container.style.overflowY = "auto";
      hideOrShow.container.style.minWidth = "300px";
      hideOrShow.container.style.width = "350px";
      hideOrShow.container.style.height = "300px";
      hideOrShow.container.style.minHeight = "200px";
      hideOrShow.container.style.left = "calc(100vw - 481px)";
      hideOrShow.container.appendChild(_container);
      new themeComponentCtor().$mount(_container);
      this.tabPanel.push(hideOrShow);
    }
    if (!check2) {
      let hideOrShow = new PanelClass(viewer, "referential :");
      var _container = document.createElement("div");
      _container.className = hideOrShow.container.id + "-pannelcontainer";
      _container.style.height = "300px";
      _container.style.overflowY = "auto";

      hideOrShow.container.style.minWidth = "300px";
      hideOrShow.container.style.width = "350px";
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