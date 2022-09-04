const SSAdapter = require('@bh-ent-tech/bh-ss-node-adapter');
const dotenv = require('dotenv');
dotenv.config();
const loggerObj = require('@bh-ent-tech/bh-logger-adapter').loggerObj;

var loggerConfig = {
  settings: {
    "env": "prod",
    "logTo": "console",
    "threshold": "info",
    "format": "json"

  },
  fields: [
    "timestamp",
    "level",
    { "applicationName": "SampleApp-AppShell" },
    "message",
    "stack"
  ]
};


loggerObj.logger_init(loggerConfig);
const logger = loggerObj.get_logger("winston");
const auditlogger = loggerObj.get_logger("audit");



const ssAdapterConfig = {
  'auth-server-url': process.env.SSU,
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET,
  'public-key-cache-ttl': 3600,
  'logger': logger,
  'auditlogger': auditlogger
};
const adapter = new SSAdapter(ssAdapterConfig)

module.exports ={
  logger:logger,
  auditlogger:auditlogger,
  adapter:adapter
}