<template>

</template>


<script>
var spinalSystem;
var viewer;
import event from "./event.vue";

export default {
  name: "addGroup",

  data() {
    return {
      prev: undefined,
      groupTabToDisplay: new Lst(),
      groupTabToRemove: new Lst(),
      group: {},
      apps: false
    };
  },
  components: {},
  props: ["inspector"],
  methods: {
    undisplayTab: function() {
      // console.log("tab to remove", this.groupTabToRemove);
      while (this.groupTabToRemove.length > 0) {
        const group = this.groupTabToRemove[0];
        for (let j = 0; j < group.BIMObjects.length; j++) {
          const BIMobject = group.BIMObjects[j];
          viewer.restoreColorMaterial(
            [BIMobject.id.get()],
            BIMobject._server_id
          );
        }
        this.groupTabToRemove.splice(0, 1);
        // console.log("BOUCLE INF UNDISPLAY TAB");
        // console.log("tab to remove", this.groupTabToRemove);
      }
    },
    displayTab: function() {
      // console.log("tab to display", this.groupTabToDisplay);

      for (let i = 0; i < this.groupTabToDisplay.length; i++) {
        const group = this.groupTabToDisplay[i];
        for (let j = 0; j < group.BIMObjects.length; j++) {
          const BIMobject = group.BIMObjects[j];
          viewer.setColorMaterial(
            [BIMobject.id.get()],
            BIMobject.color.get(),
            BIMobject._server_id
          );
        }
        // console.log("BOUCLE INF DISPLAYTAB");
        // console.log("tab to display", this.groupTabToDisplay);
      }
    },
    getEvent: function() {
      event.$on("colorEvent", (selectedGroup, iconBool) => {
        if (this.prev === selectedGroup) {
          // si le selected groupe précedent est le même
          if (iconBool) {
            for (let i = 0; i < selectedGroup.group.length; i++) {
              this.groupTabToDisplay.push(selectedGroup.group[i]);
            }
          } else {
            // on doit effacé
            while (this.groupTabToDisplay.length > 0) {
              let tmp = this.groupTabToDisplay[0];
              this.groupTabToRemove.push(tmp);
              this.groupTabToDisplay.splice(0, 1);
            }
          }
        } else {
          // si le selected group est different du précedent
          if (this.prev === undefined) {
            // si le précedent n'existe pas
            this.prev = selectedGroup;
            for (let i = 0; i < this.prev.group.length; i++) {
              this.groupTabToDisplay.push(this.prev.group[i]);
            }
          } else {
            // si le précedent existe
            if (iconBool) {
              while (this.groupTabToDisplay.length > 0) {
                this.groupTabToRemove.push(this.groupTabToDisplay[0]);
                this.groupTabToDisplay.splice(0, 1);
              }
              for (let i = 0; i < selectedGroup.group.length; i++) {
                this.groupTabToDisplay.push(selectedGroup.group[i]);
              }
            } else {
              while (this.groupTabToDisplay.length > 0) {
                this.groupTabToRemove.push(this.groupTabToDisplay[0]);
                this.groupTabToDisplay.splice(0, 1);
              }
            }
            this.prev = selectedGroup;
          }
        }
        this.apps = false;
      });
      event.$on("colorEventList", item => {
        this.groupTabToDisplay.push(item);
        console.log(this.groupTabToDisplay);
        this.apps = false;
      });
      event.$on("uncolorEventList", item => {
        for (let i = 0; i < this.groupTabToDisplay.length; i++) {
          const element = this.groupTabToDisplay[i];
          if (element == item) {
            this.groupTabToRemove.push(this.groupTabToDisplay[i]);
            this.groupTabToDisplay.splice(i, 1);
          }
        }
        this.apps = false;
      });
      event.$on("collaboratorColorEvent", (selectedGroup, button) => {
        if (this.apps === false) {
          // on efface l'encien display et on met le unclassified display
          if (this.prev) {
            this.groupTabToDisplay = [];
            for (let i = 0; i < this.prev.group.length; i++) {
              this.groupTabToRemove.push(this.prev.group[i]);
              this.apps = true;
            }
            this.groupTabToDisplay.push(selectedGroup.allObject);
            this.prev = selectedGroup;
          } else {
            for (let i = 0; i < selectedGroup.allObject.length; i++) {
              this.groupTabToDisplay.push(selectedGroup.allObject[i]);
            }
            this.prev = selectedGroup;
            this.apps = true;
          }
        } else {
          if (this.prev === selectedGroup) {
            if (button == true) {
              // on affiche le groupe reçu
              console.log("DEBUG DU TAB");
              this.groupTabToDisplay = [];
              console.log(this.groupTabToDisplay);
              for (let i = 0; i < selectedGroup.allObject.length; i++) {
                this.groupTabToDisplay.push(selectedGroup.allObject[i]);
              }
              console.log(this.groupTabToDisplay);
            } else {
              // on efface le group reçu
              this.groupTabToDisplay = [];
              for (let i = 0; i < selectedGroup.allObject.length; i++) {
                this.groupTabToRemove.push(selectedGroup.allObject[i]);
              }
            }
          } else {
            // le group reçu est differents du precedent.
            // on efface le display de l'encien group et on affiche le nouveau.

            for (let i = 0; i < this.prev.allObject.length; i++) {
              this.groupTabToRemove.push(this.prev.allObject[i]);
            }
            this.groupTabToDisplay = [];
            for (let i = 0; i < selectedGroup.allObject.length; i++) {
              this.groupTabToDisplay.push(selectedGroup.allObject[i]);
            }
          }
        }

        this.apps = true;
      });
    },
    myBind: function() {
      this.groupTabToRemove.bind(this.undisplayTab);
      this.groupTabToDisplay.bind(this.displayTab);
    },
    myUnBind: function() {
      this.groupTabToRemove.unbind(this.undisplayTab);
      this.groupTabToDisplay.unbind(this.displayTab);
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