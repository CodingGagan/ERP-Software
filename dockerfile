FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ /app/

# Expose FastAPI port
EXPOSE 8000

# Default command (development)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
