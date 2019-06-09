/* eslint-disable max-len */
import { connect } from 'react-redux';
import navigate from '../actions/RouterActions';
import { unloadMedia, loadMedia, setSong } from '../actions/MusicActions';
import { calculateDeviceTime, addPossibleAlarm, deleteOneAlarm } from '../actions/AlarmActions';
import { loadStopInfo, timeToArrive } from '../actions/BusActions';

const mapStateToProps = (state) => {
	console.log(state);
	return {
		path: state.path,
		music: {
			mediaid: state.music.mediaid,
			cancion: state.music.cancion,
		},
		alarm: {
			alarms: state.alarm.alarms,
			possibleAlarms: state.alarm.possibleAlarms,
		},
		bus: {
			accessToken: state.bus.accessToken,
			stopid: state.bus.stopid,
			arrivals: state.bus.arrivals,
			lastArrivalsRequest: state.bus.lastArrivalsRequest,
			lastStopRequest: state.bus.lastStopRequest,
			stopsInfo: state.bus.stopsInfo,
		},
	};
};

const mapDispatchToProps = dispatch => ({
	onNavigate: ({ path }) => (dispatch(navigate(path))),
	onMusicSettings: music => (music.mediaid ? dispatch(unloadMedia(music.mediaid)) : dispatch(loadMedia(music))),
	onMusicSelected: music => dispatch(setSong(music)),

	onAlarmSettings: possibleAlarm => dispatch(addPossibleAlarm(possibleAlarm)),
	onAlarmRequest: alarmConfig => dispatch(calculateDeviceTime(alarmConfig)),
	onAlarmDeleteRequest: alarmKey => dispatch(deleteOneAlarm(alarmKey)),

	onBusSettings: busConfig => (dispatch(loadStopInfo({ stopid: busConfig.newStopId, bus: busConfig.bus }))),
	onBusRequest: busConfig => (dispatch(timeToArrive(busConfig))),
});

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
