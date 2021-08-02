const functions = require("firebase-functions");

exports.makeUppercase = functions.firestore.document('/requests/{documentId}')
  .onCreate((snap, context) => {
    console.log(snap);
  });
