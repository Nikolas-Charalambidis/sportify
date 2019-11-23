[![Codacy Badge](https://api.codacy.com/project/badge/Grade/60b0852d944d41b49262f33defd9051e)](https://www.codacy.com/manual/Nikolas-Charalambidis/4IT445?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Nikolas-Charalambidis/4IT445&amp;utm_campaign=Badge_Grade)
[![codebeat badge](https://codebeat.co/badges/367e1edc-4f5b-4b5c-aad0-2e0d95d5c334)](https://codebeat.co/projects/github-com-nikolas-charalambidis-4it445-dev)

# 4IT445 Agile web application development | Sportify

A web application Sportify, as a semestral work, manages teams, leagues, matches, and players with a huge load of statistics. Developed for the 4IT445 Agile web application development course.

| Branch | Status |
|-------------|--------|
| `master` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=master)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| `dev` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=dev)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |

## Contributors

| Contributor | GitHub account | Feature branch | Status |
|-------------|----------------|----------------|--------|
| Nikolas Charalambidis | [Nikolas-Charalambidis](https://github.com/Nikolas-Charalambidis) | `feature/nikolas-ch` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fnikolas-ch)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| Jakub Jaroš | [jjaros587](https://github.com/jjaros587) | `feature/jakub-j` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fjakub-j)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| Vladimír Kozohorský | [kozohorsky](https://github.com/kozohorsky) | `feature/vladimir-k` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fvladimir-k)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| Vladimír Lešek | [vlesek](https://github.com/vlesek) | `feature/vladimir-l` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fvladimir-l)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| Jurij Povoroznyk | [povj01](https://github.com/povj01) |`feature/jurij-p` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fjurij-p)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |
| David Voráček | [Davis94](https://github.com/Davis94) | `feature/david-v` | [![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=feature%2Fdavid-v)](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) |

## Documentation
- Wireframes: [My Balsamiq](https://4it445.mybalsamiq.com/projects/sportify8)
- Backlog: [Trello](https://trello.com/b/xdKjZ1aC/sportify)
- API documentation: [Swagger](http://localhost:3001/docs/v1)
- Other documents (read only): [Google Drive](https://drive.google.com/drive/folders/1HR7KYamV8zcGRj8VAkLtMEJI15myPq_-?usp=sharing)  

## How to run locally

- Database: see at `/database/README.md`
- Backend: see at `/backend/README.md`
- Frontend: see at `/frontend/README.md`

## Contribution

### Flow
1. Checkout `dev` and `pull` from the origin.
2. Checkout your `feature/xxx` branch and merge updated `dev` into `feature/xxx`. Resolve the conflicts if required.
3. Develop, commit and push to the origin.
4. Open a pull request, which is available upon pushing to the origin in the yellow panel. You can always create a pull request in any case from `feature/xxx` into `dev`.
5. Wait until the [Travis](https://travis-ci.org/Nikolas-Charalambidis/4IT445/branches) CI checks pass and press "Merge".
6. Check if the changed files were updated and the `dev` branch and the CI is green for the `dev` branch.
7. Go to the step `1.` until we finish. :)

### Rule of thumb
The `feature/xxx` branches can be red, the `dev` branch cannot. Why? All are dependant on the `dev` branch which we merge into our `feature/xxx` branches regularly to avoid possible immerse merge conflicts. If the `dev` is red (failing), we are forced to not rely on this branch and only on our own, which is wrong.

- Make sure `yarn build` executes successfully. This is run on the Travis CI server as well.
- Run `yarn start` on **Frontend** or/and `yarn dev` on **Backend** and verify the correct behavior of the build.

### Warning :warning:
If the Travis CI build fails for a reason `npm` or another component cannot be downloaded (slow servers), the build fails.  Ask me out to trigger the build manually again or merge manually into `dev` or do by yourself if you are 100 % sure the build passes (no errors, no warnings)and  take full responsibility for the state of the `dev` branch. For this reason, I decided to leave the `dev` branch unlocked for the direct commits and merges.

## Nice to have, better CI and improvements

- Deployment of the web application test version to GitHub pages using mock data.
- Deployment of the Swagger documentation to GitHub Pages using mock data.

## Deployment and production servers

... to be done
