FROM maven:3.8.7-openjdk-18-slim AS build

WORKDIR /app

COPY pom.xml /app/

COPY src/ /app/src/

RUN mvn clean package -DskipTests

FROM openjdk:18-slim

WORKDIR /app

COPY --from=build /app/target/audiostream-0.0.1-SNAPSHOT.jar /app/audiostream.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/audiostream.jar"]