# worker-proxy

A simple reverse proxy server built for Cloudflare Workers. It forwards incoming requests to a configured backend service while managing headers.

## Getting started

The project is structured into two main directories:
 * `src` contains the source code of the worker.
 * `lib` contains constants, helpers and types.

## Configuration

Add enviroment variables that are defined in `.vars.example`, defining them in `.dev.vars` is recomended for local use.

 * `PROXY_URL` target proxy url
