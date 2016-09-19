What Is This?
=============

A simple demonstration of running a localhost HTTP server that can communicate
with a non-local secure web page.

In this case, the secure page is at https://cperkinsintel.github.io

And the web server is running locally.



Setup
-----

1. Clone Repo
2. Start local http server (`npm start`)


Test
----

1. Open Browser to https://cperkinsintel.github.io
2. Open Console in Browser.
3. Click HI! button



In the console you will see that two Javascript files (comm1.js and comm2.js) have been requested from the local http server and fulfilled.  Note that resources requested by `<script>` tags have no enforcement of origin.

### Click HI! button
The locally running  web server 
- receives the request
- verifies it came from https://cperkinsintel.github.io
- replies with content. (which you will see in the console).

