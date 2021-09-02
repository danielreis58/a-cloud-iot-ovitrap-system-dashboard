import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().max(255, 'maximum').required('required'),
  email: yup.string().email('email').required('required'),
  profile_id: yup.string().required('required'),
  nickname: yup.string().max(255, 'maximum')
})

export default schema
