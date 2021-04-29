import React from 'react'

import {
  FormControlLabel,
  Checkbox as MaterialCheckbox
} from '@material-ui/core'

const Checkbox = (props) => (
  <>
    <FormControlLabel
      control={
        <MaterialCheckbox
          checked={props.checked}
          onChange={props.onChange}
          ref={props.ref}
          name={props.name}
          color={props.color}
        />
      }
      label={props.label}
    />
  </>
)

export default Checkbox
