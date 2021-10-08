import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup.string().required(),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required()
})

export default schema
