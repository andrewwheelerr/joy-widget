# Hey Savannah 👋

Heard you wanted to learn how claude works better - This is the roadmap for something we can build together. Each section below is a feature — what it does, why it matters, and what we need to build. We're going to use claude to build these one at a time, so don't worry about knowing how to write everything from scratch. The goal is to learn by doing.

The big idea: Joy is a private, one-to-one product built for two people. One person leaves a song, or voice notes. The other presses a button and gets a random moment of joy. That's it.

---

## Feature 1 — Pair With Another Person

**What it does**

You create a pair, send an invite link or code, and once the other person joins, you're connected. Everything stays between the two of you.

**Why it matters**

The product only works if it feels personal. The magic is knowing the message was made for you, by one person who matters.

**What we need to build**

- Create a pair flow
- Invite link or invite code generation
- Basic identity for each person (just names, like "Drew" and "Savannah")
- A screen that shows who you're paired with

---

## Feature 2 — Upload or Record Voice Notes

**What it does**

The person leaving notes can record directly in the browser or upload an existing audio file. Once uploaded, the note goes into the shared pool immediately.

**Why it matters**

The button only stays magical if there's new stuff to discover. The easier it is to add notes, the more joy is waiting on the other side. This is the supply engine of the whole product.

**What we need to build**

- In-browser audio recording
- Audio file upload (`.mp3`, `.m4a`)
- Automatic sender label
- Upload confirmation
- Storage for the audio file and its metadata
- Basic error handling (wrong file type, failed upload, etc.)

---

## Feature 3 — Press Button to Play Random Note

**What it does**

Press the button. Hear a random voice note from your person. A visual animation plays. That's the whole experience.

**Why it matters**

The surprise is the magic. Random playback turns saved messages into something that feels like a gift every time. Choosing a specific message would break the ritual.

**What we need to build**

- Connect the "Bring Me Joy" button to the voice note pool
- Random selection from available notes
- Audio playback
- Empty state handling (what happens if there are no notes yet)
- Prevent the same note from playing back-to-back too often

---

## Feature 4 — Save Favorite Notes

**What it does**

After a note plays, you can mark it as a favorite. Favorites live in a simple collection you can return to and replay anytime.

**Why it matters**

Random playback creates delight. Favorites create lasting value. A saved note becomes a keepsake — something you can go back to when you really need it.

**What we need to build**

- Favorite button that appears after a note plays
- Favorite status saved to the database
- A simple favorites view
- Ability to replay favorites
- Ability to remove a note from favorites

---

## How We'll Build This

We'll go one feature at a time. For each one, we'll open Claude Code, describe what we want, and let it help us write the code. You don't need to know everything before we start — the point is to learn as we go, understand what the code is doing, and build something fun.
