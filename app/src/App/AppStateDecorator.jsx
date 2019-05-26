import {connect} from 'react-redux';
import {navigate} from '../actions/RouterActions';
import {unload_Media, load_Media} from '../actions/MusicActions';
import {calculateDeviceTime} from '../actions/AlarmActions';


const mapStateToProps = (state) => {
	console.log(state)
	return {
		path: state.path,
		music: {
			configured: state.music.configured,
			sound: state.music.sound
		},
		alarm: {
			configured: state.alarm.configured,
			alarmtime: state.alarm.time,
			alarmtimestamp: state.alarm.alarmtimestamp,
			notification: {
				alertId: state.alarm.notification.alertId,
				returnValue: state.alarm.notification.returnValue
			}
		}
	}
};
//AQUI SOLO DEBERIAN CREARSE ACCIONES
const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		onMusicSettings: (music) => (music.configured ? dispatch(unload_Media(music.sound)) : dispatch(load_Media(music))),
		onAlarmSettings: (alarmtime) =>dispatch(calculateDeviceTime(alarmtime))
	}
};

	const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

	export default AppStateDecorator;
	export {AppStateDecorator};