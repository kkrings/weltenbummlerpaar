# Weltenbummlerpaar

This project contains the [Angular][]-based front end of the
*Weltenbummlerpaar* travel diary web application. The corresponding
[Nest][]-based back-end application can be found [here][Backend].

[Angular]: https://angular.io/
[Nest]: https://nestjs.com/
[Backend]: https://github.com/kkrings/weltenbummlerpaar-backend/


## Deployment

The first step is to download the application's latest [release][Releases] and
to extract it:

    tar -xzvf weltenbummlerpaar-vx.x.x.tar.gz
    cd weltenbummlerpaar-vx.x.x

[Releases]:https://github.com/kkrings/weltenbummlerpaar/releases

The second step is to install the application's dependencies:

    npm install

The third step is to configure in the **production** environment

    src/environments/environment.prod.ts

the `baseurl` and the `domain` name of the remote server that hosts the
back-end application:

| Front-end version | Requires the following back-end version. |
| ----------------- | ---------------------------------------- |
| 1.0.x             | 1.0.x                                    |
| 1.1.x             | 1.1.x                                    |
| 2.x.x             | 2.0.x                                    |

The last step is to initiate the application's build process in **production**
mode:

    npm run build

The output files are written to `dist/weltenbummlerpaar/de` and can be copied
to a remote server. This is usually the same server that hosts the back-end
application, because it does not support cross-origin resource sharing (CORS).
The server has to be configured in a way that it serves static content from the
location where the dist-files were copied to and redirects requests for missing
files to `index.html`; see [here](https://angular.io/guide/deployment) for more
details.


## Development

The application's source code is hosted on [GitHub][Frontend]:

    git clone https://github.com/kkrings/weltenbummlerpaar.git
    cd weltenbummlerpaar

[Frontend]: https://github.com/kkrings/weltenbummlerpaar/

The application's dependencies are installed via:

    npm install

[Husky][] is used to automatically lint and format on commit:

    npm run husky:install

[Husky]: https://typicode.github.io/husky/

Unit tests are provided based on [Jasmine][] and [Karma][]. All unit tests are
executed via:

     npm run test

[Jasmine]: https://jasmine.github.io/
[Karma]: http://karma-runner.github.io/

A code coverage report is created at `coverage/weltenbummlerpaar` via:

     npm run test -- --code-coverage --no-watch
