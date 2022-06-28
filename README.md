# Context

This is a small app that mimics what we do on our main app which sometimes causes SSL error on Vercel serverless functions.

It does 10 requests (with a 1 second delay) to our api with a small graphQL request and we log the response.
If there is an error, it's caught and logged too.

It needs two env variables : 
- `API_ENDPOINT` :
- `API_KEY` : which is whatever you want as long as the Bearer is the same in the request you do.
