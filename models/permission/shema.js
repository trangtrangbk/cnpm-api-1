const Schema = require("mongoose").Schema;

const permissionShema = new Schema({
    id_per:{ type: Schema.Types.ObjectId, required: true },
    name_per:{type:String}
});