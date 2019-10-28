# 4IT445 Agile web application development | Sportify

A Sportify web application as a semestral work for the 4IT445 Agile web application development course.

## Backend

There are plenty of **Frontend** use-cases requiring the **Backend** to run. Make sure the **Database** is running.

  - The first version of generated Swagger documentation is available at [`http://localhost:3001/docs/v1`](http://localhost:3001/docs/v1). 
  - The API itself is versioned as well starting with the base path [`http://localhost:3001/api/v1`](http://localhost:3001/api/v1). 
 
##### Dependencies
 
If the dev/build is erroneous, install the dependencies from `package.json` with `yarn install`.  After a few minutes, you should notice the generated `node_modules` folder and be able to execute commands defined in the `package.json` (`scripts`).

##### Development

Execute `yarn dev` for happy coding. The REST endpoints should be exposed to [`http://localhost:3001/api/v1`](http://localhost:3001/api/v1). 

Optional: Test the health-check using `GET` request on [`http://localhost:3001/health`](http://localhost:3001/health).
