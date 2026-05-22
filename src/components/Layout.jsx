import { Outlet } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
