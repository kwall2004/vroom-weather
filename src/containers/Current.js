import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestCurrent } from '../actions';

class Current extends Component {
  componentDidMount() {
    if (!this.props.temperature && this.props.geolocation) {
      this.props.dispatch(requestCurrent(this.props.geolocation));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.temperature &&
      this.props.geolocation &&
      !prevProps.geolocation
    ) {
      this.props.dispatch(requestCurrent(this.props.geolocation));
    }
  }

  render() {
    return (
      <div>
        <div className='h3 mb-4'>{this.props.cityName}</div>
        <div className='h4 d-flex justify-content-start align-items-center'>
          {this.props.temperature ? (
            <div>{this.props.temperature}&nbsp;&deg;F</div>
          ) : (
            <div></div>
          )}
          {this.props.icon ? (
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
                alt=''
              ></img>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geolocation, current } = state.weather;
  const cityName = current && current.name;
  const temperature = current && current.main && Math.round(current.main.temp);
  const icon = current && current.weather && current.weather[0].icon;

  return {
    geolocation,
    cityName,
    temperature,
    icon
  };
};

export default connect(mapStateToProps)(Current);
