import { connect } from 'react-redux';
import { navigate } from '../actions/RouterActions';
import { unloadMedia, loadMedia } from '../actions/MusicActions';
import { calculateDeviceTime } from '../actions/AlarmActions';


const mapStateToProps = (state) => {
	console.log(state);
	return {
		path: state.path,
		music: {
			configured: state.music.configured,
			sound: state.music.sound,
		},
		alarm: {
			configured: state.alarm.configured,
			alarmtime: state.alarm.time,
			alarmtimestamp: state.alarm.alarmtimestamp,
			notification: {
				alertId: state.alarm.notification.alertId,
				returnValue: state.alarm.notification.returnValue,
			},
		},
	};
};

const mapDispatchToProps = dispatch => ({
	onNavigate: ({ path }) => dispatch(navigate(path)),
	// eslint-disable-next-line max-len
	onMusicSettings: music => (music.configured ? dispatch(unloadMedia(music.sound)) : dispatch(loadMedia())),
	onAlarmSettings: alarmtime => dispatch(calculateDeviceTime(alarmtime)),
});

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export { AppStateDecorator };
