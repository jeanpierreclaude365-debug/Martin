# Putting Times Tables Fun on a public website

This is the `public` branch. It turns the game into a normal website where **anyone with the
link** can play, save their name and see **one shared Top 10 leaderboard**, with no sign-in.

- The website is hosted for free by **GitHub Pages**.
- The scores are stored for free in **Firebase** (Google's online database).

There are three parts. Parts 1 and 2 take about 10 minutes.

---

## Part 1: Create the free Firebase database

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project** (or **Add project**).
   - Name: `times-tables-fun` (any name is fine).
   - Google Analytics: you can turn it **off**. It isn't needed.
   - Click **Create project**, wait, then **Continue**.
3. In the left menu, open **Build → Firestore Database** and click **Create database**.
   - Location: pick one near you, for example `europe-west2 (London)`. This can't be changed later.
   - Choose **Start in production mode**, then **Create**.
4. Open the **Rules** tab of Firestore.
   - Delete everything in the box.
   - Copy everything from the file [`firestore.rules`](firestore.rules) in this branch and paste it in.
   - Click **Publish**.
5. Click the **gear icon ⚙️ → Project settings**. Under **Your apps**, click the **`</>`** (Web) icon.
   - App nickname: `times-tables-fun`. Leave "Firebase Hosting" **unticked**.
   - Click **Register app**.
   - You'll see a block of code containing `const firebaseConfig = { apiKey: "...", ... }`.
     **Copy those values.**

You stay on Firebase's free "Spark" plan. It needs no card and has generous free limits.

## Part 2: Put the settings into the game

Either send the `firebaseConfig` values to Claude, or edit [`firebase-config.js`](firebase-config.js)
on GitHub yourself (pencil icon ✏️) and fill in the six values, then **Commit changes**.

These values are **not secret**. Every Firebase website shows them to its visitors. The
security rules from Part 1 control what people can do: read the leaderboard, add a valid
score, reset today's champion and count a visit. Nothing else.

## Part 3: Turn on the website (GitHub Pages)

1. Open the repository on GitHub: <https://github.com/jeanpierreclaude365-debug/Martin>
2. Go to **Settings → Pages** (left menu).
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **`public`** and **`/ (root)`**, then **Save**.
5. Wait a minute or two, then refresh the page. GitHub shows the address, which will be:

   **<https://jeanpierreclaude365-debug.github.io/Martin/>**

Share that link. Everyone who opens it shares the same leaderboard.

---

## Looking after the leaderboard

- **Remove a score** (for example, rude initials or a test score): in Firebase, open
  **Firestore Database → Data → scores**, click the score and use **Delete document**.
- **Clear the whole leaderboard**: delete the `scores` collection in the same place.
- **Reset the Used counter**: delete the `counters` collection.

## If something doesn't work

- **Scores only show on one device:** the settings in `firebase-config.js` are missing or
  wrong, so the game is keeping scores in that browser instead. Check all six values.
- **"Missing or insufficient permissions"** in the browser console: the rules from Part 1 weren't
  published. Paste them in again and click **Publish**.
- **The website shows 404:** GitHub Pages may take a few minutes the first time. Also check the
  branch is `public` and the folder is `/ (root)`.
