import React, { memo } from 'react'
import parse, { domToReact } from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

const Highlight = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const features = useSelector((state) => state.features)

  const regexFromString = (string) => {
    var match = /^\/(.*)\/([a-z]*)$/.exec(string)
    return new RegExp(match[1], match[2])
  }

  const parseInsights = (string) => {
    var text = string
    features.map((feature) => {
      if (feature.name === 'Insight' && feature.active) {
        feature.config?.list?.map((insight) => {
          if (insight.active) {
            const regex = regexFromString(insight.regex)
            text = text.replace(regex, (result) => {
              return `<span value="${result}">${result}</span>`
            })
          }
        })
      }
    })
    return text
  }

  const copyToClippboard = (string) => {
    navigator.clipboard.writeText(string).then(
      () => {
        enqueueSnackbar(`${t('commons.copied')} "${string}"`, {
          variant: 'success',
        })
      },
      (err) => {
        console.error(t('commons.copiedError'), err)
      }
    )
  }

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return
      } else {
        return (
          <span
            className={`anchor-insight`}
            style={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={(e) => copyToClippboard(attribs.value)}
          >
            {domToReact(children, options)}
          </span>
        )
      }
    },
  }

  return parse(parseInsights(props.text), options)
}

export default memo(Highlight)
