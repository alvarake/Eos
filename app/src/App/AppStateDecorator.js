import { connect } from 'react-redux';
import navigate from '../actions/RouterActions';
import { unloadMedia, loadMedia } from '../actions/MusicActions';
import { calculateDeviceTime } from '../actions/AlarmActions';


const mapStateToProps = (state) => {
	console.log(state);
	return {
		path: state.path,
		music: {
			mediaid: state.music.mediaid,
		},
		alarm: {
			alarmtime: state.alarm.time,
			alarmtimestamp: state.alarm.alarmtimestamp,
		},
		bus: {
			stopid: state.bus.stopid,
		},
	};
};

const mapDispatchToProps = dispatch => ({
	onNavigate: ({ path }) => dispatch(navigate(path)),
	// eslint-disable-next-line max-len
	onMusicSettings: music => (music.mediaid ? dispatch(unloadMedia(music.mediaid)) : dispatch(loadMedia())),
	onAlarmSettings: alarmConfig => dispatch(calculateDeviceTime(alarmConfig)),
});

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
