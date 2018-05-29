<template>
  <md-content class="container md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
          <md-button @click="view(selectedGroup)">
            <md-icon>remove_red_eye</md-icon>
          </md-button>
          <addTheme :selectedGroup="selectedGroup"></addTheme>
          <md-button v-on:click="referentialPanel(selectedGroup)" :click="theme = false">
            <md-icon>comment</md-icon>
          </md-button>
          <md-button @click="deleteRef(selectedGroup)">
            <md-icon>insert_chart</md-icon>
          </md-button>
    </md-toolbar>

<md-list>
      <md-list-item v-for="(item, index) in newList" :key="index">
        <div>{{ item.name.get()}}</div>
        <div>
          <md-button @click="viewGroup">
            <md-icon>remove_red_eye</md-icon>
          </md-button>
          <md-button v-on:click="referentialPanel(item)" :click="theme = true">
            <md-icon>find_in_page</md-icon>
          </md-button>
          <md-button v-on:click="deleteTheme(item)">
            <md-icon>delete_forever</md-icon>
          </md-button>
        </div>
      </md-list-item>
</md-list>


  </md-content>
</template>theme=true


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "./model/model";
import event from "./component/event.vue";
import addTheme from "./component/addTheme.vue";

export default {
  name: "themePanel",

  data() {
    return {
      selectedGroup: "",
      tabPanel: [],
      newList: [],
      tabBind: [],
      theme: false
    };
  },
  components: {
    addTheme
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("themeEvent", (selectedGroup, panel) => {
        console.log("CECI EST LE theme PANEL");

        if (this.selectedGroup) {
          this.selectedGroup.group.unbind(this.onModelChange);
          selectedGroup.group.bind(this.onModelChange);
        } else selectedGroup.group.bind(this.onModelChange);
        this.selectedGroup = selectedGroup;
        this.tabPanel = panel;
      });
    },
    onModelChange: function() {
      console.log("reset list");
      this.newList = [];
      for (let i = 0; i < this.selectedGroup.group.length; i++) {
        this.newList.push(this.selectedGroup.group[i]);
      }
    },
    referentialPanel: function(group, theme) {
      let check = false;
      let hideOrShow;
      if (this.theme)
        event.$emit("refEvent", group, true, this.selectedGroup.allObject);
      else event.$emit("refEvent", group);
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
    view: function() {},
    deleteRef: function(group) {
      event.$emit("deleteGroup", group.group);
    },
    viewGroup: function() {},
    deleteTheme: function(theme) {
      for (let i = 0; i < this.selectedGroup.group.length; i++) {
        if (theme.name.get() === this.selectedGroup.group[i].name.get()) {
          this.selectedGroup.group.splice(i, 1);
        }
      }
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