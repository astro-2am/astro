import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { JanamKundli } from './pages/JanamKundli'
import { KundliMilan } from './pages/KundliMilan'
import { AskQuestion } from './pages/AskQuestion'
import { Checkout } from './pages/Checkout'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { PaymentFailed } from './pages/PaymentFailed'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { AdminPanel } from './pages/AdminPanel'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
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
      </ScrollToTop>
    </BrowserRouter>
  )
}
