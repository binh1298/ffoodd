const winston = require('winston')
const { format } = winston
const appRoot = require('app-root-path');

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

module.exports = {
	file: {
		format: format.combine(
			format.json()
		),
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		format: format.combine(
			format.colorize(),
			logFormat
		),
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};