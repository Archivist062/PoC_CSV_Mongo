var csv = require("../index");

var mongoose = require('mongoose');
mongoose.connect('mongodb://totem/test');

console.log("Read Users");
csv.CSV_SyncParse("./list_1_users.csv",",",(elem)=>{
	console.log("\t"+JSON.stringify(elem));
});

console.log("Read Accounts");
csv.CSV_SyncParse("./list_2_accounts.csv",",",(elem)=>{
	console.log("\t"+JSON.stringify(elem));
});

var SchemaUsers=mongoose.Schema({
	"First Name":String,
	"Last Name":String,
	"Email":String,
	"Country Name":String,
	"Country Code":String,
	"Mobile":String,
	"Address1":String,
	"Address2":String,
	"City":String,
	"Created Time USA FORMAT":String,
	"Portal Password":String,
	"Affiliate Code":String
});

var ModelUser=mongoose.model('User', SchemaUsers);

csv.InsertCSV("./list_1_users.csv",{
	mongoose_model: ModelUser
});