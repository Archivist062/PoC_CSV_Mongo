# PoC of import of CSV files into MongoDB


## Exposed API

```js
/**
 * Parse a CSV file as a stream and calls callback for every row.
 * Rows are objects labeled using the first row, rows containing
 * the separator are escaped correctly
 * 
 * path: path to the file
 * separator: separator used in the file
 * callback: function runned on each object
 * 
 */
CSV_SyncParse(path, separator, callback)
```


```js
/**
 * Parse a CSV file as a stream then insert it into a database, can 
 * add a single foreign key to the model depending on a common key
 * with a second model.
 * 
 * path: path to the file
 * options: subparameters for the command, mongoose_model is required
 */
CSV_Insert(path,options)

/**
 * Options defaults for CSV_Insert
 */
defaults={
	mongoose_model: {},
	separator: ",",
	use_fk: false,
	link_key_name: "common",
	link_local_key_name: "common",
	mongoose_foreign_model: {},
	foreign_key: "ownerId",
	primary_key: "_rowid",
	default_fk:"none",
	on_err:(err)=>{console.log(err);}
};
```

## Example

```js
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
```

