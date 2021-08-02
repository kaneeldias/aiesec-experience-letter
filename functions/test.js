const googleDrive = require('@googleapis/drive')
const googleDocs = require('@googleapis/docs')
const {GoogleAuth} = require('google-auth-library');
const dateFormat = require('dateformat');

module.exports = {
  test: async function (data) {

    const auth = new GoogleAuth({
      keyFilename: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']
    });

    const driveClient = await googleDrive.drive({
      version: "v2",
      auth: auth
    });
    let copyDocumentId = await copyTemplate(driveClient, "Kaneel Dias Experience Letter");

    const docsClient = await googleDocs.docs({
      version: 'v1',
      auth: auth
    });

    let requests = getRequestData(data);

    let res = await docsClient.documents.batchUpdate({
      documentId: copyDocumentId,
      resource: {
        requests
      }
    })

    return "https://docs.google.com/document/d/" + res.data.documentId;
  },
};

async function copyTemplate(driveClient, docName) {
  let request = {
    title: docName,
  };
  let response = await driveClient.files.copy({
    fileId: "1mvVXhM36vkFzR02y0lUnE1sWIhrKm64eIBx7QEtHSdM",
    resource: request,
  });
  return response.data.id;
}

function getRequestData(data) {
  let requests = [];

  //Date
  let date = dateFormat(new Date(), "mmmm dS, yyyy");
  requests.push(replaceTemplate("date", date));

  //Name
  requests.push(replaceTemplate("name", data.name));

  //First Name
  requests.push(replaceTemplate("first_name", data.name.split(" ")[0]));

  //Joined
  let joined = dateFormat(data.joined.toDate(), "mmmm dS, yyyy");
  requests.push(replaceTemplate("joined", joined));

  //Exit
  let exit;
  if (data.exit == null) exit = dateFormat(new Date(), "mmmm dS, yyyy");
  else exit = dateFormat(data.exit.toDate(), "mmmm dS, yyyy");
  requests.push(replaceTemplate("exit", exit));

  //Positions
  let positions = "";
  for (let position of data.positions) {
    if (position.role == null) continue;
    positions += "\t•    " + position.role + " for " + position.function + " of " + position.entity + "\n";
  }
  requests.push(replaceTemplateRaw("{{positions}}\n", positions));

  //Conferences
  let conferences = "";
  for (let conference of data.conferences) {
    if (conference.role == null) continue;
    conferences += "\t•    " + conference.role + " - " + conference.name + " " + conference.year + "\n";
  }
  if (conferences === "") {
    requests.push(replaceTemplateRaw(
      "\nFurther they got the opportunity to take part in following Conferences & Events.:\n", ""));
  }
  requests.push(replaceTemplateRaw("{{conferences}}\n", conferences));

  //Achievements
  let achievements = "";
  for (let achievement of data.achievements) {
    if (achievement.title == null) continue;
    achievements += "\t•    " + achievement.title + " - " + achievement.entity + " " + achievement.term + "\n";
  }
  if (achievements === "") {
    requests.push(replaceTemplateRaw(
      "\nFollowing are the commendable achievements of " + data.name + " as a Leader in AIESEC.\n", ""));
  }
  requests.push(replaceTemplateRaw("{{achievements}}\n", achievements));

  return requests;

}

function replaceTemplate(search, replace) {
  return replaceTemplateRaw('{{'+search+'}}', replace)
}

function replaceTemplateRaw(search, replace) {
  return {
    replaceAllText: {
      containsText: {text: search},
      replaceText: replace
    }
  }
}
