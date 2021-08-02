const functions = require("firebase-functions");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

let test = require("./test.js");

exports.onNewRequest = functions.firestore.document('/requests/{documentId}')
  .onCreate((snap, context) => {

  });

exports.test = functions.https.onRequest(async (req, res) => {
  res.json({result: await test.test()});
});
