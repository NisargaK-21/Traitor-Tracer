import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;