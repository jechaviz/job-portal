import React, { useState, useContext, useEffect } from 'react';
import CityContext from '../../context/city/cityContext';

const CityForm = () => {
  const cityContext = useContext(CityContext);

  const { addCity, updateCity, clearCurrent, current } = cityContext;

  useEffect(() => {
    if (current !== null) {
      setcity(current);
    } else {
      setcity({
        name: '',
        country: ''
      });
    }
  }, [cityContext, current]);

  const [city, setcity] = useState({
    name: '',
    country: ''
  });

  const { name, country } = city;

  const onChange = e =>
    setcity({ ...city, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addCity(city);
    } else {
      updateCity(city);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Editar Ciudad' : 'Añadir Ciudad'}
      </h2>
      <input
        type='text'
        placeholder='Nombre'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='País'
        name='country'
        value={country}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Actualizar Ciudad' : 'Añadir Ciudad'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CityForm;