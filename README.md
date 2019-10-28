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

## Code reviewers
- Tomáš Horáček as [heracek](https://github.com/heracek)
- Patr Čaněk as [CorwinCZ](https://github.com/CorwinCZ)

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

**The rule of thumb**: The `feature-xxx` branches can be red, the `dev` branch cannot. Why? All are dependant on the `dev` branch which we merge into our `feature-xxx` branches regularly to avoid possible immerse merge conflicts. If the `dev` is red (failing), we are forced to not rely on this branch and only on our own, which is wrong.

1. Make sure `yarn build` executes successfully. This is run on the Travis CI server as well.
2. Run `yarn start` on **Frontend** or/and `yarn dev` on **Backend** and verify the correct behavior of the build.
3. Commit & push to your feature/personal branch.
4. Create a pull request, which should be offered with GitHub. If all the CI pipelines succeed, feel free to merge into the `dev` branch using the button.

:warning: If the Travis CI build fails for a reason `npm` or another component cannot be downloaded (slow servers), the build fails. Ask me out or merge manually into `dev` if you are 100 % sure the build passes (no errors, no warnings) and you take full responsibility for the state of the `dev` branch. For this reason, I decided to leave the `dev` branch unlocked for the direct commits and merges.

## Nice to have, better CI and improvements

- Deployment of the web application test version to GitHub pages using mock data.
- Deployment of the Swagger documentation to GitHub Pages using mock data.

## Deployment and production servers

... to be done
