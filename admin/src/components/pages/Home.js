import React, { useContext, useEffect, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <h1 className='text-primary'>Bienvenido a tu panel de control</h1>
      <p>Nuestra aplicación te provee de una plataforma para conectar empleadores con potenciales empleados.</p>
    </Fragment>
  )
}

export default Home;