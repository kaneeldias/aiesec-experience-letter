const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

let docs = require("./docs.js");
let email = require("./email.js");

exports.onNewRequest = functions.firestore.document('/requests/{documentId}')
  .onCreate( async (snap, context) => {
    let docUrl = await docs.create(snap.data());
    await email.create(snap.data(), docUrl);
  });
