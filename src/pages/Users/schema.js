import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().min(3, 'minimum').max(255, 'maximum').required('required'),
  email: yup.string().email('email').required('required'),
  profile_id: yup.string().uuid().nullable().required('required'),
  company_id: yup.string().uuid().nullable().required('required'),
  nickname: yup.string().min(3, 'minimum').max(255, 'maximum')
})

export default schema
