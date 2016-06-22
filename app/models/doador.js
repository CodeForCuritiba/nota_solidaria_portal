// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our doador model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Doador', new Schema({
	    name : {type : String, default: ''},
	    phone : {type : String, default: ''},
	    email : {type : String, default: ''},
	    notas : [ {
	    	nfe : String,
	    	value : String,
	    	cnpj : String,
	    	donated_at : Number,
	    	emission_month : Number,
	    	emission_year : Number,
	    	print_nfe : String,
	    	print_cnpj : String,
	    } ]
	}, { collection: 'doadores' })
);
