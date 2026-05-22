import { services } from '../config/services'
import { ServicePage } from '../components/ServicePage'
import { OrderForm } from '../components/OrderForm'
import { FormField } from '../components/FormField'

const service = services.janam_kundli

export function JanamKundli() {
  return (
    <ServicePage service={service}>
      <OrderForm serviceId={service.id}>
        <FormField label="Date of birth" name="p1_dob" type="date" required />
        <FormField
          label="Time of birth"
          name="p1_birth_time"
          type="time"
          required
          hint="As exact as possible. If unknown, mention in notes below."
        />
        <FormField label="Place of birth" name="p1_birth_place" as="place" required />
        <FormField label="Gender" name="p1_gender" as="select" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / prefer not to say</option>
        </FormField>
        <FormField
          label="Focus area (optional)"
          name="notes"
          as="textarea"
          rows={3}
          placeholder="e.g. career, marriage, health, general life overview"
        />
      </OrderForm>
    </ServicePage>
  )
}
