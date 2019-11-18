docker stop mysql_sportify && ^
docker rm mysql_sportify && ^
docker rmi mysql_sportify:latest && ^
docker build -t mysql_sportify .