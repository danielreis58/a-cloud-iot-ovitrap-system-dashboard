import React, { memo, forwardRef } from 'react'

import { TextField as MaterialTextField } from '@material-ui/core'

const TextField = forwardRef((props, ref) => (
  <>
    <MaterialTextField
      id={props.id}
      error={props.error}
      helperText={props.helperText}
      label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      multiline={props.multiline}
      color={props.color}
      variant={props.variant}
      name={props.name}
      ref={ref}
      inputRef={props.inputRef}
      inputProps={props.inputProps}
      onKeyPress={props.onKeyPress}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      defaultValue={props.defaultValue}
      value={props.value}
      style={props.style}
      rowsMax={props.rowsMax}
      rows={props.rows}
      onChange={props.onChange}
      onBlur={props.onBlur}
      InputLabelProps={{ shrink: props.shrink }}
      fullWidth={props.fullWidth}
    />
  </>
))

export default memo(TextField)
