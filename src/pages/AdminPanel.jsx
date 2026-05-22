import { useState, useEffect } from 'react'
import { services } from '../config/services'

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL

export function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (password === 'admin123' || password === 'admin') {
      setIsLoggedIn(true)
    } else {
      alert('Invalid password')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4 font-sans text-ink">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-ink/5 bg-white p-8 shadow-card text-center"
        >
          <h1 className="mb-2 font-serif text-3xl">Admin Login</h1>
          <p className="mb-8 text-sm text-ink-muted">Sign in to view astrology orders</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-ink/10 bg-cream/30 px-4 py-3 text-ink transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-midnight px-6 py-3 font-medium text-white transition-all hover:bg-midnight-deep hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-midnight/20"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    )
  }

  return <Dashboard />
}

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        if (!SCRIPT_URL) throw new Error('VITE_SCRIPT_URL is missing')
        const res = await fetch(`${SCRIPT_URL}?action=getOrders`)
        if (!res.ok) throw new Error('Failed to fetch orders')
        
        const data = await res.json()
        if (data && data.orders) {
          setOrders(data.orders)
        } else {
          throw new Error('Invalid data format received')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const TABS = ['All', 'Janam Kundli', 'Kundli Milan', 'Ask a Question']

  // Normalize service keys to tab names
  const serviceToTab = {
    janam_kundli: 'Janam Kundli',
    kundli_milan: 'Kundli Milan',
    ask_question: 'Ask a Question',
  }

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'All') return true
    return serviceToTab[o.service] === activeTab
  })

  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <header className="border-b border-ink/5 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-serif text-2xl">Astro Admin</h1>
          <div className="text-sm text-ink-soft">
            Total Orders: <span className="font-medium text-ink">{orders.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-lavender text-midnight shadow-sm'
                  : 'bg-white text-ink-muted hover:bg-cream/50 hover:text-ink border border-ink/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* State Handling */}
        {loading && (
          <div className="flex h-40 items-center justify-center text-ink-soft">
            Loading orders from secure backend...
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-ink/5 bg-white text-ink-muted">
            No orders found for {activeTab}.
          </div>
        )}

        {!loading && !error && filteredOrders.length > 0 && (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedId === order.order_id
              const dateObj = new Date(order.created_at)
              const formattedDate = isNaN(dateObj)
                ? 'Unknown Date'
                : new Intl.DateTimeFormat('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(dateObj)

              return (
                <div
                  key={order.order_id}
                  className="overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-soft transition-all"
                >
                  {/* Summary Header */}
                  <div
                    className="flex cursor-pointer flex-wrap items-center justify-between gap-4 p-5 hover:bg-cream/20"
                    onClick={() => setExpandedId(isExpanded ? null : order.order_id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/20 text-indigo-glow font-bold text-sm">
                        {order.name ? order.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <h3 className="font-medium">{order.name}</h3>
                        <p className="text-xs text-ink-soft">{formattedDate} · {order.order_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium">{serviceToTab[order.service] || order.service}</p>
                        <p className="text-xs text-ink-soft">₹{order.amount_inr}</p>
                      </div>
                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status?.toUpperCase() || 'UNKNOWN'}
                      </div>
                      <div className="text-ink-soft">
                        {isExpanded ? '▲' : '▼'}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-ink/5 bg-cream/10 p-5 text-sm">
                      <div className="grid gap-8 md:grid-cols-2">
                        {/* Contact Info */}
                        <div>
                          <h4 className="mb-3 font-serif font-medium text-lavender">Contact Details</h4>
                          <div className="space-y-2 text-ink-muted">
                            <p><span className="font-medium text-ink">Email:</span> {order.email}</p>
                            <p><span className="font-medium text-ink">Phone:</span> {order.phone}</p>
                            <p><span className="font-medium text-ink">Language:</span> {order.language}</p>
                            {order.notes && (
                              <div className="mt-4">
                                <span className="font-medium text-ink block mb-1">Notes/Context:</span>
                                <p className="whitespace-pre-wrap rounded-lg bg-white p-3 border border-ink/5">{order.notes}</p>
                              </div>
                            )}
                            {order.question && (
                              <div className="mt-4">
                                <span className="font-medium text-ink block mb-1">Question ({order.category}):</span>
                                <p className="whitespace-pre-wrap rounded-lg bg-white p-3 border border-ink/5 italic">"{order.question}"</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Birth Details */}
                        <div>
                          <h4 className="mb-3 font-serif font-medium text-lavender">Birth Details</h4>
                          
                          {/* Person 1 */}
                          {order.p1_dob && (
                            <div className="mb-4 rounded-xl border border-ink/5 bg-white p-4">
                              <h5 className="mb-2 font-medium text-ink">{order.p1_name || 'Person 1'}</h5>
                              <ul className="space-y-1 text-ink-muted">
                                <li><span className="text-ink">DOB:</span> {order.p1_dob}</li>
                                <li><span className="text-ink">Time:</span> {order.p1_birth_time}</li>
                                <li><span className="text-ink">Place:</span> {order.p1_birth_place}</li>
                                <li><span className="text-ink">Gender:</span> {order.p1_gender}</li>
                              </ul>
                            </div>
                          )}

                          {/* Person 2 (Kundli Milan) */}
                          {order.p2_dob && (
                            <div className="rounded-xl border border-ink/5 bg-white p-4">
                              <h5 className="mb-2 font-medium text-ink">{order.p2_name || 'Person 2'}</h5>
                              <ul className="space-y-1 text-ink-muted">
                                <li><span className="text-ink">DOB:</span> {order.p2_dob}</li>
                                <li><span className="text-ink">Time:</span> {order.p2_birth_time}</li>
                                <li><span className="text-ink">Place:</span> {order.p2_birth_place}</li>
                                <li><span className="text-ink">Gender:</span> {order.p2_gender}</li>
                              </ul>
                            </div>
                          )}

                          {!order.p1_dob && !order.p2_dob && (
                            <p className="text-ink-soft">No birth details provided for this order.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
