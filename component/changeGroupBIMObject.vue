<template>
    <md-menu md-direction="bottom-end" :style="getColor()">
      <md-button md-menu-trigger  >
      </md-button>
    <md-menu-content>
        <md-menu-item v-for="(group, index) in onModelChange()" :key="index" v-on:click="changeGroup(group)">
          <span :style="getCarre(group)"></span>
          {{group.name.get()}}
        </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>


<script>
var spinalSystem;
var viewer;
// :style="{'background-color': colors.hex}"
var groupList = [];
export default {
  name: "changeGroupBIMObject",

  data() {
    return {
      colors: {},
      group: null
    };
  },
  props: ["selectedgroup", "item"],
  methods: {
    vierge: function() {
      // this.selectedgroup.group.unbind(this.onModelChange);
      if (this.item)
        this.item.group.load(myGroup => {
          this.group = myGroup;
        });
    },
    getColor: function() {
      if (this.group) return { "background-color": this.group.color.get() };
      else return { "background-color": "black" };
    },
    getCarre: function(group) {
      return {
        "background-color": group.color.get(),
        height: "20px",
        width: "20px",
        "padding-left": "10px"
      };
    },
    onModelChange: function() {
      // console.log(this.group);
      if (this.group) {
        if (this.group.color.get()) this.colors = this.group.color.get();
        groupList = [];
        for (let i = 0; i < this.selectedgroup.group.length; i++) {
          groupList.push(this.selectedgroup.group[i]);
        }
      }
      return groupList;
    },
    changeGroup: function(group) {
      console.log(this.group);
      console.log(this.item, group);
      if (this.group === group) return;
      else {
        for (let i = 0; i < this.group.BIMObjects.length; i++) {
          if (this.group.BIMObjects[i] === this.item)
            this.group.BIMObjects.splice(i, 1);
        }
        group.BIMObjects.push(this.item);
      }
      this.group = group;
      this.item.group.set(group);
      this.colors = group.color.get();
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;

    this.vierge();
  }
};
</script>

<style>
</style>
