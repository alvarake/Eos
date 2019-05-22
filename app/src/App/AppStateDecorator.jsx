import {connect} from 'react-redux';
import {navigate} from '../actions/RouterActions';
import {unload_Media, load_Media} from '../actions/MusicActions';
import {set_alarm, notification_createToast} from '../actions/AlarmActions';


const mapStateToProps = (state) => {
	console.log(state)
	return {
		path: state.path,
		music: {
			configured: state.music.configured,
			sound: state.music.sound
		},
		settings: {
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
		onMusicSettings: (music) => {

			if (music.configured){
				dispatch(unload_Media(music.sound))
			} else {
				dispatch(load_Media(music))
			}
		},
		onAlarmSettings: (params) => {
			console.log("En mapDispatchtoProps Los params son:")
			console.log(params)
			dispatch(set_alarm(params.paramsAlert))
			dispatch(notification_createToast(params.paramsNotification))

		}}
	};

	const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

	export default AppStateDecorator;
	export {AppStateDecorator};