import {connect} from 'react-redux';
import {navigate} from '../actions/RouterActions';
import {set_music_settings} from '../actions/SettingsActions';
import {alarm_set} from '../actions/AlarmActions';

const mapStateToProps = (state) => {
	console.log(state)
	return {
		path: state.path,
		settings: {
			music: state.settings.music,
			alarm: {
				time: state.settings.alarm.time,
				notification: {
					alertId: state.settings.alarm.notification.alertId,
					returnValue: state.settings.alarm.notification.returnValue
				}
			}
		}
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		onMusicSettings: ({settings}) => dispatch(set_music_settings(settings)),
		onAlarmSettings: ({params}) => {
			console.log("En mapDispatchtoProps Los params son:")
			console.log(params)
			dispatch(alarm_set(params))
	}}
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
