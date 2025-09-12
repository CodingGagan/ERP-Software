from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="FastAPI Backend", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

# In-memory storage (replace with database in production)
items_db = []
next_id = 1

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/items", response_model=List[Item])
async def get_items():
    return items_db

@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    for item in items_db:
        if item["id"] == item_id:
            return item
    return {"error": "Item not found"}

@app.post("/items", response_model=Item)
async def create_item(item: ItemCreate):
    global next_id
    new_item = {
        "id": next_id,
        "name": item.name,
        "description": item.description,
        "price": item.price
    }
    items_db.append(new_item)
    next_id += 1
    return new_item

@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item: ItemCreate):
    for i, existing_item in enumerate(items_db):
        if existing_item["id"] == item_id:
            updated_item = {
                "id": item_id,
                "name": item.name,
                "description": item.description,
                "price": item.price
            }
            items_db[i] = updated_item
            return updated_item
    return {"error": "Item not found"}

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item["id"] == item_id:
            deleted_item = items_db.pop(i)
            return {"message": f"Item {deleted_item['name']} deleted successfully"}
    return {"error": "Item not found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
