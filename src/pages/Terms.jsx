import { Container } from '../components/ui/Container'
import { site } from '../config/site'

const LAST_UPDATED = '22 May 2025'

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl text-ink mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Para({ children }) {
  return <p className="mt-3 text-ink-muted leading-relaxed">{children}</p>
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-disc list-inside space-y-2 text-ink-muted leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function Terms() {
  return (
    <div className="bg-cream py-12 md:py-20">
      <Container className="max-w-3xl">
        {/* Header */}
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Terms &amp; Conditions</h1>
        <p className="mt-3 text-ink-muted text-sm">Last updated: {LAST_UPDATED}</p>
        <Para>
          Welcome to <strong>{site.name}</strong>. By accessing or using our website and services,
          you agree to be bound by these Terms &amp; Conditions. Please read them carefully before
          placing any order or using our services.
        </Para>

        {/* 1 */}
        <Section title="1. About Our Services">
          <Para>
            {site.name} provides Vedic astrology consultation services including but not limited to
            Janam Kundli (birth chart) preparation, Kundli Milan (compatibility matching), and
            personalised question-based readings.
          </Para>
          <Para>
            <strong>Disclaimer:</strong> {site.disclaimer} We do not guarantee specific outcomes or
            results. Our guidance is based on traditional Vedic astrology principles and is intended
            for spiritual and informational purposes only.
          </Para>
        </Section>

        {/* 2 */}
        <Section title="2. Eligibility">
          <BulletList
            items={[
              'You must be at least 18 years of age to use our services or have the consent of a parent or legal guardian.',
              'By placing an order, you confirm that the information provided by you is accurate, complete, and truthful.',
              'We reserve the right to refuse service to anyone at our sole discretion.',
            ]}
          />
        </Section>

        {/* 3 */}
        <Section title="3. Orders & Payments">
          <Para>
            All prices displayed on the website are in Indian Rupees (₹) and inclusive of applicable
            taxes unless stated otherwise.
          </Para>
          <BulletList
            items={[
              'Payment is required in full before we begin processing your order.',
              'We accept payments through Razorpay, which supports UPI, credit/debit cards, net banking, and select wallets.',
              'Upon successful payment you will receive an email confirmation with your Order ID.',
              'Reports and readings are prepared manually by our astrologer after payment confirmation.',
            ]}
          />
        </Section>

        {/* 4 */}
        <Section title="4. Delivery Timelines">
          <Para>
            We aim to deliver all reports within the estimated timeframe mentioned on each service
            page. Typical timelines are:
          </Para>
          <BulletList
            items={[
              'Janam Kundli — within 72 hours (3 business days)',
              'Kundli Milan — within 72 hours (3 business days)',
              'Ask a Question — within 48 hours (2 business days)',
            ]}
          />
          <Para>
            Delivery is made via email to the address provided during checkout. In exceptional
            circumstances (e.g., festival periods, high demand), there may be minor delays. We will
            notify you proactively if any delay is anticipated.
          </Para>
        </Section>

        {/* 5 */}
        <Section title="5. Refund & Cancellation Policy">
          <Para>
            Due to the personalised nature of our services, all sales are generally{' '}
            <strong>non-refundable</strong> once the report preparation has commenced.
          </Para>
          <BulletList
            items={[
              'If we are unable to deliver your report within the stated timeframe, you may request a full refund.',
              'Cancellation requests made before report preparation begins may be considered on a case-by-case basis.',
              'Refunds, when approved, will be processed to the original payment method within 5–7 business days.',
              'To request a refund or cancellation, email us with your Order ID.',
            ]}
          />
          <Para>
            Contact us at{' '}
            <a href={`mailto:${site.email}`} className="text-ink underline font-medium">
              {site.email}
            </a>{' '}
            with your Order ID for any refund or cancellation queries.
          </Para>
        </Section>

        {/* 6 */}
        <Section title="6. Accuracy of Information">
          <Para>
            The accuracy of our readings depends on the correctness of the information you provide
            (e.g., date of birth, time of birth, place of birth). We are not liable for inaccuracies
            resulting from incorrect or incomplete user-submitted data.
          </Para>
          <Para>
            It is your responsibility to double-check all birth details before submitting your order.
            We do not offer re-readings for free if the original data was entered incorrectly by the
            user.
          </Para>
        </Section>

        {/* 7 */}
        <Section title="7. Intellectual Property">
          <Para>
            All content on this website — including text, images, logos, page designs, and reports —
            is the intellectual property of {site.name} and is protected under applicable copyright
            laws.
          </Para>
          <BulletList
            items={[
              'Reports delivered to you are for your personal use only.',
              'You may not reproduce, distribute, or commercially exploit any content or reports without our prior written consent.',
              'Sharing screenshots or full copies of reports on social media or other public platforms is not permitted.',
            ]}
          />
        </Section>

        {/* 8 */}
        <Section title="8. Privacy & Data Protection">
          <Para>
            We take your privacy seriously. Personal information collected during the order process
            (name, email, phone, birth details, location) is used solely for the purpose of
            providing our astrological services and processing payments.
          </Para>
          <BulletList
            items={[
              'We do not sell, rent, or share your personal data with third parties.',
              'Data is securely stored and handled only by authorised personnel.',
              'Payment processing is handled by Razorpay; we do not store your card or banking details.',
            ]}
          />
          <Para>
            For full details, please review our{' '}
            <a href="/privacy" className="text-ink underline font-medium">
              Privacy Policy
            </a>
            .
          </Para>
        </Section>

        {/* 9 */}
        <Section title="9. User Conduct">
          <Para>By using our services, you agree not to:</Para>
          <BulletList
            items={[
              'Provide false or misleading personal information.',
              'Use our services for any unlawful or fraudulent purpose.',
              'Attempt to gain unauthorised access to our systems or data.',
              'Harass, abuse, or threaten our astrologer or support team.',
              'Reverse-engineer or scrape any part of our website.',
            ]}
          />
          <Para>
            We reserve the right to suspend or terminate your access if we believe you are in
            violation of these terms.
          </Para>
        </Section>

        {/* 10 */}
        <Section title="10. Limitation of Liability">
          <Para>
            To the maximum extent permitted by law, {site.name} and its astrologer(s) shall not be
            liable for any direct, indirect, incidental, consequential, or special damages arising
            from:
          </Para>
          <BulletList
            items={[
              'Your use of or inability to use our services.',
              'Any decisions made or actions taken based on astrological readings.',
              'Errors or omissions in content provided on this website.',
              'Unauthorised access to your data due to circumstances beyond our control.',
            ]}
          />
          <Para>
            Our total liability in any case shall not exceed the amount you paid for the specific
            service in question.
          </Para>
        </Section>

        {/* 11 */}
        <Section title="11. Third-Party Services">
          <Para>
            Our website may integrate with or link to third-party services, including but not limited
            to Razorpay (payment processing) and Google services (data storage). These services
            operate under their own terms and privacy policies.
          </Para>
          <Para>
            {site.name} is not responsible for the practices or availability of any third-party
            services.
          </Para>
        </Section>

        {/* 12 */}
        <Section title="12. Modifications to Terms">
          <Para>
            We reserve the right to update or modify these Terms &amp; Conditions at any time without
            prior notice. Changes will be effective immediately upon posting on this page. The "Last
            updated" date at the top reflects the most recent revision.
          </Para>
          <Para>
            Continued use of our services after any changes constitutes your acceptance of the
            revised terms.
          </Para>
        </Section>

        {/* 13 */}
        <Section title="13. Governing Law & Jurisdiction">
          <Para>
            These Terms &amp; Conditions are governed by and construed in accordance with the laws of
            India. Any disputes arising out of or relating to these terms shall be subject to the
            exclusive jurisdiction of the courts in India.
          </Para>
        </Section>

        {/* 14 */}
        <Section title="14. Contact Us">
          <Para>
            If you have any questions, concerns, or feedback regarding these Terms &amp; Conditions,
            please reach out to us:
          </Para>
          <div className="mt-4 bg-white/60 border border-amber-200/50 rounded-xl p-6 space-y-2 text-ink-muted">
            <p>
              <strong className="text-ink">Email:</strong>{' '}
              <a href={`mailto:${site.email}`} className="text-ink underline">
                {site.email}
              </a>
            </p>
            <p>
              <strong className="text-ink">Phone:</strong>{' '}
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="text-ink underline">
                {site.phone}
              </a>
            </p>
            <p>
              <strong className="text-ink">Website:</strong> {site.name}
            </p>
          </div>
        </Section>

        {/* Closing */}
        <div className="mt-12 pt-8 border-t border-amber-200/50 text-center">
          <p className="text-ink-muted text-sm leading-relaxed">
            By using {site.name}, you acknowledge that you have read, understood, and agree to be
            bound by these Terms &amp; Conditions.
          </p>
        </div>
      </Container>
    </div>
  )
}
