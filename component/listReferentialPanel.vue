<template>
    <md-list>
      <md-list-item v-for="(item, index) in list" :key="index">
        <div>{{ item.name.get()}}</div>
        <div>
          <md-button>
            <md-icon>remove_red_eye</md-icon>
          </md-button>
          <md-button >
            <md-icon>add</md-icon>
          </md-button>
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
export default {
  name: "addGroup",

  data() {
    return {
      test: true
    };
  },
  props: ["list"],
  methods: {
    vierge: function() {
      console.log("vierge");
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>