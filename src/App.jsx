import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import Spinner from './components/ui/Spinner'

// Lazy load pages that are not immediately needed
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })))
const JanamKundli = lazy(() => import('./pages/JanamKundli').then(m => ({ default: m.JanamKundli })))
const KundliMilan = lazy(() => import('./pages/KundliMilan').then(m => ({ default: m.KundliMilan })))
const AskQuestion = lazy(() => import('./pages/AskQuestion').then(m => ({ default: m.AskQuestion })))
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess').then(m => ({ default: m.PaymentSuccess })))
const PaymentFailed = lazy(() => import('./pages/PaymentFailed').then(m => ({ default: m.PaymentFailed })))
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })))
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(m => ({ default: m.AdminPanel })))

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <Spinner />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="janam-kundli" element={<JanamKundli />} />
              <Route path="kundli-milan" element={<KundliMilan />} />
              <Route path="ask-question" element={<AskQuestion />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/success" element={<PaymentSuccess />} />
            <Route path="payment/failed" element={<PaymentFailed />} />
            <Route path="admin" element={<AdminPanel />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  )
}
