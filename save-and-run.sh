docker build -t rocketsgraphql/first-customers .
docker run -p 3000:3000 --name rocketsgraphql-first-customers -d -t rocketsgraphql/first-customers

