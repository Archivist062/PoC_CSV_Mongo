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
	on_err:(err)=>{console.log(err)}
};
```

