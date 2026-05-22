# Hey Savannah — Start Here

Before we write a single line of code, this is the only context you need. Read this once and you'll have the mental model that most people take months to figure out.

---

## The Big Picture

Every app you've ever used is just three things talking to each other:

```
You (the browser or app)
    ↕
A server (code running somewhere on the internet)
    ↕
A database (where the data actually lives)
```

When you press a button on a website, you're sending a message to a server. The server does something — maybe looks something up, saves something, calls another service — and sends something back. That's it. Everything else is just details on top of this.

---

## The Words You'll Hear

**Frontend** — the part you see. The button, the page, the animation. Runs in your browser.

**Backend** — the part you don't see. Code running on a server somewhere that handles logic, talks to the database, calls other services.

**API** — the way two pieces of software talk to each other. When Joy Widget plays a voice note, it calls an API to get the audio file. When ChatGPT responds to you, your browser called OpenAI's API.

**Database** — where data is stored and retrieved. Think of it like a very organized spreadsheet that code can read and write to instantly.

**Deploy** — putting your code on a server so other people can use it. Right now Joy Widget runs on your laptop. Deploying means it runs on the internet.

**Environment variables** — secret values your code uses that you don't write directly in the code (like API keys and passwords). They live in a separate config file so they don't accidentally get shared publicly.

---

## How AI Gets Implemented

This is probably why you're here. Here's how it actually works:

An AI model like Claude or GPT is sitting on a server somewhere. It doesn't do anything on its own. You have to send it a message — called a **prompt** — and it sends back a response. That's called an **API call**.

So implementing AI in a product usually means:

1. Something happens (user presses a button, uploads a file, sends a message)
2. Your backend takes that event and builds a prompt
3. Your backend sends the prompt to the AI's API
4. The AI sends back a response
5. Your backend does something with that response (shows it to the user, saves it, triggers another action)

That's the whole pattern. Everything you'll see in AI implementations — agents, pipelines, RAG, function calling — is just variations of this loop.

---

## How We're Going to Learn

We're not going to read about code. We're going to ship code.

Here's the workflow we'll use every time:

1. **Pick a feature** from the roadmap
2. **Open Claude Code** — this is an AI coding tool that runs in your terminal
3. **Describe what you want** in plain English
4. **Read what it builds** — not to memorize it, but to understand what it's doing and why
5. **Run it and see it work**
6. **Ship it**

The goal isn't that you could build this from scratch without help. The goal is that you understand what exists, can modify it, can debug it, and can have a real conversation with engineers about it. That's the skill that makes you dangerous.

---

## Your First Task

Before we touch any features, do this:

1. Download **Claude Code** — it's a tool that runs in your terminal and helps you write and understand code using AI
2. Open this project folder in it
3. Ask it: *"Can you explain what this project does and how it works?"*

Read the answer. That's your first lesson.

Then open `ROADMAP.md` and let's start Feature 1.

---

## One More Thing

You're going to feel confused sometimes. That's not a sign you're doing it wrong — that's just what learning feels like before something clicks. The only mistake is stopping before the click happens.

Every engineer you've ever met felt this way at the start. The ones who got good just kept shipping things until they didn't.

Let's build something.
