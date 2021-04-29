import React from 'react'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'

const SelectField = (props) => {
  const theme = useTheme()
  return (
    <>
      <FormControl variant="outlined" color="primary" fullWidth>
        <InputLabel error={props.error} label="teste" shrink id={`input-label`}>
          {props.label}
        </InputLabel>
        <Select
          id={`select-label`}
          label={props.label}
          labelId={`input-label-${props.label}`}
          name={props.name}
          inputRef={props.inputRef}
          displayEmpty
          value={props.value ? props.value : ''}
          defaultValue={props.defaultValue ? props.defaultValue : ''}
          onChange={props.onChange}
          input={<OutlinedInput notched label={props.label} />}
          error={props.error}
          disabled={props?.disabled}
        >
          <MenuItem value="" disabled>
            <span style={{ color: theme.palette.text.secondary }}>
              {props.placeholder}
            </span>
          </MenuItem>
          {props?.data?.map((el, key) => {
            if (el.id !== props.hideItem) {
              return (
                <MenuItem value={el.id} key={key}>
                  {el.name}
                </MenuItem>
              )
            }
            return null
          })}
        </Select>
        {props.helperText && (
          <FormHelperText style={{ color: theme.palette.error.main }}>
            {props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    </>
  )
}

export default SelectField
