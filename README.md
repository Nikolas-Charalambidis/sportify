[![Build Status](https://travis-ci.org/Nikolas-Charalambidis/4IT445.svg?branch=dev)](https://travis-ci.org/Nikolas-Charalambidis/4IT445)

# 4IT445 Agile web application development | Sportify

A Sportify web application as a semestral work for the 4IT445 Agile web application development course.

## Contributors
- Nikolas Charalambidis as [Nikolas-Charalambidis](https://github.com/Nikolas-Charalambidis)
- Jakub Jaroš as [jjaros587](https://github.com/jjaros587)
- Vladimír Kozohorský as [kozohorsky](https://github.com/kozohorsky)
- Vladimír Lešek as [vlesek](https://github.com/vlesek)
- Jurij Povoroznyk as [povj01](https://github.com/povj01)
- David Voráček as [Davis94](https://github.com/Davis94)

## Code reviewers
- Tomáš Horáček as [heracek](https://github.com/heracek)
- Patr Čaněk as [CorwinCZ](https://github.com/CorwinCZ)

## Documentation
- Wireframes: [My Balsamiq](https://4it445.mybalsamiq.com/projects/sportify8)
- Backlog: [Trello](https://trello.com/b/xdKjZ1aC/sportify)
- Technical documentation: [GitHub Wiki](https://github.com/Nikolas-Charalambidis/4IT445/wiki)
- Other documents (read only): [Google Drive](https://drive.google.com/drive/folders/1HR7KYamV8zcGRj8VAkLtMEJI15myPq_-?usp=sharing)  

## How to run locally

### Database

**Create a new container**
1. Build the `\database\Dockerfile` navigating to `\database` and running `docker build -t mysql_sportify .` Mind the `.` dot at the end of the command!
2. Run the container and name it the as same as the image `docker run -p 3306:3306 --name mysql_sportify mysql_sportify`. If you want to run it as a daemon, execute with the `-d` parameter.
3. Enjoy the connection on `localhost:3306` with credentials `root:password`.

**Stop/start an existing container**
- Stop container: `docker stop mysql_sportify`.
- Start container: `docker start mysql_sportify`.
- Remove container: `docker rm mysql_sportify`. Then it has to be created again.

In case you are not happy to use Docker, feel free to use your own MySQL instance with the initialization script(s) at the `\database\sql` directory.

### Backend

**Install dependencies**
1. Navigate to `\backend`
2. Execute `yarn install` to install all the dependencies. 
3. After a few minutes, you should notice the generated `node_modules` folder and be able to execute commands defined in the `package.json` (`scripts`).

**Develop**
1. Execute `yarn dev` for happy coding. The REST endpoints should be exposed to [http://localhost:3001](http://localhost:3001).
2. Test [http://localhost:3001/foo](http://localhost:3001/foo) and change the code, the response should change upon new `GET` request.

**Contribute**
1. Make sure `yarn build` executes successfully. This is run on the Travis CI server as well.
2. Run `yarn start` and verify the correct behavior of the build.
3. Commit & push to your feature/personal branch and merge into `dev` branch. 

### Frontend

**Install dependencies**
1. Navigate to `\frontend`
2. Execute `yarn install` to install all the dependencies. 
3. After a few minutes, you should notice the generated `node_modules` folder and be able to execute commands defined in the `package.json` (`scripts`).

**Develop**
1. Execute `yarn start` for happy coding. The web application should be available on [http://localhost:3000](http://localhost:3000).
2. Remove line `BROWSER=none` at the `\frontend.env` file if you wish to open a browser with the webpage immediately. 

**Contribute**
1. Make sure `yarn build` executes successfully. This is run on the Travis CI server as well.
2. Run `yarn start` and verify the correct behavior of the build.
3. Commit & push to your feature/personal branch and merge into `dev` branch. 

## Deployment

... to be done

## Production servers

... to be done
