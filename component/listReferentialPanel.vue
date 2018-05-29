<template>
    <md-list>
      <md-list-item v-for="(item, index) in list" :key="index">
        <div>{{ item.name.get()}}</div>
        <div>
          <change-group :selectedgroup="selectedGroup"></change-group>
          <md-button v-on:click="deleteBIMObject(item)">
            <md-icon>delete_forever</md-icon>
          </md-button>
        </div>
      </md-list-item>
    </md-list>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "../model/model";
import changeGroup from "./changeGroupBIMObject.vue";

export default {
  name: "addGroup",

  data() {
    return {
      test: true
    };
  },
  components: {
    changeGroup
  },
  props: ["list", "selectedGroup"],
  methods: {
    deleteBIMObject: function(item) {
      console.log(item);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>