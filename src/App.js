import React, { useState, useEffect } from 'react';
import './App.css';

const INVENTORY = [
  // --- ORIGINAL ITEMS ---
  { id: 1, name: "Sugar (Cheeni)", price: 155, category: 'loose', type: 'solid' },
  { id: 2, name: "Basmati Rice", price: 340, category: 'loose', type: 'solid' },
  { id: 3, name: "Milk (Doodh)", price: 220, category: 'loose', type: 'liquid' },
  { id: 4, name: "Red Chilli Powder", price: 1200, category: 'loose', type: 'solid' },
  { id: 5, name: "Daal Mash", price: 520, category: 'loose', type: 'solid' },
  { id: 7, name: "Lipton Tea", price: 1650, category: 'fixed', type: 'solid' },
  { id: 8, name: "Tapal Danedar", price: 1580, category: 'fixed', type: 'solid' },
  { id: 9, name: "Surf Excel 1kg", price: 680, category: 'fixed', type: 'solid' },
  { id: 11, name: "Dalda Ghee", price: 610, category: 'fixed', type: 'liquid' },
  { id: 15, name: "Lux Soap", price: 125, category: 'count' },
  { id: 18, name: "Farm Eggs", price: 35, category: 'count' },
  { id: 19, name: "Dawn Bread (L)", price: 240, category: 'count' },
  { id: 21, name: "Sooper Biscuit", price: 60, category: 'count' },
  { id: 28, name: "Coca Cola 1.5L", price: 200, category: 'count' },
  { id: 30, name: "Olpers 1L", price: 290, category: 'count' },
  { id: 34, name: "Panadol Strip", price: 45, category: 'count' },
  { id: 35, name: "Cooking Oil", price: 580, category: 'loose', type: 'liquid' },
  { id: 36, name: "Atta (Flour)", price: 140, category: 'loose', type: 'solid' },
  { id: 37, name: "Salt (Namak)", price: 60, category: 'loose', type: 'solid' },
  { id: 38, name: "Black Pepper", price: 300, category: 'loose', type: 'solid' },
  { id: 39, name: "Yogurt", price: 220, category: 'loose', type: 'liquid' },
  { id: 40, name: "Nido 1kg", price: 2450, category: 'fixed', type: 'solid' },
  { id: 41, name: "Milo Large", price: 1100, category: 'fixed', type: 'solid' },
  { id: 42, name: "Tang Orange", price: 850, category: 'fixed', type: 'solid' },
  { id: 43, name: "Dettol Liquid", price: 450, category: 'fixed', type: 'liquid' },
  { id: 44, name: "Lifebuoy Soap", price: 110, category: 'count' },
  { id: 45, name: "Colgate Toothpaste", price: 280, category: 'count' },
  { id: 46, name: "Sunsilk Shampoo Sachet", price: 15, category: 'count'},
  { id: 47, name: "Matchbox", price: 5, category: 'count' },
  { id: 48, name: "Green Tea Bag", price: 25, category: 'count' },
  { id: 49, name: "Snickers Bar", price: 180, category: 'count' },
  { id: 50, name: "Mineral Water 1.5L", price: 90, category: 'count' },
  { id: 51, name: "Dishwash Bar", price: 85, category: 'count' },
  { id: 52, name: "Garlic (Lehsan)", price: 400, category: 'loose', type: 'solid' },
  { id: 53, name: "Ginger (Adrak)", price: 600, category: 'loose', type: 'solid' },
  { id: 54, name: "Lays Chips", price: 50, category: 'count' }
];

const IrshadStore = () => {
  const [page, setPage] = useState('shop');
  const [sales, setSales] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState('');
  const [toast, setToast] = useState(null); // Changed to store message

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const calculateTotal = (item, q, u) => {
    if (item.category === 'fixed' || item.category === 'count') return item.price * q;
    return (u === 'g' || u === 'ml') ? (item.price / 1000) * q : item.price * q;
  };

  const openSaleModal = (item) => {
    setActiveItem(item);
    setQty(1);
    setUnit(item.category === 'count' ? 'pcs' : (item.type === 'solid' ? 'kg' : 'L'));
  };

  const saveSale = () => {
    const total = calculateTotal(activeItem, qty, unit);
    setSales([{
      id: Date.now(),
      name: activeItem.name,
      qty, unit, total,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }, ...sales]);
    setToast(`${activeItem.name} added!`);
    setActiveItem(null);
  };

  const deleteItem = (id) => {
    setSales(sales.filter(item => item.id !== id));
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div className="app-shell">
      {toast && (
        <div className="toast-popup">
          <div className="toast-content">
            <span className="toast-icon">✨</span>
            <div className="toast-text">
              <strong>Success!</strong>
              <p>{toast}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="glass-nav">
        <h1 className="logo">Irshad<span>Store</span></h1>
        <div className="nav-btns">
          <button className={page === 'shop' ? 'active' : ''} onClick={() => setPage('shop')}>Shop Items</button>
          <button className={page === 'report' ? 'active' : ''} onClick={() => setPage('report')}>Daily Report</button>
        </div>
      </nav>

      {page === 'shop' ? (
        <main className="store-grid">
          {INVENTORY.map(item => (
            <div key={item.id} className="item-card" onClick={() => openSaleModal(item)}>
              <div className={`badge ${item.category}`}>{item.category}</div>
              <span className="icon">{item.icon}</span>
              <h4>{item.name}</h4>
              <p>Rs. {item.price}</p>
            </div>
          ))}

          {activeItem && (
            <div className="overlay">
              <div className="cool-modal">
                <div className="modal-accent"></div>
                <div className="modal-head">
                  <span className="modal-emoji">{activeItem.icon}</span>
                  <h3>{activeItem.name}</h3>
                  <p>Current Price: Rs. {activeItem.price}</p>
                </div>
                <div className="modal-body">
                  {activeItem.category === 'fixed' ? (
                    <div className="pack-grid">
                      {[1, 0.5, 0.25].map(v => (
                        <button key={v} className={qty === v ? 'sel' : ''} onClick={() => setQty(v)}>
                          {v === 1 ? '1 KG/L' : `${v * 1000} G/ML`}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="manual-input">
  <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} autoFocus />
  
                    {activeItem.category === 'loose' && (
                      <div className="unit-toggle-container">
                        <div className={`unit-slider ${unit === 'g' || unit === 'ml' ? 'shift' : ''}`}></div>
                        <button 
                          className={`unit-btn ${unit === 'kg' || unit === 'L' ? 'active' : ''}`} 
                          onClick={() => setUnit(activeItem.type === 'solid' ? 'kg' : 'L')}
                        >
                          {activeItem.type === 'solid' ? 'KG' : 'Litre'}
                        </button>
                        <button 
                          className={`unit-btn ${unit === 'g' || unit === 'ml' ? 'active' : ''}`} 
                          onClick={() => setUnit(activeItem.type === 'solid' ? 'g' : 'ml')}
                        >
                          {activeItem.type === 'solid' ? 'Grams' : 'ML'}
                        </button>
                      </div>
                    )}
                  </div>
                  )}
                </div>
                <div className="modal-foot">
                  <button className="confirm-cool" onClick={saveSale}>
                    Confirm Total: Rs. {calculateTotal(activeItem, qty, unit).toFixed(0)}
                  </button>
                  <button className="cancel-cool" onClick={() => setActiveItem(null)}>Go Back</button>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <section className="report-view">
          <div className="revenue-glass">
            <div className="stat"><span>Total Items</span><h2>{sales.length}</h2></div>
            <div className="stat accent"><span>Total Income</span><h2>+{totalRevenue.toLocaleString()} PKR</h2></div>
          </div>
          <div className="table-glass">
            <table>
              <thead><tr><th>Time</th><th>Item</th><th>Qty</th><th>Total</th><th>Action</th></tr></thead>
              <tbody>
                {sales.map(s => (
                  <tr key={s.id}>
                    <td>{s.time}</td>
                    <td>{s.name}</td>
                    <td>{s.qty}{s.unit}</td>
                    <td>Rs. {s.total.toFixed(0)}</td>
                    <td><button className="delete-btn" onClick={() => deleteItem(s.id)}>Remove🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default IrshadStore;