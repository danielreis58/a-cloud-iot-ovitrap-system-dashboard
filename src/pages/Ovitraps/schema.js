import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().max(255, 'maximum').required('required'),
  user_id: yup.string().required('required')
})

export default schema
