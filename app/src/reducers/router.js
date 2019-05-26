function path(state = '/welcome', action) {
	switch (action.type) {
	case 'NAVIGATE':
		return action.path;
	default:
		return state;
	}
}
export default path;
