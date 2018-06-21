<template>
    <md-list style="width=300px">
      <md-list-item v-for="index in list.length" :key="index" @click="selectObjects(list[index - 1])" @dblclick="zoomObjects(list[index -1])" style="width=300px;">
        <span class="md-list-item-text" >{{ list[index - 1].name.get()}}
          <md-tooltip>{{ list[index - 1].name.get()}}</md-tooltip>
        </span>
        
          <change-group :item="list[index - 1]" :selectedgroup="selectedGroup"></change-group>

    <md-menu md-direction="bottom-end">
      <md-button class="md-icon-button" @click.stop md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>
      <md-menu-content>
        <commentaire :selected-object="list[index - 1]"></commentaire>
        <md-menu-item  @click="rename(list[index - 1])">
            <md-icon>border_color</md-icon>Edit name
        </md-menu-item>
        <md-menu-item @click="deleteBIMObject(list[index - 1])">
          <md-icon>delete_forever</md-icon>Delete</md-menu-item>
      </md-menu-content>
    </md-menu>
        
      </md-list-item>
    </md-list>
</template>


<script>
var spinalSystem;
var viewer;

import changeGroup from "./changeGroup.vue";
import event from "./event.vue";
import commentaire from "./commentaire.vue";

export default {
  name: "addGroup",

  data() {
    return {
      test: true
    };
  },
  components: {
    changeGroup,
    commentaire
  },
  props: ["list", "selectedGroup"],
  methods: {
    deleteBIMObject: function(item) {
      console.log(this.selectedGroup);
      for (let i = 0; i < this.selectedGroup.allObject.length; i++) {
        const element = this.selectedGroup.allObject[i];
        if (item === this.selectedGroup.allObject[i]) {
          for (let j = 0; j < this.selectedGroup.group.length; j++) {
            const group = this.selectedGroup.group[j];
            if (group._server_id == item.group.data.value) {
              for (let k = 0; k < group.BIMObjects.length; k++) {
                const BIMObject = group.BIMObjects[k];
                if (item === BIMObject) group.BIMObjects.splice(k, 1);
              }
            }
          }
          this.selectedGroup.allObject.splice(i, 1);
        }
      }
      console.log(item);
    },
    selectObjects: function(BIMObject) {
      console.log(BIMObject);
      viewer.select(BIMObject.id.get());
    },
    rename: function(group) {
      console.log("rename");
      event.$emit("renameGroup", group);
    },
    zoomObjects: function(BIMObject) {
      console.log(BIMObject);
      viewer.fitToView([BIMObject.id.get()]);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>