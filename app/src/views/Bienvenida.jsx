import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';


const Bienvenida = kind({
	name: 'Bienvenida',

	propTypes: {
		onClick: PropTypes.func,
		title: PropTypes.string,
	},

	render: ({ title, onClick, ...rest }) => {
		const h1Style = {
			fontSize: 94,
		};
		const eOS = {
			color: 'red',
		};

		return (
			<Panel {...rest}>
				<Header title={title}>
					<Button onClick={onClick}>Configuración</Button>
				</Header>
				<Scroller>
					<h1 style={h1Style}> Hola, soy <span style={eOS}>eOS</span>, tu asistente personal.</h1>
					<h1 style={h1Style}>Estoy aqui para hacerte la vida más <span style={eOS}>fácil</span>.</h1>
					<h1>Vamos a configurar algunas cosas que me ayudarán a ayudarte.</h1>
					<h1 style={h1Style}>Recuerda: ¡A quién madruga <span style={eOS}>eOS</span> ayuda!</h1>
				</Scroller>
			</Panel>
		);
	},
});
export default Bienvenida;
