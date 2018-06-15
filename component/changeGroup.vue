<template>
    <md-menu md-direction="bottom-end" :style="getColor()" style="width: 40px; height: 20px; border-radius: 3px;">
      <md-button style="width: 40px; height: 20px; border-radius: 3px;" md-menu-trigger>
      </md-button>
    <md-menu-content>
        <md-menu-item v-for="(group, index) in onModelChange()" :key="index" v-on:click="changeGroup(group)">
          <span :style="getCarre(index)"></span>
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
      group: null,
      copyItem: null
    };
  },
  props: ["selectedgroup", "item"],
  methods: {
    vierge: function() {
      // this.selectedgroup.group.unbind(this.onModelChange);
      if (this.item)
        if (FileSystem._objects[this.item.group.data.value])
          this.group = FileSystem._objects[this.item.group.data.value];
        else {
          this.item.group.load(myGroup => {
            this.group = myGroup;
          });
        }
    },
    getColor: function() {
      if (this.item !== this.copyItem) {
        this.copyItem = this.item;
        this.vierge();
      }
      if (this.item) return { "background-color": this.item.color.get() };
      else return { "background-color": "black" };
    },
    getCarre: function(index) {
      // console.log("GET CARRE");
      // console.log(index);
      return {
        "background-color": this.selectedgroup.group[index].color.get(),
        height: "20px",
        width: "20px",
        "padding-left": "10px"
      };
    },
    onModelChange: function() {
      // console.log(this.group);
      console.log(this.group);
      if (this.group) {
        if (this.group.color.get()) this.colors = this.group.color.get();
        groupList = [];
        for (let i = 0; i < this.selectedgroup.group.length; i++) {
          groupList.push(this.selectedgroup.group[i]);
        }
      }
      console.log(groupList);
      return groupList;
    },
    changeGroup: function(group) {
      console.log(this.group);
      console.log(this.item, group);
      for (let i = 0; i < this.group.BIMObjects.length; i++) {
        if (this.group.BIMObjects[i] == this.item) {
          viewer.restoreColorMaterial(
            [this.group.BIMObjects[i].id.get()],
            this.group.BIMObjects[i]._server_id
          );
          this.group.BIMObjects.splice(i, 1);
        }
      }
      group.BIMObjects.push(this.item);

      this.group = group;
      this.item.group.set(group);
      this.item.color.set(group.color.get());
      this.colors = group.color.get();
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    console.log(this.item);
    this.copyItem = this.item;
    this.vierge();
  }
};
</script>

<style>
</style>
