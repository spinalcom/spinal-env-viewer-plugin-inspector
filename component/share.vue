<template>
<div>
   <md-button @click.stop="test = true">
        <md-icon>import_export</md-icon>
      </md-button>
    <md-content class="container md-scrollbar">
        <md-dialog-prompt
                      :md-active.sync="test"
                      v-model="value"
                      md-title="What's your group name?"
                      md-input-maxlength="30"
                      md-input-placeholder="Type your name..."
                      md-confirm-text="Done"
                      @md-confirm="close()"/>
  </md-content>
</div>
</template>


<script>
var spinalSystem;
var viewer;

export default {
  name: "share",

  data() {
    return {
      test: false,
      value: ""
    };
  },
  components: {},
  props: ["selectedGroup"],
  methods: {
    active: function() {
      this.test = true;
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