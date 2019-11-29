docker stop mysql_sportify && ^
docker rm -v mysql_sportify && ^
docker rmi mysql_sportify:latest && ^
docker build -t mysql_sportify . && ^
docker run -p 3306:3306 --name mysql_sportify mysql_sportify:latest