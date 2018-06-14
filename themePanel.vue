<template>
  <md-content class="container md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">

          <icon-eye-theme-panel :selectedGroup="selectedGroup" :icon="icon.i"></icon-eye-theme-panel>
          <addTheme :selectedGroup="selectedGroup"></addTheme>
          <md-button v-on:click="referentialPanel(selectedGroup, false)">
            <md-icon>location_city</md-icon>
          </md-button>
          <md-button @click="charts(selectedGroup)">
            <md-icon>insert_chart</md-icon>
          </md-button>
    </md-toolbar>

<md-list style="width=300px">
      <md-list-item v-for="(item, index) in getNewList()" :key="index" @click="selectObjects(item)" @dblclick="zoomObjects(item)">
        <span style="width: 100px; overflow: hidden; text-overflow: ellipsis;">
          {{ item.name.get()}}</div>
        </span>
          <icon-eye-theme-panel :item="item" :selectedGroup="selectedGroup" :icon="icon.i"></icon-eye-theme-panel>
          <color-picker :selectedGroup="item"></color-picker>
          <md-button v-on:click.stop="referentialPanel(item, true)">
            <md-icon>location_city</md-icon>
          </md-button>

        <md-menu md-direction="bottom-end">
      <md-button @click.stop md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>
      <md-menu-content>
          <div v-if="index == 0"> <md-icon>not_interested</md-icon>
          Can't be delete
          </div>
          <md-button v-if="index != 0" v-on:click="deleteTheme(item)">
            <md-icon>delete_forever</md-icon> Delete
          </md-button>
      </md-menu-content>
    </md-menu>
      

        </div>
      </md-list-item>
</md-list>


  </md-content>
</template>theme=true


<script>
var spinalSystem;
var viewer;

import event from "./component/event.vue";
import addTheme from "./component/addTheme.vue";
import colorPicker from "./component/colorPicker.vue";
import iconEyeThemePanel from "./component/iconEyeThemePanel.vue";
var chartsPanel = require("./component/chartsManager.js");

var newList = [];

export default {
  name: "themePanel",

  data() {
    return {
      selectedGroup: "",
      tabPanel: [],
      tabBind: [],
      checkedNames: [],
      theme: false,
      icon: { i: "visibility_off" },
      icons: {}
    };
  },
  components: {
    addTheme,
    colorPicker,
    iconEyeThemePanel
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("themeEvent", (selectedGroup, panel) => {
        console.log("CECI EST LE theme PANEL");
        if (this.icons[selectedGroup.name.get()])
          this.icon.i = this.icons[selectedGroup.name.get()];

        this.selectedGroup = selectedGroup;
        this.tabPanel = panel;
      });

      event.$on("iconEvent", (icon, selectedGroup) => {
        if (this.selectedGroup === selectedGroup) {
          this.icons[selectedGroup.name.get()] = icon;
          event.$emit("themeEvent", selectedGroup, this.tabPanel);
        }
      });
    },
    getNewList: function() {
      if (this.selectedGroup) {
        newList = [];
        for (let i = 0; i < this.selectedGroup.group.length; i++) {
          newList.push(this.selectedGroup.group[i]);
        }
      }
      return newList;
    },
    referentialPanel: function(group, theme) {
      let check = false;
      let hideOrShow;
      if (theme) {
        event.$emit("refEvent", group, true, this.selectedGroup);
        console.log("theme is here");
      } else {
        console.log("theme is AWAY");
        event.$emit("refEvent", group);
      }
      for (let i = 0; i < this.tabPanel.length; i++) {
        if (this.tabPanel[i].titleLabel.indexOf("referential") > -1) {
          check = true;
          this.tabPanel[i].setTitle("referential : " + group.name.get());
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
    charts: function(group) {
      let panel = chartsPanel.createPanel(group);
      event.$emit("chartsEvent", group, panel);
    },
    view: function() {
      console.log(this.checkedNames);
      if (this.icon === "visibility") {
        this.icon = "visibility_off";
      } else {
        this.icon = "visibility";
      }
    },
    deleteTheme: function(group) {
      for (let i = 0; i < this.selectedGroup.group.length; i++) {
        if (group.name.get() === this.selectedGroup.group[i].name.get()) {
          for (let j = 0; j < group.BIMObjects.length; j++) {
            const element = group.BIMObjects[j];

            if (this.selectedGroup.group[0]) {
              element.group.set(this.selectedGroup.group[0]);
              element.color.set(this.selectedGroup.group[0].color.get());
              this.selectedGroup.group[0].BIMObjects.push(element);
            }
          }
          this.selectedGroup.group.splice(i, 1);
        }
      }
    },
    selectObjects: function(group) {
      console.log(group);
      let tab = [];
      for (let i = 0; i < group.BIMObjects.length; i++) {
        const element = group.BIMObjects[i];
        tab.push(element.id.get());
      }
      viewer.select(tab);
    },
    zoomObjects: function(group) {
      console.log(group);
      let tab = [];
      for (let i = 0; i < group.BIMObjects.length; i++) {
        const element = group.BIMObjects[i];
        tab.push(element.id.get());
      }
      viewer.fitToView(tab);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
    // this.newList = [];
  }
};
</script>