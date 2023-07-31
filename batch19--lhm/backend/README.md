# Kindo App
## Getting Started:
To run the backend, follow these steps:
## Building the container image using the default builder

**Note**: /.gradlew is a script, ensure that it has Unix-style LF line endings before building the image. 

```
pack build backend-app:dev --path . 
```
## Running the container image

**Note**: Start the database with Docker compose before starting the backend container.
```
docker compose up -d
```

```
docker run --rm -p 8080:8080 -e "SPRING_PROFILES_ACTIVE=dev" backend-app:dev  
```

> --rm Automatically remove the container when it exits

> -p 8080:8080 expose port 8080 to other Docker containers on the same network and 8080 to the host

> -e SPRING_PROFILES_ACTIVE=dev Pass SPRING_PROFILES_ACTIVE as environment variable to Spring Boot app to activate dev profile

## Running the Backend

1. Change directory to the "backend" folder:
   ```cd backend```
2.  Start the frontend application:
```./gradlew bootRun --args='--spring.profiles.active=dev'```
This will launch the backend application locally, and you can access it in your web browser by visiting `http://localhost:8080` (or a different port if specified).
Please ensure you have postgreSQL and Java installed before running the above commands.
## Technologies Used:
- Spring Java Framework
- REST API
- PostgreSQL
- Docker
## Tables
- Users
- Place
- Path
- Audio
- Category
## Endpoints
To see every endpoints look Controller classes in /backend/src/main/java/demo/

## ER Diagram
![ER Diagram](https://github.com/DigitalProductschool/batch19--lhm/blob/backend_dev/backend/media/ER_Diagram.png?raw=true) 