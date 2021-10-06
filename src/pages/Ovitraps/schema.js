import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.string().uuid().required('required'),
  name: yup.string().min(3, 'minimum').max(255, 'maximum').required('required'),
  latitude: yup.number().nullable().required('required'),
  longitude: yup.number().nullable().required('required'),
  user_id: yup.string().uuid().nullable().required('required'),
  company_id: yup.string().uuid().nullable().required('required')
})

export default schema
