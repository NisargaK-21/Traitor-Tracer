import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

let auth = null;

export function initializeFirebase() {
  if (auth) return auth;

  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT.startsWith("{")) {
    // Render: JSON stored directly in environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Local: path to JSON file
    serviceAccount = JSON.parse(
      fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, "utf8")
    );
  }

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert(serviceAccount),
        });

  auth = getAuth(app);

  return auth;
}

export { auth };