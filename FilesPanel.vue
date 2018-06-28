<template>
    <md-content style=" box-sizing: border-box; height: calc(100% - 50px)">
    <md-field>
      <md-file @md-change="createFile" v-model="multiple" multiple />
    </md-field>

    <md-content class="md-scrollbar" style="box-sizing: border-box; overflow-y:auto; height: calc(100% - 88px)">

    <md-empty-state v-if="onModelChange().length == 0"
    style="width: 150px; height: 150px; text-align: center;"
      class="md-primary"
      md-rounded
      md-icon="insert_drive_file"
      md-label="Nothing here"
      md-description="Anything you add will be stored here.">
    </md-empty-state>


    <md-list v-if="onModelChange().length > 0">
      <md-list-item v-for="(files, index) in onModelChange()" :key="index">
        <div class="md-list-item-text" >{{files.name.get()}}</div>
        <context-menu-file-panel :selectedObject="currentPanel.selectedObject" :file="files"></context-menu-file-panel>
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
// import { file } from "./model/model.js";

export default {
  name: "newFile",

  data() {
    return {
      currentPanel: {
        selectedObject: {},
        panel: {}
      },
      multiple: [],
      tab: []
    };
  },
  components: {
    contextMenuFilePanel
  },
  props: [],
  methods: {
    getEvent: function() {
      event.$on("createFilesPanel", panel => {
        console.log("le panel files a été créer");
        this.currentPanel.panel = panel;
      });
      event.$on("openFilesPanel", selectedObject => {
        console.log(selectedObject);
        if (this.currentPanel.selectedObject === selectedObject) {
          if (this.currentPanel.panel.isVisible()) {
            this.currentPanel.panel.setVisible(false);
          } else this.currentPanel.panel.setVisible(true);
        } else {
          this.currentPanel.selectedObject = selectedObject;
          this.currentPanel.panel.setTitle(
            "files : " + selectedObject.name.get()
          );
          if (!this.currentPanel.panel.isVisible()) {
            this.currentPanel.panel.setVisible(true);
          }
        }
      });
    },
    createFile: function(files) {
      console.log(files);
      console.log(this.currentPanel.selectedObject);
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        let myFile = new File(element.name, filePath);
        let filePath = new Path(element);
        // myFile._create_at.set(Date.now());
        this.currentPanel.selectedObject.files.push(myFile);
      }
    },
    onModelChange: function() {
      let tab = [];
      if (this.currentPanel.selectedObject.files) {
        for (
          let i = 0;
          i < this.currentPanel.selectedObject.files.length;
          i++
        ) {
          const element = this.currentPanel.selectedObject.files[i];
          tab.push(element);
        }
      }
      return tab;
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