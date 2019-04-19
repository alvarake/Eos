import {connect} from 'react-redux';

import {navigate} from '../actions';
import {setConfiguration} from '../actions';

const mapStateToProps = (state) => {
	return {
		path: state.path,
		configuration: state.configuration
	  }
};

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		onConfiguration: ({configuration}) => dispatch(setConfiguration(configuration))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
