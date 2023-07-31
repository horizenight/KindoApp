FROM public.ecr.aws/amazoncorretto/amazoncorretto:17
ADD build/libs/dpsspringbackend*.jar /app.jar
RUN sh -c 'touch /app.jar'
VOLUME /tmp
CMD ["java", "-jar", "/app.jar", "--spring.profiles.active=prod", "--server.port=80"]
EXPOSE 80