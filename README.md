What Is This?
=============

A simple demonstration of running a localhost HTTP server that can communicate
with a non-local secure web page.

In this case, the secure page is at https://cperkinsintel.github.io

And the web server is running locally.



Setup
-----

1. Clone Repo and cd into its directory (`cd cperkinsintel.github.io`)
2. Run `npm install`
2. Start local http server (`npm start`)


Test
----

1. Open Browser to https://cperkinsintel.github.io
2. Open Console in Browser.
3. Click _Open Win_ button. Flasher window/tab opens
4. Click _HOWDY!_ button
5. Go to Flasher, see that it has received the message.
6. Click _RSVP_ button in Flasher.
7. Return to main tab and see the rsvp has been received in the console.



Ultimately, this attempted five different ways of connecting

1. Ajax connection (Chrome in Win only)
2. Web Socket (Chrome in Win)
3. Basic Image Request (works everywhere)
4. Iframe (removed, fails everywhere if page is served via HTTPS)
5. Separate Window. (works everywhere)

