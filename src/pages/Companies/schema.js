import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().min(3, 'minimum').max(255, 'maximum').required('required'),
  email: yup
    .string()
    .min(3, 'minimum')
    .max(255, 'maximum')
    .required('required'),
  document: yup
    .string()
    .min(3, 'minimum')
    .max(255, 'maximum')
    .required('required'),
  site: yup.string().min(3, 'minimum').max(255, 'maximum'),
  cep: yup.string().min(3, 'minimum').max(255, 'maximum'),
  address: yup.string().min(3, 'minimum').max(255, 'maximum'),
  number: yup.number(),
  neighborhood: yup.string().min(3, 'minimum').max(255, 'maximum'),
  city: yup.string().min(3, 'minimum').max(255, 'maximum'),
  state: yup.string().min(3, 'minimum').max(255, 'maximum'),
  telephone: yup.string().min(3, 'minimum').max(255, 'maximum'),
  note: yup.string().min(3, 'minimum').max(255, 'maximum')
})

export default schema
