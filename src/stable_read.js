var fs  = require('fs');

function stream_line_read(path,callback,hwm=64*1024){
	var file = fs.createReadStream(path,{highWaterMark: hwm});
	var relicate="";
	file.on('readable', () => {
		var bytes=relicate+file.read(file.readableLength);
		var lines=bytes.split("\n");
		relicate=lines.pop();
		lines.forEach(element => {
			callback(element);
		});
	});
	file.on('close', () => {
		if(relicate.trim()!="")
			callback(relicate);
	});
}

function csv_parse(separator, csv_data, callback)
{
	var row = csv_data.split(separator);
	var trimmed_row = [];
	for(var i=0; i<row.length; i++)
	{
		var col = row[i];
		col = col.trimLeft();
		if(col.startsWith('"'))
		{
			col=col.slice(1);
			for(;!row[i].trimRight().endsWith('"') && i<row.length;i++)
			{
				col+=row[i];
			}
			var trimmed_col_end = row[i].trimRight();
			col+=trimmed_col_end.slice(0,trimmed_col_end.length-1);
		}
		else
		{
			col=col.trimRight();
		}
		trimmed_row.push(col);
	}
	callback(trimmed_row);
}

function csv_label(labels, trimmed_row, callback)
{
	var labeled_obj = {};
	var label_idx=0;
	trimmed_row.forEach(element => {
		labeled_obj[labels[label_idx]]=element;
		label_idx++;
	});
	callback(labeled_obj);
}

function CSV_SyncStreamRead(path, separator, callback)
{
	var labels=false;
	stream_line_read(path,(line) => {
		if(labels===false)
		{
			csv_parse(separator,line,(parsed_labels)=>{
				labels=parsed_labels;
			});
		}
		else
		{
			csv_parse(separator,line,(row) => {
				csv_label(labels,row,callback);
			});
		}
	});
}

/*
function CSV_AsyncStreamRead(path, separator, callback)
{
	var labels=false;
	stream_line_read(path,async (line) => {
		if(labels===false)
		{
			csv_parse(separator,line,(parsed_labels)=>{
				labels=parsed_labels;
			});
		}
		else
		{
			csv_parse(separator,line,async (row) => {
				csv_label(labels,row,callback)
			});
		}
	});
}
*/

module.exports={
	CSV_SyncParse: CSV_SyncStreamRead/*,
	CSV_AsyncParse: CSV_AsyncStreamRead*/
};

