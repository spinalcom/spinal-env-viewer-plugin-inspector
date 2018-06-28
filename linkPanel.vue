<template>
    <md-content class="container-link" style=" box-sizing: border-box; height: calc(100% - 50px)">
           <md-dialog :md-active.sync="active">
             <md-dialog-title>Add Link</md-dialog-title>


              <md-field md-inline style="width: 80%; margin-left: auto; margin-right: auto;">
                <label>Label</label>
                <md-input v-model="nameLink"></md-input>
              </md-field>

              <md-field md-inline style="width: 80%; margin-left: auto; margin-right: auto;">
                <label>Link</label>
                <md-input v-model="link"></md-input>
              </md-field>


                    <md-dialog-actions>
                    <md-button class="md-primary" @click="active = false">Close</md-button>
                    <md-button class="md-primary" @click="addLink">Save</md-button>
                  </md-dialog-actions>
           </md-dialog>
  <md-toolbar style="box-sizing: border-box;">
    <md-button style="width: 100%" @click="active = true"> Add Link</md-button>
    </md-toolbar>

    <md-content class="md-scrollbar" style="box-sizing: border-box; overflow-y:auto; height: calc(100% - 60px)">
    <md-list>
      <md-list-item v-for="(links, index) in onModelChange()" :key="index">
        <a :href="links.link.get()" target="_blank">{{links.name.get()}}
          <md-tooltip>{{ links.link.get()}}</md-tooltip>
        </a>
      </md-list-item>
    </md-list>
    </md-content>

  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import event from "./component/event.vue";
import contextMenuFilePanel from "./component/contextMenuFilePanel.vue";
import { link } from "./model/model.js";

export default {
  name: "newFile",

  data() {
    return {
      currentPanel: {
        selectedObject: {},
        panel: {}
      },
      multiple: [],
      tab: [],
      link: "",
      nameLink: "",
      active: false
    };
  },
  components: {
    contextMenuFilePanel
  },
  props: [],
  methods: {
    getEvent: function() {
      event.$on("createLinkPanel", panel => {
        console.log("le panel files a été créer");
        this.currentPanel.panel = panel;
      });
      event.$on("openLinkPanel", selectedObject => {
        console.log(selectedObject);
        if (this.currentPanel.selectedObject === selectedObject) {
          if (this.currentPanel.panel.isVisible()) {
            this.currentPanel.panel.setVisible(false);
          } else this.currentPanel.panel.setVisible(true);
        } else {
          this.currentPanel.selectedObject = selectedObject;
          this.currentPanel.panel.setTitle(
            "link : " + selectedObject.name.get()
          );
          if (!this.currentPanel.panel.isVisible()) {
            this.currentPanel.panel.setVisible(true);
          }
        }
      });
    },
    addLink: function() {
      console.log("submit");
      console.log(this.link);
      let myLink = new link();
      myLink.link.set(this.link);
      myLink.name.set(this.nameLink);
      myLink.username.set(spinalSystem.getUser().username);
      myLink.owner.set(spinalSystem.getUser().id);
      this.currentPanel.selectedObject.link.push(myLink);
      this.active = false;
    },
    onModelChange: function() {
      if (this.currentPanel.selectedObject.link) {
        console.log(this.currentPanel.selectedObject);
        let tab = [];
        for (let i = 0; i < this.currentPanel.selectedObject.link.length; i++) {
          const element = this.currentPanel.selectedObject.link[i];
          tab.push(element);
        }
        return tab;
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
  }
};
</script>

<style>
.container-link * {
  box-sizing: border-box;
}
.container-link .md-ripple.md-list-item-content {
  box-sizing: border-box;
  min-height: 20px;
  height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #212121;
}
</style>
