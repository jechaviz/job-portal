import React, { Fragment } from 'react'
import spinner from './spinner.gif';
export const Spinner = () =>
  <Fragment>
    <img src={spinner} alt="Cargando..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
  </Fragment>
