import { useState, useEffect } from 'react'
import axios from 'axios'

interface Item {
  id: number
  name: string
  description?: string
  price: number
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items')
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/items', newItem)
      setItems([...items, response.data])
      setNewItem({ name: '', description: '', price: 0 })
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/items/${id}`)
      setItems(items.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Next.js + FastAPI Demo</h1>
      
      <div className="add-item-form">
        <h2>Add New Item</h2>
        <form onSubmit={addItem}>
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            step="0.01"
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="items-list">
        <h2>Items ({items.length})</h2>
        {items.length === 0 ? (
          <p>No items yet. Add one above!</p>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                <p className="price">${item.price.toFixed(2)}</p>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
