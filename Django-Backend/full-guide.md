Absolutely! Let’s walk **step-by-step** through:

> ✅ **Creating a Django project inside Docker**,  
> ✅ **Using PostgreSQL as the database**,  
> ✅ **Keeping source code local**, and  
> ✅ **Running an interactive shell like `python manage.py shell`**

---

## 🛠 Step-by-Step: Dockerized Django + PostgreSQL Dev Setup

---

### **Step 1: Project Folder Structure**

Start in an empty directory:

```bash
mkdir django-docker-postgres
cd django-docker-postgres
```

---

### **Step 2: Create `Dockerfile`**

Create a file called `Dockerfile`:

```Dockerfile
# Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
```

---

### **Step 3: Create `requirements.txt`**

```txt
Django>=4.2
psycopg2-binary>=2.9
```

---

### **Step 4: Create `docker-compose.yml`**

```yaml
version: "3.9"

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
```

---

### **Step 5: Build the Docker Image**

```bash
docker compose build
```

---

### **Step 6: Create the Django Project**

Run this inside the container:

```bash
docker compose run django django-admin startproject myproject .
```

Now your folder looks like:

```plaintext
.
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── myproject/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

---

### **Step 7: Configure Django to Use PostgreSQL**

Edit `myproject/settings.py`:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("POSTGRES_DB"),
        'USER': os.getenv("POSTGRES_USER"),
        'PASSWORD': os.getenv("POSTGRES_PASSWORD"),
        'HOST': 'db',  # <--- Matches the service name in docker-compose
        'PORT': '5432',
    }
}
```

---

### **Step 8: Start Services**

```bash
docker compose up
```

Keep it running, or open another terminal tab.

---

### **Step 9: Run Migrations and Create Superuser**

Open a shell into the Django container:

```bash
docker compose exec django bash
```

Inside the container:

```bash
python manage.py migrate
python manage.py createsuperuser  # optional
```

---

### **Step 10: Access the Django Site**

Visit: [http://localhost:8000](http://localhost:8000/)

---

### **Step 11: Use Interactive Django Shell**

Inside the container:

```bash
python manage.py shell
```
