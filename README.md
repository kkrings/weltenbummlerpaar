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

The first step is to download the application's latest
[release](https://github.com/kkrings/weltenbummlerpaar/releases) and to extract
it:

    tar -xzvf weltenbummlerpaar-vx.x.x.tar.gz
    cd weltenbummlerpaar-vx.x.x

The second step is to install the application's dependencies:

    npm install

The third step is to configure in the **production** environment
`src/environments/environment.prod.ts` the `baseurl` and the `domain` name of
the remote server that hosts the [back-end
application][weltenbummlerpaar-backend].

The last step is to initiated the application's build process in **production**
mode:

    ./node_modules/.bin/ng build --prod

The output files are written to `dist/weltenbummlerpaar` and can be copied to a
remote server. This is usually the same server that hosts the [back-end
application][weltenbummlerpaar-backend], because it does not support
cross-origin resource sharing (CORS). The server has to be configured in a way
that it serves static content from the location where the dist-files were
copied to and redirects requests for missing files to `index.html`; see
[here](https://angular.io/guide/deployment) for more details.


## Development

The application's source code is hosted on [GitHub][weltenbummlerpaar]:

    git clone https://github.com/kkrings/weltenbummlerpaar.git
    cd weltenbummlerpaar
    npm install

[weltenbummlerpaar]: https://github.com/kkrings/weltenbummlerpaar/

Unit tests as well as full integration tests are provided based on [Jasmine][],
[Karma][], and [Protractor][]. All unit tests are executed via:

     ./node_modules/.bin/ng test

A code coverage report is created at `coverage/weltenbummlerpaar` via:

     ./node_modules/.bin/ng test --code-coverage --no-watch

The full integration tests need a local installation of the [back-end
application][weltenbummlerpaar-backend] up and running before they are executed
via:

     ./node_modules/.bin/ng e2e

[Jasmine]: https://jasmine.github.io/
[Karma]: http://karma-runner.github.io/
[Protractor]: https://www.protractortest.org/

The application's documentation can be build locally at `docs` via [TypeDoc][]:

    ./node_modules/.bin/typedoc

[TypeDoc]: https://typedoc.org/