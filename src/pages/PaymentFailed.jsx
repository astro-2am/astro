import { useSearchParams } from 'react-router-dom'
import { services } from '../config/services'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function PaymentFailed() {
  const [params] = useSearchParams()
  const orderId = params.get('order_id')
  const serviceId = params.get('service')
  const service = serviceId && services[serviceId] ? services[serviceId] : null

  return (
    <div className="min-h-svh bg-cream py-20">
      <Container className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-ink">Payment not completed</h1>
        <p className="mt-3 text-ink-muted">
          {orderId ? `Order ${orderId} was not paid.` : 'Your payment did not go through.'}
        </p>
        <Button to={service?.path ?? '/services'} className="mt-8">
          Try again
        </Button>
      </Container>
    </div>
  )
}
