import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { services } from '../config/services'
import { openRazorpayCheckout } from '../lib/razorpay'
import { handleError } from '../lib/errorHandler'
import Spinner from '../components/ui/Spinner'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function Checkout() {
  const [isOpening, setIsOpening] = useState(true);
  const [params] = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  const orderId = params.get('order_id')
  const razorpayOrderId = params.get('razorpay_order_id')
  const amountPaise = Number(params.get('amount_paise'))
  const serviceId = params.get('service')
  const name = params.get('name') ?? ''
  const email = params.get('email') ?? ''
  const phone = params.get('phone') ?? ''

  const service = serviceId && services[serviceId] ? services[serviceId] : null

  useEffect(() => {
    if (!orderId || !razorpayOrderId || !amountPaise || !service) {
      setStatus('invalid')
      return
    }

    let cancelled = false

    openRazorpayCheckout({
      orderId,
      razorpayOrderId,
      amountPaise,
      name: decodeURIComponent(name),
      email: decodeURIComponent(email),
      phone: decodeURIComponent(phone),
      serviceTitle: service.title,
    })
      .then(() => setIsOpening(false))
      .catch((err) => {
        setIsOpening(false);

        if (cancelled) return
        if (err?.message === 'Payment cancelled') {
          setStatus('cancelled')
        } else {
          const safeError = handleError(err, 'payment')
          setError(safeError)
          setStatus('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [orderId, razorpayOrderId, amountPaise, service, name, email, phone])

  return (
    <div className="min-h-svh bg-cream py-20">
      <Container className="max-w-md text-center">
        {status === 'invalid' && (
          <>
            <h1 className="font-serif text-2xl text-ink">Invalid checkout</h1>
            <p className="mt-3 text-ink-muted">Please submit your form again.</p>
            <Button to="/services" className="mt-8">
              View services
            </Button>
          </>
        )}
        {status === 'cancelled' && (
          <>
            <h1 className="font-serif text-2xl text-ink">Payment cancelled</h1>
            <p className="mt-3 text-ink-muted">Order {orderId}</p>
            <Button to={service?.path ?? '/services'} className="mt-8">
              Try again
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-serif text-2xl text-ink">Payment error</h1>
            <p className="mt-3 text-ink-muted">{error}</p>
            <Button to="/" className="mt-8">
              Home
            </Button>
          </>
        )}
        {(status === 'loading' || isOpening) && (
          <>
            <Spinner />
            <h1 className="font-serif text-2xl text-ink">Complete payment</h1>
            <p className="mt-3 text-ink-muted">
              Order <strong className="text-ink">{orderId}</strong>
              {service ? ` · ${service.title}` : ''}
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Razorpay should open automatically. Allow pop-ups if it does not.
            </p>
          </>
        )}
      </Container>
    </div>
  )
}
