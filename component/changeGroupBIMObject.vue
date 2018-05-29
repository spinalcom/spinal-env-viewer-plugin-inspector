<template>
    <md-menu md-direction="bottom-end" :style="{'background-color': colors.hex}">
      <md-button md-menu-trigger  >
      </md-button>
    <md-menu-content>
        <md-menu-item v-for="(listGroup, index) in groupList" :key="index">
          {{listGroup.name.get()}}
        </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>


<script>
var spinalSystem;
var viewer;
// :style="{'background-color': colors.hex}"
import { group, theme, bimObject } from "../model/model";
export default {
  name: "changeGroupBIMObject",

  data() {
    return {
      colors: {},
      groupList: []
    };
  },
  props: ["selectedgroup"],
  methods: {
    vierge: function() {
      this.selectedgroup.group.bind(this.onModelChange);
    },
    onModelChange: function() {
      this.groupList = [];
      for (let i = 0; i < this.selectedgroup.group.length; i++) {
        this.groupList.push(this.selectedgroup.group[i]);
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.vierge();

    console.log(this.selectedgroup);
    // this.colors = { hex: this.selectedgroup.color.get() };
  }
};
</script>