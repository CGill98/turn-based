import { createContext, useState } from 'react';

const PlayerContext = createContext();

function PlayerProvider({ children }) {
	const playerDefValue = {
		name: 'doopy',
		stats: {
			health: 100,
			endurance: 100,
			strength: 100,
			intelligence: 100,
		},
		pos: {
			x: 0,
			y: 0,
		},
	};
	const [state, setState] = useState(playerDefValue);

	function setPos(x, y) {
		setState(state => {
			return { ...state, pos: { x, y } };
		});
	}

	return (
		<PlayerContext.Provider value={{ state, setState, setPos }}>
			{children}
		</PlayerContext.Provider>
	);
}

export { PlayerProvider, PlayerContext };
