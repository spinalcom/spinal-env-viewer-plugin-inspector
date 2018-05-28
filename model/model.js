var exports = module.exports = {};
var spinalCore = require("spinal-core-connectorjs");

var group = class group extends Model {
    constructor(name = "group Alert") {
        super();

        this.add_attr({
            name: name,
            type: "",
            username: '',
            owner: '',
            create: Date.now(),
            allObject: [],
            group: [],
        });
        var newgroup = new theme('unclassified', 'blue');
        newgroup.id.set(0);
        this.group.push(newgroup);
        //     this.add_attr({
        //       referencial: this.addReferencial("unclassified")
        //     });
        //   }
        //   addReferencial(name, color = '#77B5FE') {
        //     var my_groupsubGroup = new groupsubGroup(name, color, this.allObject);
        //     my_groupsubGroup.id.set(0);
        //     return (my_groupsubGroup);
    }
};
exports.group = group;
spinalCore.register_models(group);

var theme = class theme extends Model {
    constructor(name = "theme", color = '#008000', allObject = []) {
        super();

        this.add_attr({
            id: 1,
            name: name,
            display: true,
            color: color,
            allObject: allObject,
        });
    }
};
exports.theme = theme;
spinalCore.register_models(theme);

var bimObject = class bimObject extends Model {
    constructor(name = "group") {
        super();
        this.add_attr({
            dbId: 0,
            name: '',
            display: true,
            group: [],
            properties: [],
        });
    }
};
exports.bimObject = bimObject;
spinalCore.register_models(bimObject);