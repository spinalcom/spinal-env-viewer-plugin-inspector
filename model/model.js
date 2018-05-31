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

// var theme = class theme extends Model {
//     constructor(name = "theme", color = '#008000', allObject = []) {
//         super();

//         this.add_attr({
//             id: 1,
//             name: name,
//             display: true,
//             color: color,
//             allObject: allObject,
//         });
//     }
// };
// exports.theme = theme;
// spinalCore.register_models(theme);

// var bimObject = class bimObject extends Model {
//     constructor(name = "group") {
//         super();
//         this.add_attr({
//             dbId: 0,
//             name: '',
//             display: true,
//             group: [],
//             properties: [],
//         });
//     }
// };
// exports.bimObject = bimObject;
// spinalCore.register_models(bimObject);