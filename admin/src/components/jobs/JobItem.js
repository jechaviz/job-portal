import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import JobContext from '../../context/job/jobContext';

const JobItem = ({ job }) => {
  const jobContext = useContext(JobContext);
  const { deleteJob, setCurrent, clearCurrent } = jobContext;

  const { _id, title, job_description, image, category, city, email, phone, featured } = job;
  const onDelete = () => {
    deleteJob(_id);
    clearCurrent();
  };

  if (image) {
    var imagepath = 'uploads/' + image;
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
      </h3>
      <ul className='list'>
        {job_description && job_description.length > 100 ?
          (
            <li>
              <span><strong>Description: </strong></span>{`${job_description.substring(0, 100)}...`}
            </li>

          ) :
          <p>{job_description}</p>
        }
        {email && (
          <li>
            <i className='fas fa-envelope  mr-1'></i>{email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone mr-1' />{phone}
          </li>
        )}
        {category && (
          <li>
            {category.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-tag mr-1' />{object.title}
              </div>;
            })}
          </li>
        )}
        {city && (
          <li>
            {city.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-city mr-1' />{object.name}
              </div>;
            })}
          </li>
        )}
        {imagepath && (
          <img className='jobimg' src={imagepath} alt="not found" />
        )}
        <li>
          <span><strong>Featured: </strong>{featured ? 'Yes' : 'No'}</span>
        </li>

      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(job)}>Editar</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Eliminar</button>
      </p>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};
export default JobItem;