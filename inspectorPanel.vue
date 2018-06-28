<template>
  <md-content style="height: 100%" class="container-inspector md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
      <md-button class="md-icon-button" @click="back"><md-icon>keyboard_return</md-icon>
          <md-tooltip>return</md-tooltip>      
      </md-button>
      <add-group :inspector="inspector"></add-group>
  <md-button class="md-icon-button" @click.stop="view()" @dblclick.stop>
    <md-icon> {{icon}} </md-icon>
  </md-button>
    </md-toolbar>
    <color-b-i-m-object></color-b-i-m-object>
    <list-inspector-panel :list="onModelChange()" :tabPanel="tabPanel"></list-inspector-panel>
    
    <deleteGroup :inspector="inspector"></deleteGroup>
  </md-content>
</template>

<script>
var spinalSystem;
var viewer;
import Vue from "vue";

import addGroup from "./component/addGroup.vue";
import listInspectorPanel from "./component/listInspectorPanel.vue";
import deleteGroup from "./component/deleteGroup.vue";
import colorBIMObject from "./component/colorBIMObject.1.vue";
import event from "./component/event.vue";

export default {
  name: "inspector",

  data() {
    return {
      copyInspector: {},
      icon: "visibility_off"
    };
  },
  components: {
    colorBIMObject,
    addGroup,
    listInspectorPanel,
    deleteGroup
  },
  props: ["inspector", "tabPanel"],
  methods: {
    getEvent: function() {
      event.$on("collaboratorIconAllEvent", icon => {
        this.icon = icon;
      });
    },
    onModelChange: function() {
      var list = [];
      if (this.inspector)
        for (let i = 0; i < this.inspector.length; i++) {
          list.push(this.inspector[i]);
        }
      return list;
    },
    view: function() {
      console.log(this.icon);
      if (this.icon === "visibility_off") {
        this.icon = "visibility";
        event.$emit("collaboratorColorAllEvent", this.inspector, true);
      } else {
        this.icon = "visibility_off";
        event.$emit("collaboratorColorAllEvent", this.inspector, false);
      }
      event.$emit("collaboratorIconAllEvent", this.icon);
    },
    back: function() {
      event.$emit("selectedApp", app, false);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.icon = "visibility_off";
    this.getEvent();
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

.container-inspector .md-list-item-content.md-ripple {
  padding: 0px 16px;
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