'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
	company: {
		type: String,
		default: '',
		required: 'Please add a company',
		trim: true
	},
	title: {
		type: String,
		default: '',
		required: 'Please add a title',
		trim: true
	},
	job_type: {
		type: String,
		trim: true
	},
	location: {
		type: String,
		required: 'Please add a location',
		trim: true
	},
	how_to_apply: {
		type: String,
		required: 'Please add how to apply',
		trim: true
	},
	contact_email: {
		type: String,
		required: 'Please add a contact email',
		trim: true
	},
	contact_website: {
		type: String,
		trim: true
	},
	contact_phone: {
		type: String,
		trim: true
	},
	job_description: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Job', JobSchema);