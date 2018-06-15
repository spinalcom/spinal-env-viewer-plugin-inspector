var exports = module.exports = {};
var spinalCore = require("spinal-core-connectorjs");
import model from "spinal-models-bim_forge";


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
        var newgroup = new model.SpinalBIMGroupForge('unclassified', [], false, 'blue');
        this.group.push(newgroup);
    }
};
exports.group = group;
spinalCore.register_models(group);

var apps = class apps extends Model {
    constructor(name = "apps") {
        super();

        this.add_attr({
            name: name,
            type: "",
            username: '',
            owner: '',
            create: Date.now(),
            inspector: [],
        });
    }
};

exports.apps = apps;
spinalCore.register_models(apps);