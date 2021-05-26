import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Smart Ovitraps
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Copyright
