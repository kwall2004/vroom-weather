import React from 'react';
import PropTypes from 'prop-types';

const Day = ({ date, low, high, icon }) => (
  <div className='d-flex flex-column justify-content-center align-items-center'>
    <div>{date}</div>
    <div className='d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div>{low}&nbsp;&deg;F</div>
        <div>{high}&nbsp;&deg;F</div>
      </div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt=''
        ></img>
      </div>
    </div>
  </div>
);

Day.propTypes = {
  date: PropTypes.string,
  low: PropTypes.number,
  high: PropTypes.number,
  icon: PropTypes.string
};

export default Day;
