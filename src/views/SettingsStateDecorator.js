import {connect} from 'react-redux';

import {set_music_settings} from '../actions';
import {set_alarm_settings} from '../actions';

/*
import {set_route_settings} from '../actions';
import {set_weather_settings} from '../actions'; */

const mapStateToProps = (state) => {
	return {
		music : state.settings.music,
		alarm: state.settings.alarm
	  }
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSettings: ({settings}) => {
			dispatch(set_music_settings(settings.music))
			dispatch(set_alarm_settings(settings.alarm))
		}
	};
};

const SettingsStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default SettingsStateDecorator;
export {SettingsStateDecorator};
