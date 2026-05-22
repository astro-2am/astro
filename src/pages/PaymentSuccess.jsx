import { useSearchParams } from 'react-router-dom'
import { formatSla, services } from '../config/services'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function PaymentSuccess() {
  const [params] = useSearchParams()
  const orderId = params.get('order_id')
  const serviceId = params.get('service')
  const service = serviceId && services[serviceId] ? services[serviceId] : null

  return (
    <div className="min-h-svh bg-cream py-20">
      <Container className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-lavender-soft text-lavender text-xl">
          ✓
        </div>
        <h1 className="font-serif text-3xl text-ink">Payment received</h1>
        {orderId ? (
          <p className="mt-3 text-ink-muted">
            Order <span className="font-medium text-ink">{orderId}</span> is confirmed.
          </p>
        ) : (
          <p className="mt-3 text-ink-muted">Your payment was successful.</p>
        )}
        {service ? (
          <p className="mt-2 text-sm text-ink-soft">
            Expect your {service.title} report within {formatSla(service.slaHours)}.
          </p>
        ) : null}
        <p className="mt-4 text-sm text-ink-soft">Check your inbox and spam folder.</p>
        <Button to="/" className="mt-8">
          Return home
        </Button>
      </Container>
    </div>
  )
}
