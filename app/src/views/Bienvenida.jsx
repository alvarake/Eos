import BodyText from '@enact/moonstone/BodyText';
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

	render: ({ title, onClick, ...rest }) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Configuración</Button>
			</Header>
			<Scroller>
				<BodyText>
		Hola, soy eOS tu asistente personal en la mañana. He venido para hacerte la vida más fácil.
				</BodyText>
				<BodyText>
		Primero vamos a configurar algunas cosas que me ayudarán a ayudarte.
				</BodyText>
				<BodyText>
		Recuerda:
		¡A quién madruga EOS ayuda!
				</BodyText>
			</Scroller>
		</Panel>
	),
});
export default Bienvenida;
