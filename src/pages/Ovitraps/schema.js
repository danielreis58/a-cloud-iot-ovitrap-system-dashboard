import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.string().uuid().required('required'),
  name: yup.string().max(255, 'maximum').required('required'),
  user_id: yup.string().uuid().required('required')
})

export default schema
