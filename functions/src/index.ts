import * as functions from "firebase-functions";

exports.makeUppercase = functions.firestore.document('/request/{documentId}')
  .onCreate((snap, context) => {
    console.log(snap);
  });
