import React, { memo } from 'react'
import parse, { domToReact } from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useTheme } from '@material-ui/core/styles'

const HighlightSearch = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()

  const parseInsights = () => {
    var text = props.text
    if (props.keyword) {
      text = text.replace(new RegExp(props.keyword, 'gi'), (result) => {
        return `<span value="${result}">${result}</span>`
      })
      return text
    } else {
      return text
    }
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
        if (props.copy) {
          return (
            <span
              className={`anchor-${props.anchor}`}
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
        } else {
          return (
            <span className={`anchor-${props.anchor}`}>
              {domToReact(children, options)}
            </span>
          )
        }
      }
    },
  }

  return parse(parseInsights(props.text), options)
}

export default memo(HighlightSearch)
