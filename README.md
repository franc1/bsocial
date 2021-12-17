# bSocial

### This project contains 1 main application and 2 microservices:

#### 1. bsocial-api

- Main application for managing users/posts/comments and sending Kafka messages to other microservices.
- See swagger documentation of this application on: **http://localhost:8080/api**

#### 2. bsocial-notifications-microservice

- Microservice that receives Kafka messages and send notifications to users (on new comments on his posts)

#### 3. bsocial-elasticsearch-microservice

- Microservice that stores Kafka messages in Elasticsearch

### Run the project

1. Clone project repository
2. Change directory to project directory
3. Run command: `docker-compose up`

### For testing notifications

1. Go to: **http://localhost:3001**
2. On dialog box put **JWT token** of logged user, which notifications want to receive
