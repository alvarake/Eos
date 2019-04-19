export const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		path
	};
};

export const setConfiguration = (configuration) => {
	return {
		 type: 'SET_CONFIGURATION',
			configuration
		};
  };
