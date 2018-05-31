<template>
          <md-button @click="addItem()">
            <md-icon>add</md-icon>
          </md-button>
</template>


<script>
var spinalSystem;
var viewer;
import model from "spinal-models-bim_forge";

export default {
  name: "addGroup",

  data() {
    return {
      value: "",
      active: false
    };
  },
  props: ["selectedGroup", "referential"],
  methods: {
    addItem: function() {
      var items = viewer.getSelection();
      console.log("addItemInReferencial");
      console.log(items);
      if (items.length == 0) {
        alert("No model selected !");
        return;
      }
      var test = true;
      for (let i = 0; i < items.length; i++) {
        // _id, _name, _group, _display, _color
        test = true;
        for (let j = 0; j < this.referential.length; j++) {
          if (this.referential[j].id.get() === items[i]) {
            test = false;
          }
        }
        console.log("add de l'objet");
        console.log(test);
        if (test) {
          var newBimObject = new model.SpinalBIMObjectForge(
            items[i],
            viewer.model.getData().instanceTree.getNodeName(items[i]),
            this.selectedGroup.group[0],
            false,
            "blue"
          );
          this.selectedGroup.group[0].BIMObjects.push(newBimObject);
        }
      }
      console.log(newBimObject);
      if (newBimObject) this.referential.push(newBimObject);
      // console.log(this.referential);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>