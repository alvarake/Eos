import { connect } from 'react-redux';
import navigate from '../actions/RouterActions';
import { unloadMedia, loadMedia } from '../actions/MusicActions';
import { calculateDeviceTime } from '../actions/AlarmActions';
import { loadStopInfo } from '../actions/BusActions';

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
			accessToken: state.bus.accessToken,
			stopid: state.bus.stopid,
			arrivals: state.bus.arrivals,
		},
	};
};

// dispatch(loadStopInfo({ stopid: busConfig.newStopId, accessToken: busConfig.bus.accessToken }));

const mapDispatchToProps = dispatch => ({
	onNavigate: ({ path }) => (dispatch(navigate(path))),
	// eslint-disable-next-line max-len
	onMusicSettings: music => (music.mediaid ? dispatch(unloadMedia(music.mediaid)) : dispatch(loadMedia())),
	onAlarmSettings: alarmConfig => dispatch(calculateDeviceTime(alarmConfig)),
	onBusSettings: (busConfig) => {
		const newBusConfig = { stopid: busConfig.newStopId, accessToken: busConfig.bus.accessToken };
		dispatch(loadStopInfo(newBusConfig));
	},
});

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
