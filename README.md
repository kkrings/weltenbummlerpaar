# Weltenbummlerpaar

[![Build Status](
https://travis-ci.org/kkrings/weltenbummlerpaar.svg?branch=master)](
https://travis-ci.org/kkrings/weltenbummlerpaar)

This project contains the [Angular][]-based front end of the
*Weltenbummlerpaar* travel diary web application. The corresponding
[Express][]-based back end can be found in the [weltenbummlerpaar-backend][]
project.

[Angular]: https://angular.io/
[Express]: https://expressjs.com/
[weltenbummlerpaar-backend]: https://github.com/kkrings/weltenbummlerpaar-backend/


## Deployment

First, the application's latest
[release](https://github.com/kkrings/weltenbummlerpaar/releases) has to be
downloaded and extracted:

    tar -xzvf weltenbummlerpaar-vx.x.x.tar.gz
    cd weltenbummlerpaar-vx.x.x

Second, the application's dependencies have to be installed:

    npm install

Last, the application's build process in **production** mode is initiated as
follows:

    ./node_modules/.bin/ng build --prod

The output files are written to `dist/weltenbummlerpaar` and can be copied to
the remote server. This server then has to be configured in a way that it
serves static content from this location and redirects requests for missing
files to `index.html`; see [here](https://angular.io/guide/deployment) for more
details.
