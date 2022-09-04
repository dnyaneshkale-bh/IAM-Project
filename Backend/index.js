
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const adapter = require('./utils/ssAdapterconfig').adapter
const logger = require('./utils/ssAdapterconfig').logger

const teamRouter = require('./routes/teamRouter');
const assetRouter = require('./routes/assetRouter');
const rcaRouter = require('./routes/rcaRouter');
const documentsRouter = require('./routes/documentsRouter');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use("/static", express.static("files"));

if (process.env.ENV !== 'dev') {
    app.use(adapter.middleware({}));
    app.use(adapter.verifyToken());
}

app.use('/rca/:rca_id/team', teamRouter);
app.use('/rca/:rca_id/asset', assetRouter);
app.use('/rca', rcaRouter);
app.use('/rca/:rca_id/documents', documentsRouter);

app.listen(8080, () => {
    console.log("server started on port 8080");
})
