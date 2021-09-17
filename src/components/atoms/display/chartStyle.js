import pt from '../../../locales/pt/apex.json'
import en from '../../../locales/eng/apex.json'

const useOptions = (options) => ({
  chart: {
    locales: [options.defaultLocale === 'pt-br' ? pt : en],
    defaultLocale: options.defaultLocale
  },
  theme: {
    mode: 'light',
    palette: 'palette1'
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {},
  tooltip: {
    x: {
      format: 'hh:mm:ss dd/MM/yy'
    }
  }
})

export default useOptions
