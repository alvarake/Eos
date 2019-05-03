import {connect} from 'react-redux';
import {navigate} from '../actions/RouterActions';
import {set_music_settings, set_alarm_settings} from '../actions/SettingsActions';

const mapStateToProps = (state) => {
	console.log(state)
	return {
		path: state.path,
		settings: {
			music : state.settings.music,
			alarm: state.settings.alarm
		}
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		onMusicSettings: ({settings}) => dispatch(set_music_settings(settings)),
		onAlarmSettings: ({settings}) => dispatch(set_alarm_settings(settings))
	}
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
