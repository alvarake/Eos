import React from 'react';
import {connect} from 'react-redux';
import {notification_createAlert} from '../actions/AlarmActions';

class AlarmClock extends React.Component {
 
  
  componentDidMount () {
		this.props.dispatch(notification_createAlert({
			category: 'picture',
			key: 'pictureMode',
			subscribe: true
		}));
	}
	render () {
		return <p>{this.props.pictureMode}</p>;
	}
}
  
 export default AlarmClock;