import { services } from '../config/services'
import { ServicePage } from '../components/ServicePage'
import { OrderForm } from '../components/OrderForm'
import { FormField } from '../components/FormField'

const service = services.ask_question

const CATEGORIES = [
  'Career',
  'Love & marriage',
  'Finance',
  'Health',
  'Family',
  'General',
]

export function AskQuestion() {
  return (
    <ServicePage service={service}>
      <OrderForm serviceId={service.id}>
        <FormField label="Your question" name="question" as="textarea" rows={5} required maxLength={1000} hint="One clear question per order (max 1000 characters)." />
        <FormField label="Category" name="category" as="select" required defaultValue="">
          <option value="" disabled>
            Select category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FormField>
        <fieldset className="fieldset">
          <legend>Birth details (optional — if answer needs your chart)</legend>
          <FormField label="Date of birth" name="p1_dob" type="date" />
          <FormField label="Time of birth" name="p1_birth_time" type="time" />
          <FormField label="Place of birth" name="p1_birth_place" as="place" />
        </fieldset>
      </OrderForm>
    </ServicePage>
  )
}
