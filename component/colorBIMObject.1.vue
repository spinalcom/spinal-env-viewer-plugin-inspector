<template>

</template>


<script>
var spinalSystem;
var viewer;
import event from "./event.vue";
import { apps } from "../model/model";

export default {
  name: "addGroup",

  data() {
    return {
      prev: undefined,
      groupTabToDisplay: new Lst(),
      groupTabToRemove: new Lst(),
      group: {},
      apps: false,
      all: false
    };
  },
  components: {},
  props: ["inspector"],
  methods: {
    undisplayTab: function() {
      // console.log("UNDISPLAY TAB");
      // console.log(this.groupTabToRemove);
      while (this.groupTabToRemove.length > 0) {
        const myObj = this.groupTabToRemove[0];
        viewer.restoreColorMaterial(
          [myObj.BIMObject.id.get()],
          myObj.BIMObject._server_id
        );
        this.groupTabToRemove.splice(0, 1);
        // console.log("BOUCLE INF UNDISPLAY TAB");
        // console.log("tab to remove", this.groupTabToRemove);
      }
    },
    displayTab: function() {
      // console.log("DISPLAY TAB");
      // console.log(this.groupTabToDisplay);
      for (let i = 0; i < this.groupTabToDisplay.length; i++) {
        const myObj = this.groupTabToDisplay[i];
        viewer.setColorMaterial(
          [myObj.BIMObject.id.get()],
          myObj.color.get(),
          myObj.BIMObject._server_id
        );
      }
    },
    resetDisplayTab: function() {
      for (let i = 0; i < this.groupTabToDisplay.length; i++) {
        const element = this.groupTabToDisplay[i];
        this.groupTabToRemove.push(element);
      }
      this.groupTabToDisplay.splice(0, this.groupTabToDisplay.length);
    },
    getEvent: function() {
      event.$on("colorEvent", (selectedGroup, iconBool) => {
        // affichage de la couleurs de chaque objets d'un selectedGroup
        // console.log("COLOR EVENT");
        if (iconBool == true) {
          this.resetDisplayTab();
          for (let i = 0; i < selectedGroup.group.length; i++) {
            const group = selectedGroup.group[i];
            for (let j = 0; j < group.BIMObjects.length; j++) {
              const BIMObject = group.BIMObjects[j];
              var myObj = {};
              myObj.BIMObject = BIMObject;
              myObj.color = BIMObject.color.get();
              this.groupTabToDisplay.push(myObj);
            }
          }
          // console.log(this.groupTabToDisplay);
        } else {
          this.resetDisplayTab();
        }
        this.apps = false;
      });
      event.$on("colorEventList", item => {
        // console.log("COLOR EVENT LIST");
        if (this.apps == false) {
          for (let i = 0; i < item.BIMObjects.length; i++) {
            const element = item.BIMObjects[i];
            let myObj = {};
            myObj.BIMObject = element;
            console.log(myObj);
            myObj.color = element.color.get();
            this.groupTabToDisplay.push(myObj);
          }
        } else {
          this.resetDisplayTab();
          for (let i = 0; i < item.BIMObjects.length; i++) {
            const element = item.BIMObjects[i];
            let myObj = {};
            myObj.BIMObject = element;
            myObj.color = element.color.get();
            this.groupTabToDisplay.push(myObj);
          }
        }
        this.apps = false;
      });
      event.$on("uncolorEventList", item => {
        // undisplay d'un group

        // console.log("UNCOLOR EVENT LIST");
        if (this.apps == false) {
          for (let i = 0; i < item.BIMObjects.length; i++) {
            const element = item.BIMObjects[i];
            for (let j = 0; j < this.groupTabToDisplay.length; j++) {
              if (this.groupTabToDisplay[j].BIMObject === element) {
                this.groupTabToRemove.push(this.groupTabToDisplay[j]);
                this.groupTabToDisplay.splice(j, 1);
                j--;
              }
            }
          }
        } else {
          // this.resetDisplayTab();
          // for (let i = 0; i < item.BIMObjects.length; i++) {
          //   const element = item.BIMObjects[i];
          //   let myObj = {};
          //   myObj.color = element.color.get();
          //   this.groupTabToDisplay.push(myObj);
          // }
        }
        this.apps = false;
      });
      event.$on("collaboratorColorEvent", (selectedGroup, iconBool) => {
        // display d'une apps
        if (this.all == false) {
          // console.log("collaborator color EVENT ");
          if (iconBool == true) {
            this.resetDisplayTab();
            for (let i = 0; i < selectedGroup.allObject.length; i++) {
              const element = selectedGroup.allObject[i];
              var myObj = {};
              myObj.BIMObject = element;
              myObj.color = selectedGroup.group[0].color.get();
              this.groupTabToDisplay.push(myObj);
            }
            // console.log("collaboratorColorEvent");
            // console.log(this.groupTabToDisplay);
          } else {
            this.resetDisplayTab();
          }
        } else {
          if (iconBool == true) {
            for (let i = 0; i < selectedGroup.allObject.length; i++) {
              const element = selectedGroup.allObject[i];
              let myObj = {};
              myObj.BIMObject = element;
              myObj.color = selectedGroup.group[0].color.get();
              this.groupTabToDisplay.push(myObj);
            }
          } else {
            for (let i = 0; i < this.groupTabToDisplay.length; i++) {
              const element = this.groupTabToDisplay[i];
              for (let j = 0; j < selectedGroup.allObject.length; j++) {
                if (element.BIMObject === selectedGroup.allObject[j]) {
                  this.groupTabToRemove.push(element);
                  this.groupTabToDisplay.splice(i, 1);
                  i--;
                }
              }
            }
          }
        }
        this.apps = true;
      });
      event.$on("collaboratorColorAllEvent", (selectedApp, iconBool) => {
        // display d'une apps
        // console.log("collaborator color all EVENT ");
        if (iconBool == true) {
          // console.log("LET S DISPLAY THIS ALL APP");
          // console.log(selectedApp);
          this.resetDisplayTab();
          for (let i = 0; i < selectedApp.length; i++) {
            const group = selectedApp[i];
            for (let j = 0; j < group.allObject.length; j++) {
              const BIMObject = group.allObject[j];
              let myObj = {};
              myObj.BIMObject = BIMObject;
              myObj.color = group.group[0].color.get();
              this.groupTabToDisplay.push(myObj);
            }
          }
          this.all = true;
        } else {
          // console.log("LET'S UNDISPLAT THIS ALL APP");
          // console.log(selectedApp);
          this.resetDisplayTab();
          this.all = false;
        }
      });
    },
    myBind: function() {
      this.groupTabToRemove.bind(this.undisplayTab);
      this.groupTabToDisplay.bind(this.displayTab);
    },
    myUnBind: function() {
      this.groupTabToRemove.unbind(this.undisplayTab);
      this.groupTabToDisplay.unbind(this.displayTab);
      // console.log("UNBIND");
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.myBind();
    this.getEvent();
    // this.getEventTheme();
  },
  beforeDestroy() {
    this.myUnBind();
  }
};
</script>