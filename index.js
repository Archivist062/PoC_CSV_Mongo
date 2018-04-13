var stable = require("./src/stable_read");
var mongofk = require("./src/foreign_key");

module.exports ={
	CSV_SyncParse: stable.CSV_SyncParse,
	CSV_Insert: mongofk.CSV_Insert
};