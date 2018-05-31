<template>
    <md-list style="width=300px">
      <md-list-item v-for="(spinalGroup, index) in list" :key="index" v-on:click.right="rightClickContextMenu">
        <div>{{ spinalGroup.name.get()}}</div>
        <div>
          <md-button @click="viewGroup(spinalGroup)">
            <md-icon>remove_red_eye</md-icon>
          </md-button>
          <md-button v-on:click="referentialPanel(spinalGroup)">
            <md-icon>comment</md-icon>
          </md-button>
          <md-button v-on:click="themePanel(spinalGroup)">
            <md-icon>assignment</md-icon>
          </md-button>
          
           <contextMenu :spinalGroup="spinalGroup"></contextMenu>
        </div>
      </md-list-item>
    </md-list>
</template>


<script>
var spinalSystem;
var viewer;

import contextMenu from "./contextMenu.vue";
import event from "./event.vue";
export default {
  name: "addGroup",

  data() {
    return {
      active: false
    };
  },
  props: ["list", "spinalGroup", "tabPanel"],
  components: {
    contextMenu
  },
  methods: {
    rightClickContextMenu: function(group) {
      this.active = true;
    },
    themePanel: function(group) {
      let check = false;
      let hideOrShow;
      event.$emit("themeEvent", group, this.tabPanel);
      for (let i = 0; i < this.tabPanel.length; i++) {
        if (this.tabPanel[i].titleLabel.indexOf("theme") > -1) {
          check = true;
          hideOrShow = this.tabPanel[i];
        }
      }
      if (check)
        if (!hideOrShow.isVisible()) {
          this.currentNamePanel = "theme : " + group.name.get();
          hideOrShow.setTitle("theme : " + group.name.get());
          hideOrShow.setVisible(true);
        } else {
          if (this.currentNamePanel != "theme : " + group.name.get()) {
            this.currentNamePanel = "theme : " + group.name.get();
            hideOrShow.setTitle("theme : " + group.name.get());
          } else hideOrShow.setVisible(false);
        }
    },
    referentialPanel: function(group) {
      let check = false;
      let hideOrShow;
      event.$emit("refEvent", group);
      for (let i = 0; i < this.tabPanel.length; i++) {
        if (this.tabPanel[i].titleLabel.indexOf("referential") > -1) {
          check = true;
          hideOrShow = this.tabPanel[i];
        }
      }
      if (check)
        if (!hideOrShow.isVisible()) {
          this.currentNamePanel = "referential : " + group.name.get();
          hideOrShow.setTitle("referential : " + group.name.get());
          hideOrShow.setVisible(true);
        } else {
          if (this.currentNamePanel != "referential : " + group.name.get()) {
            this.currentNamePanel = "referential : " + group.name.get();
            hideOrShow.setTitle("referential : " + group.name.get());
          } else hideOrShow.setVisible(false);
        }
    },
    viewGroup: function(group) {}
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // this.getEvent();
  }
};
</script>