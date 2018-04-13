var csv = require("../index");

var mongoose = require('mongoose');
mongoose.connect('mongodb://totem/inscsv',{useMongoClient: true});
/*
console.log("Read Users");
csv.CSV_SyncParse("./list_1_users.csv",",",(elem)=>{
	console.log("\t"+JSON.stringify(elem));
});

console.log("Read Accounts");
csv.CSV_SyncParse("./list_2_accounts.csv",",",(elem)=>{
	console.log("\t"+JSON.stringify(elem));
});*/

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

var SchemaAccounts=mongoose.Schema({
	"Account Number":String,
	"Group":String,
	"Email":String,
	"Created Date":String,
	"Leverage":String,
	"Balance":String,
	"Equity":String,
	"Currency":String,
	"ownerId":String
});

var ModelUser=mongoose.model('User', SchemaUsers);
var ModelAccount=mongoose.model('Account', SchemaAccounts);

csv.CSV_Insert("./list_1_users.csv",{
	mongoose_model: ModelUser,
	on_err:(err)=>{console.log(err?err:"OK");}
});

csv.CSV_Insert("./list_2_accounts.csv",{
	mongoose_model: ModelAccount,
	use_fk: true,
	link_key_name: "Email",
	link_local_key_name: "Email",
	mongoose_foreign_model: ModelUser,
	foreign_key: "ownerId",
	primary_key: "id",
	on_err:(err)=>{console.log(err?err:"OK");}
});