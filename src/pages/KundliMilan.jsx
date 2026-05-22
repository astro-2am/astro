import { services } from '../config/services'
import { ServicePage } from '../components/ServicePage'
import { OrderForm } from '../components/OrderForm'
import { FormField } from '../components/FormField'

const service = services.kundli_milan

function PersonFields({ prefix, title }) {
  return (
    <fieldset className="fieldset">
      <legend>{title}</legend>
      <FormField label="Full name" name={`${prefix}_name`} required />
      <FormField label="Date of birth" name={`${prefix}_dob`} type="date" required />
      <FormField label="Time of birth" name={`${prefix}_birth_time`} type="time" required />
      <FormField label="Place of birth" name={`${prefix}_birth_place`} as="place" required />
      <FormField label="Gender" name={`${prefix}_gender`} as="select" required defaultValue="">
        <option value="" disabled>
          Select
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </FormField>
    </fieldset>
  )
}

export function KundliMilan() {
  return (
    <ServicePage service={service}>
      <OrderForm serviceId={service.id}>
        <PersonFields prefix="p1" title="Person 1 (e.g. bride / partner A)" />
        <PersonFields prefix="p2" title="Person 2 (e.g. groom / partner B)" />
        <FormField label="Relationship context" name="notes" as="textarea" rows={2} placeholder="e.g. marriage proposal, engaged, married" />
      </OrderForm>
    </ServicePage>
  )
}
