import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../firebase-service-account.json" with { type: "json" };

let auth = null;

export function initializeFirebase() {
  if (auth) return auth;

  // const serviceAccount = JSON.parse(
  //   process.env.FIREBASE_SERVICE_ACCOUNT
  // );
  
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