import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().max(255, 'maximum').required('required'),
  email: yup.string().max(255, 'maximum').required('required'),
  document: yup.string().max(255, 'maximum').required('required'),
  site: yup.string().max(255, 'maximum'),
  cep: yup.string().max(255, 'maximum'),
  address: yup.string().max(255, 'maximum'),
  number: yup.number(),
  neighborhood: yup.string().max(255, 'maximum'),
  city: yup.string().max(255, 'maximum'),
  state: yup.string().min(2, 'minimum').max(255, 'maximum'),
  telephone: yup.string().max(255, 'maximum'),
  note: yup.string().max(255, 'maximum')
})

export default schema
