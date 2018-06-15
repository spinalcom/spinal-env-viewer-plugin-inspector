<template>
  <md-content class="container-inspector md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
      <md-button class="md-icon-button" @click="back"><md-icon>keyboard_return</md-icon>
          <md-tooltip>return</md-tooltip>      
      </md-button>
      <add-group :inspector="inspector"></add-group>
    </md-toolbar>
    <color-b-i-m-object></color-b-i-m-object>

    <list-inspector-panel :list="onModelChange()" :tabPanel="tabPanel"></list-inspector-panel>
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
import rename from "./component/renameGroup.vue";
import deleteGroup from "./component/deleteGroup.vue";
import colorBIMObject from "./component/colorBIMObject.vue";
import event from "./component/event.vue";

export default {
  name: "inspector",

  data() {
    return {
      copyInspector: {}
    };
  },
  components: {
    colorBIMObject,
    addGroup,
    listInspectorPanel,
    rename,
    deleteGroup
  },
  props: ["inspector", "tabPanel"],
  methods: {
    onModelChange: function() {
      var list = [];
      if (this.inspector)
        for (let i = 0; i < this.inspector.length; i++) {
          list.push(this.inspector[i]);
        }
      return list;
    },
    back: function() {
      event.$emit("selectedApp", app, false);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;

    // spinalSystem.getModel().then(forgeFile => {
    //   if (forgeFile) {
    //     if (forgeFile.inspector) {
    //       console.log("inspector is here");
    //       forgeFile.inspector.load(inspector => {
    //         this.inspector = inspector;
    //         this.inspector.bind(this.onModelChange);
    //       });
    //     } else {
    //       console.log("inspector is not here");
    //       var list = new Lst();
    //       forgeFile.add_attr({
    //         inspector: new Ptr(list)
    //       });
    //       forgeFile.inspector.load(inspector => {
    //         this.inspector = inspector;
    //         this.inspector.bind(this.onModelChange);
    //       });
    //     }
    //   }
    // });
    // var check = false;
    // var check2 = false;
    // for (let i = 0; i < this.tabPanel.length; i++) {
    //   if (this.tabPanel[i].titleLabel.indexOf("theme: ") > -1) {
    //     check = true;
    //   }
    //   if (this.tabPanel[i].titleLabel.indexOf("referential: ") > -1) {
    //     check2 = true;
    //   }
    // }
    // if (!check) {
    //   let hideOrShow = new PanelClass(viewer, "theme :");
    //   var _container = document.createElement("div");
    //   _container.className = hideOrShow.container.id + "-pannelcontainer";
    //   _container.style.height = "calc(100% - 45px)";
    //   _container.style.overflowY = "auto";
    //   hideOrShow.container.style.minWidth = "300px";
    //   hideOrShow.container.style.width = "350px";
    //   hideOrShow.container.style.height = "300px";
    //   hideOrShow.container.style.minHeight = "200px";
    //   hideOrShow.container.style.left = "calc(100vw - 481px)";
    //   hideOrShow.container.appendChild(_container);
    //   new themeComponentCtor().$mount(_container);
    //   this.tabPanel.push(hideOrShow);
    // }
    // if (!check2) {
    //   let hideOrShow = new PanelClass(viewer, "referential :");
    //   var _container = document.createElement("div");
    //   _container.className = hideOrShow.container.id + "-pannelcontainer";
    //   _container.style.height = "300px";
    //   _container.style.overflowY = "auto";

    //   hideOrShow.container.style.minWidth = "300px";
    //   hideOrShow.container.style.width = "350px";
    //   hideOrShow.container.style.height = "300px";
    //   hideOrShow.container.style.minHeight = "200px";

    //   hideOrShow.container.style.left = "40%";
    //   hideOrShow.container.appendChild(_container);
    //   new refComponentCtor().$mount(_container);
    //   this.tabPanel.push(hideOrShow);
    // }
  }
};
</script>

<style>
.container-inspector {
  height: calc(100% - 48px);
  overflow-y: auto;
  box-sizing: border-box;
}

/* .smallList {
  box-sizing: border-box;
  min-height: 20px;
  height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #212121;
} */

.container-inspector .md-ripple.md-list-item-content {
  box-sizing: border-box;
  min-height: 20px;
  height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #212121;
}
.container-inspector button.md-button.md-theme-default {
  min-width: 27px;
  width: 33px;
  min-height: 20px;
  height: 33px;
}

.container-inspector * {
  box-sizing: border-box;
}

i.md-icon.md-icon-font.md-theme-default {
  font-size: 18px !important;
}
</style>