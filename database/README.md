# 4IT445 Agile web application development | Sportify

A web application Sportify, as a semestral work, manages teams, leagues, matches, and players with a huge load of statistics. Developed for the 4IT445 Agile web application development course.

## Database

In order to work with **Backend** properly, you have to run a MySQL database with a correct configuration instance first:

 - `root@localhost:3306`

**Disclaimer**: The Docker set-up is described below. In case you are not happy to use Docker, feel free to use your own MySQL. Follow the installation for your OS: [https://dev.mysql.com/doc/mysql-installation-excerpt/5.5/en/windows-install-archive.html](https://dev.mysql.com/doc/mysql-installation-excerpt/5.5/en/windows-install-archive.html). 
Don't forget to execute the initialization scripts(s) at the `\database\sql` directory to work with the data. Just keep on your mind we won't describe nor support this way since we :heartpulse: Docker and we think it's necessary for the developers to know this technology nowadays.

### Docker

##### Complete set-up from scratch
This is useful when an unknown behavior occurs or a fully new created container is preferred:

 1. Stop an existing container (if exists) with `docker stop mysql_sportify` and remove with `docker rm mysql_sportify`.
 2. Remove its image with  `docker rmi mysql_sportify:latest`
 3. Build a new image with `docker build -t mysql_sportify .`. Mind the `.` dot at the end of the command!
 4. Run the built container with the very same name as the image with `docker run -p 3306:3306 --name mysql_sportify mysql_sportify`. If you prefer to run it as a daemon, simply add the `-d` parameter.
 5. Enjoy the connection on `localhost:3306` with credentials `root:password`.

##### Container manipulation
Generally, when there are no changes in the SQL, feel free to use only these commands.

- Stop the existing container with `docker stop mysql_sportify`
- Start the existing container with `docker start mysql_sportify`
- Remove the existing container with `docker rm mysql_sportify`. Then it has to be created again.

##### Cheatsheet
You might find this handy...
- Show all images: `docker images`
- Show all containers: `docker ps -a`
- Clear all dangling and unreferenced containers, images, networks, volumes, etc.: `docker system prune` and confirm with `y`. 

### Troubleshooting (Windows)
Shit happens often...

##### Error: Access denied for user 'pepa-z-depa@localhost' (using password: NO)

You try to connect to the database with your default user (unless it is named as `root` as well). You probably have no file named `/backend/.env`, therefore the default configuration is used. Check this file and use the templates. Don't forget to set the user as `root` and password as `password` which is set in the `Dockerfile`.

##### Error: Access denied for user 'root@localhost' (using password: NO)

Sounds better, the `/backend/.env` seems to be configured correctly. However, a bigger problem has been raised. There is either another instance of MySQL running or anything else blocking the `3306` port, so the connection cannot be established.
If your localhost username is `root`, the wrong password in the `/backend/.env` might be an issue. Otherwise, do the following:

- Find what blocks the port. Open the `cmd.exe` and type `netstat -aon | find "8080"`. The output should look like below:
   ```$shell
   TCP    0.0.0.0:3306           0.0.0.0:0              LISTENING       12172
   TCP    [::]:3306              [::]:0                 LISTENING       12172
   ```
- Press <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>esc</kbd> to open the Task Manager and find what uses the PID found above (`12172`).
- Kill the process or move it to another port.

**Untested**: If you don't want to touch what already runs there (since it might be important to your work), you have to make the Docker container listen on another port (of course, you have to change the `/backend/.env` correctly):
   ```$shell
   docker run -p 3306:3307 --name mysql_sportify mysql_sportify:latest
   ```
