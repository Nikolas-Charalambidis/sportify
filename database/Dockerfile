FROM mysql:5.7

# Environment variables
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE sportify

# Create Database
RUN mkdir /usr/sql
RUN chmod 644 /usr/sql

# Copy the initialization script
COPY ./sql/ddl.sql /docker-entrypoint-initdb.d/

EXPOSE 3306