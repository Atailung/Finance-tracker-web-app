import os

# Create folder structure
base_dir = "django-docker-postgres"
os.makedirs(base_dir, exist_ok=True)

# Define file contents
dockerfile_content = '''# Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
'''

requirements_txt = '''Django>=4.2
psycopg2-binary>=2.9
'''

docker_compose_yml = '''version: "3.9"

services:
  django:
    build: .
    volumes:
      - .:/code
    working_dir: /code
    ports:
      - "8000:8000"
    depends_on:
      - db
    env_file:
      .env
    stdin_open: true
    tty: true

  db:
    image: postgres:15
    restart: always
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data/

volumes:
  postgres_data:
'''

# Paths to files
dockerfile_path = os.path.join(base_dir, "Dockerfile")
requirements_path = os.path.join(base_dir, "requirements.txt")
docker_compose_path = os.path.join(base_dir, "docker-compose.yml")

# Write the files
with open(dockerfile_path, "w") as f:
    f.write(dockerfile_content)

with open(requirements_path, "w") as f:
    f.write(requirements_txt)

with open(docker_compose_path, "w") as f:
    f.write(docker_compose_yml)

print(f"Project files created in ./{base_dir}")
