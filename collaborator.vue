<template>
  <md-content class="container-inspector md-scrollbar">
    <apps v-if="activeApp == false" :collaborator="collaborator"></apps>
    <inspector-panel :tab-panel="tabPanel" :inspector="inspector" v-if="activeApp == true"></inspector-panel>

    <rename></rename>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import Vue from "vue";
import inspectorPanel from "./inspectorPanel.vue";
import apps from "./component/apps.vue";
import rename from "./component/renameGroup.vue";
import event from "./component/event.vue";

import referentialPanel from "./referentialPanel.vue";
import themePanel from "./themePanel.vue";
import commentsPanel from "./commentairePanel.vue";
const refComponentCtor = Vue.extend(referentialPanel);
const themeComponentCtor = Vue.extend(themePanel);
const commentsComponentCtor = Vue.extend(commentsPanel);

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
    apps,
    rename
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
    var check3 = false;
    for (let i = 0; i < this.tabPanel.length; i++) {
      if (this.tabPanel[i].titleLabel.indexOf("theme: ") > -1) {
        check = true;
      } else {
        if (this.tabPanel[i].titleLabel.indexOf("referential: ") > -1) {
          check2 = true;
        } else if (this.tabPanel[i].titleLabel.indexOf("comments: ") > -1) {
          check3 = true;
        }
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
    if (!check3) {
      let hideOrShow = new PanelClass(viewer, "comments :");
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
      new commentsComponentCtor().$mount(_container);
      event.$emit("createCommentsPanel", hideOrShow);
    }
  }
};
</script>