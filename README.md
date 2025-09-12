# Next.js + FastAPI Docker Application

A full-stack web application with Next.js frontend and FastAPI backend, containerized with Docker.

## Project Structure

```
my-docker-app/
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS styles
│   ├── package.json        # Node.js dependencies
│   ├── next.config.js      # Next.js configuration
│   └── Dockerfile          # Frontend Docker configuration
├── dockerfile              # Backend Docker configuration
├── docker-compose.yml      # Multi-service Docker setup
└── README.md              # This file
```

## Features

### Backend (FastAPI)
- RESTful API with CRUD operations
- CORS enabled for frontend communication
- Pydantic models for data validation
- In-memory storage (easily replaceable with database)
- Auto-generated API documentation at `/docs`

### Frontend (Next.js)
- React-based user interface
- TypeScript support
- Responsive design
- Real-time item management
- API integration with FastAPI backend

## Prerequisites

- Docker and Docker Compose installed
- Git (for cloning the repository)

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd my-docker-app
   ```

2. **Build and start the services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development

### Running Individual Services

**Backend only:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

### API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /items` - Get all items
- `GET /items/{id}` - Get specific item
- `POST /items` - Create new item
- `PUT /items/{id}` - Update item
- `DELETE /items/{id}` - Delete item

### Adding New Features

1. **Backend changes:** Modify files in `backend/` directory
2. **Frontend changes:** Modify files in `frontend/` directory
3. **Docker changes:** Update `dockerfile` or `docker-compose.yml`

## Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose up --build backend
```

## Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
# Backend
PYTHONPATH=/app

# Frontend
NODE_ENV=development
```

## Production Deployment

For production deployment:

1. Update `docker-compose.yml` to use production configurations
2. Set `NODE_ENV=production` for frontend
3. Use a proper database instead of in-memory storage
4. Configure proper CORS origins
5. Set up reverse proxy (nginx) if needed

## Troubleshooting

**Port conflicts:** Make sure ports 3000 and 8000 are available
**Build issues:** Try `docker-compose down` then `docker-compose up --build`
**Network issues:** Check if containers can communicate via `docker-compose logs`

## Next Steps

- Add database integration (PostgreSQL, MongoDB)
- Implement user authentication
- Add more API endpoints
- Enhance frontend with additional features
- Add testing framework
- Set up CI/CD pipeline
