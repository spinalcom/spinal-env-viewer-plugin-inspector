<template>
    <md-menu md-direction="bottom-end">
      <md-button md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item  @click="rename(selectedGroup)">
            <md-icon>border_color</md-icon>Edit name
        </md-menu-item>

        <md-menu-item @click="share(selectedGroup)">
          <md-icon>import_export</md-icon>Share</md-menu-item>
        <md-menu-item @click="pdf(selectedGroup)">
          <md-icon>picture_as_pdf</md-icon>Export pdf</md-menu-item>
        <md-menu-item @click="charts(selectedGroup)">
          <md-icon>insert_chart</md-icon>Charts</md-menu-item>
        <md-menu-item @click="deleteGroup(selectedGroup)">
          <md-icon>delete_forever</md-icon>Delete</md-menu-item>
      </md-menu-content>
    </md-menu>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "../model/model";
import event from "./event.vue";
import rename from "./renameGroup.vue";

export default {
  name: "contextMenu",

  data() {
    return {
      active: false,
      value: "",
      test: true,
      selectedGroup: this.spinalGroup
    };
  },
  props: ["spinalGroup"],
  methods: {
    // getEvent: function() {
    //   event.$on("rightClickEvent", selectedGroup => {
    //     console.log("rename vue file : prompt dialog page");
    //     this.selectedGroup = selectedGroup;
    //     this.active = true;
    //   });
    // },
    rename: function(group) {
      console.log("rename");
      event.$emit("renameGroup", group);
    },
    share: function(group) {
      console.log(group);
    },
    pdf: function(group) {
      console.log(group);
    },
    charts: function(group) {
      console.log(group);
    },
    deleteGroup: function(group) {
      event.$emit("deleteGroup", group);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    // this.getEvent();
  }
};
</script>