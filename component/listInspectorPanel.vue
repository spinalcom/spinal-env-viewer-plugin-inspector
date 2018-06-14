<template>
    <md-list style="width=300px">
      <md-list-item style="height=30px" v-for="(spinalGroup, index) in list" :key="index" @click="selectObjects(spinalGroup)" @dblclick="zoomObjects(spinalGroup)" >
        <div class="md-list-item-text">
          <span>{{ spinalGroup.name.get()}}</span>  
          <md-tooltip>{{ spinalGroup.name.get()}}</md-tooltip>
        </div>
        
          <icon-inspector-panel :selectedGroup="spinalGroup"></icon-inspector-panel>
          <md-button class="md-icon-button" v-on:click.stop="referentialPanel(spinalGroup)">
            <md-icon class="md-size-1x">location_city</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-on:click.stop="themePanel(spinalGroup, icon)">
            <md-icon>assignment</md-icon>
          </md-button>
          
           <contextMenu :selectedGroup="spinalGroup" :tabPanel="tabPanel"></contextMenu>
        
      </md-list-item>
    </md-list>
</template>


<script>
var spinalSystem;
var viewer;

import contextMenu from "./contextMenu.vue";
import event from "./event.vue";
import iconInspectorPanel from "./iconEyeInspectorPanel.vue";
export default {
  name: "addGroup",

  data() {
    return {
      active: false,
      allActive: false
    };
  },
  props: ["list", "spinalGroup", "tabPanel"],
  components: {
    contextMenu,
    iconInspectorPanel
  },
  methods: {
    themePanel: function(group, icon) {
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
    selectObjects: function(selectedGroup) {
      console.log(selectedGroup);
      let tab = [];
      for (let i = 0; i < selectedGroup.allObject.length; i++) {
        const element = selectedGroup.allObject[i];
        tab.push(element.id.get());
      }
      viewer.select(tab);
    },
    zoomObjects: function(selectedGroup) {
      let tab = [];
      for (let i = 0; i < selectedGroup.allObject.length; i++) {
        const element = selectedGroup.allObject[i];
        tab.push(element.id.get());
      }
      viewer.fitToView(tab);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // this.getEvent();
  }
};
</script>