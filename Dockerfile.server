FROM python:3.8.0

COPY . /app
WORKDIR /app

RUN apt-get -q update && apt-get -qy install netcat
RUN pip install -U -r requirements.txt
