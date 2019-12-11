import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { requestForecast } from '../actions';
import Day from '../components/Day';

class Forecast extends Component {
  componentDidMount() {
    if (!this.props.forecast && this.props.geolocation) {
      this.props.dispatch(requestForecast(this.props.geolocation));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.forecast &&
      this.props.geolocation &&
      !prevProps.geolocation
    ) {
      this.props.dispatch(requestForecast(this.props.geolocation));
    }
  }

  render() {
    return (
      <div>
        <div className='h3 mb-5'>{this.props.cityName}</div>
        <div className='h4 row'>
          {this.props.forecast &&
            this.props.forecast.map(e => (
              <div className='col' key={e.date}>
                <Day
                  date={e.date.format('MM/DD')}
                  low={e.low}
                  high={e.high}
                  icon={e.icon}
                ></Day>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geolocation, forecast } = state.weather;
  let forecastList;

  if (forecast && forecast.list) {
    forecastList = forecast.list.reduce((result, current) => {
      const currentDate = moment(new Date(current.dt * 1000));
      const previous = result.find(e => e.date.isSame(currentDate, 'day'));

      if (previous) {
        if (current.main.temp < previous.low) {
          previous.low = Math.round(current.main.temp);
        }
        if (current.main.temp > previous.high) {
          previous.high = Math.round(current.main.temp);
        }
      } else if (currentDate.isAfter(moment(new Date()), 'day')) {
        result.push({
          date: currentDate,
          low: Math.round(current.main.temp),
          high: Math.round(current.main.temp),
          icon: current.weather[0].icon
        });
      }
      return result;
    }, []);
  }

  return {
    geolocation,
    cityName: forecast && forecast.city && forecast.city.name,
    forecast: forecastList
  };
};

export default connect(mapStateToProps)(Forecast);
