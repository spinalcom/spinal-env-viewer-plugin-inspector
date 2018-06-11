var chartsManager = {};
import chartsPanel from "../chartsPanel.vue";
import Vue from "vue";
const chartsComponentCtor = Vue.extend(chartsPanel);


// [{group, panel}]
chartsManager.tabPanels = [];


chartsManager.createPanel = function (selectedGroup) {
  for (let i = 0; i < chartsManager.tabPanels.length; i++) {
    var element = chartsManager.tabPanels[i];
    console.log(element);
    if (element.group == selectedGroup)
      return element.panel;
  }
  console.log(element);
  let hideOrShow = null;
  hideOrShow = new PanelClass(
    window.spinal.ForgeViewer.viewer,
    "charts : " + selectedGroup.name.get()
  );
  var _container = document.createElement("div");
  _container.className = hideOrShow.container.id + "-pannelcontainer";
  _container.style.height = "calc(100% - 45px)";
  _container.style.overflowY = "auto";
  hideOrShow.container.style.minWidth = "225px";
  hideOrShow.container.style.width = "225px";
  hideOrShow.container.style.height = "260px";
  hideOrShow.container.style.minHeight = "260px";
  hideOrShow.container.style.right = "0px";
  hideOrShow.container.appendChild(_container);
  new chartsComponentCtor().$mount(_container);
  var obj = {
    panel: hideOrShow,
    group: selectedGroup
  };
  chartsManager.tabPanels.push(obj);
  return obj.panel;
};

module.exports = chartsManager;