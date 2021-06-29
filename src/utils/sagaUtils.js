/* eslint-disable import/prefer-default-export */
export const getErrorMessage = (error) => {
  let message = error?.response?.data?.data?.message || 'Error'
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        message = 'Invalid credentials'
        break
      case 404:
        message = 'Sorry! the page you are looking for could not be found'
        break
      case 500:
        message = 'Sorry! something went wrong, please contact our support team'
        break
      default:
        break
    }
  }
  return message
}
