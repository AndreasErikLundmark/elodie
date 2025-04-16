FROM eclipse-temurin:23-jdk AS build

WORKDIR /app

# MAVEN WRAPPER
COPY .mvn/ .mvn
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY src/ src/

# Ensure the wrapper is executable
RUN chmod +x mvnw

# Use the Maven wrapper to build the project
RUN ./mvnw clean package -DskipTests

FROM openjdk:18-slim

WORKDIR /app

COPY --from=build /app/target/audiostream-0.0.1-SNAPSHOT.jar /app/audiostream.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/audiostream.jar"]
