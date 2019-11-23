docker stop mysql_sportify && ^
docker rm -v mysql_sportify && ^
docker rmi mysql_sportify:latest && ^
docker build -t mysql_sportify .