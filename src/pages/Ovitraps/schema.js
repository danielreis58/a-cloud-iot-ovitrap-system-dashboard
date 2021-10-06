import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.string().uuid().required('required'),
  name: yup.string().max(255, 'maximum').required('required'),
  location: yup.object().shape({
    lat: yup.number().required('required'),
    lng: yup.number().required('required')
  }),
  user_id: yup.string().uuid().nullable().required('required'),
  company_id: yup.string().uuid().nullable().required('required')
})

export default schema
