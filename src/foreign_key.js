const mongoose = require('mongoose');
var reader = require("./stable_read");

function fk_stamp(element, foreign, fk_options)
{
	var fk_info={
		local_name: "fk",
		foreign_name: "_rowid",
		callback: ()=>{}
	};
	var options = Object.assign({}, fk_info, fk_options);
	element[options.local_name]=foreign[options.foreign_name];
	options.callback(element);
}

function insert_csv(path,options)
{
	var defaults={
		mongoose_model: {},
		separator: ",",
		use_fk: false,
		link_key_name: "common",
		link_local_key_name: "common",
		mongoose_foreign_model: {},
		foreign_key: "ownerId",
		primary_key: "_rowid",
		on_err:(err)=>{console.log(err);}
	};
	var f_options = Object.assign({}, defaults, options);
	if(f_options.use_fk)
	{
		reader.CSV_SyncParse(path,f_options.separator,(data)=>{
			var predicate={};
			predicate[f_options.link_key_name]=data[f_options.link_local_key_name];
			var foreign_doc=f_options.mongoose_foreign_model.find(predicate);
			data[f_options.foreign_key]=foreign_doc[f_options.primary_key];
			var doc = new f_options.mongoose_model(data);
			doc.save(f_options.on_err);
		});
	}
	else
	{
		reader.CSV_SyncParse(path,f_options.separator,(data)=>{
			var doc = new f_options.mongoose_model(data);
			doc.save(f_options.on_err);
		});
	}
}

module.exports={
	CSV_Insert: insert_csv
};