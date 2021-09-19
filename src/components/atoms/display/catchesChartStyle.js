import pt from '../../../locales/pt/apex.json'
import en from '../../../locales/eng/apex.json'

const useOptions = (options) => ({
  chart: { id: 'catches-chart', locales: [en, pt], defaultLocale: 'pt-BR' },
  theme: {
    mode: 'light',
    palette: 'palette1',
    monochrome: {
      enabled: false,
      color: '#255aee',
      shadeTo: 'light',
      shadeIntensity: 0.65
    }
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
      format: 'dd/MM/yy'
    }
  }
})

export default useOptions
