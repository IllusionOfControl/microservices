FROM python:3.9.10-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . ./

CMD ["uvicorn", "--host=0.0.0.0", "main:app"]
EXPOSE 8000
