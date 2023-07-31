FROM public.ecr.aws/docker/library/python:3.9
WORKDIR /src
COPY ./requirements.txt /src/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt
COPY ./app /src/app
COPY ./models /src/models
CMD ["uvicorn", "app.model_api:app", "--host", "0.0.0.0", "--port", "80"]