// Firebase settings for the shared leaderboard.
//
// Where to find them: Firebase console -> your project -> Project settings (gear icon)
// -> General -> "Your apps" -> your web app -> "SDK setup and configuration" -> Config.
//
// These settings are not secret: every website that uses Firebase shows them to its visitors.
// What people can do with the database is decided by the security rules in firestore.rules.
//
// Until real values are filled in, the game still works but keeps scores in each browser only.
window.FIREBASE_CONFIG = {
  apiKey: "PASTE-YOUR-API-KEY-HERE",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
