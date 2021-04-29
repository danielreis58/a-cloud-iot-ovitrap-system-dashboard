import React from 'react'
import { InputBase } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const SearchField = (props) => {
  const BootstrapInput = withStyles((theme) => ({
    root: {
      color: 'rgba(28,48,89,1)',
      backgroundColor: 'transparent',
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      fontSize: 14,
      width: '100%',
      maxHeight: 48,
      padding: '13px 16px',
      borderRadius: 24,
      textAlign: 'left',
      color: 'rgba(28,48,89,1)',
      transition: 'all 200ms ease-in-out',
      boxShadow: `0 0 0 1px rgba(0, 0, 0, 0.23)`,
      '&:focus': {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
      }
    }
  }))(InputBase)

  return (
    <>
      <BootstrapInput
        id={props.id}
        error={props.error}
        helpertext={props.helpertext}
        label={props.label}
        placeholder={props.placeholder}
        type={props.type}
        color={props.color}
        variant={props.variant}
        name={props.name}
        ref={props.ref}
        onKeyUp={props.onKeyUp}
        inputRef={props.inputRef}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        fullWidth={props.fullWidth}
      />
    </>
  )
}

export default React.memo(SearchField)
