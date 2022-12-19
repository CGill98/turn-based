const MAX_ROWS = 10;
const MAX_COLS = 10;
const MIN_LEVEL_EXITS = 2;
const MAX_LEVEL_EXITS = 3;

//get cells directly connected, including walls
function getConnected(cell, zone) {
	const connected = [];
	const row = zone.find(row => row.find(c => c.id === cell.id));
	const cellX = row.findIndex(c => c.id === cell.id);
	const cellY = zone.findIndex(row => row.find(c => c.id === cell.id));
	if (0 < cellX) connected.push(zone[cellY][cellX - 1]);
	if (0 < cellY) connected.push(zone[cellY - 1][cellX]);
	if (cellX + 1 < row.length) connected.push(zone[cellY][cellX + 1]);
	if (cellY + 1 < zone.length) connected.push(zone[cellY + 1][cellX]);
	return connected;
}

//get the cells directly connected, neighbours but not walls
export function getConnectedRooms(cell, zone) {
	const connected = [];
	const row = zone.find(row => row.find(c => c.id === cell.id));
	const cellX = row.findIndex(c => c.id === cell.id);
	const cellY = zone.findIndex(row => row.find(c => c.id === cell.id));
	if (0 < cellX && zone[cellY][cellX - 1].type === 'ROOM')
		connected.push(zone[cellY][cellX - 1]);
	if (0 < cellY && zone[cellY - 1][cellX].type === 'ROOM')
		connected.push(zone[cellY - 1][cellX]);
	if (cellX + 1 < row.length && zone[cellY][cellX + 1].type === 'ROOM')
		connected.push(zone[cellY][cellX + 1]);
	if (cellY + 1 < zone.length && zone[cellY + 1][cellX].type === 'ROOM')
		connected.push(zone[cellY + 1][cellX]);
	return connected;
}

//get the walkable cells from the cell
function getWalkable(cell, zone) {
	let walkable = getConnectedRooms(cell, zone);
	let prevWalkableLength = -1;
	while (walkable.length !== prevWalkableLength) {
		prevWalkableLength = walkable.length;
		walkable.map(cell => {
			const connected = getConnectedRooms(cell, zone);
			walkable.push(
				...connected.filter(con => !walkable.find(c => c.id === con.id))
			);
		});
	}
	return walkable;
}

//are the cells indirectly connected
function isWalkable(cellA, cellB, zone) {
	return getWalkable(cellA, zone).find(cell => cell.id === cellB.id);
}

function isZoneComplete(path, zone) {
	for (let i = 0; i < path.length; i++) {
		for (let k = i + 1; k < path.length; k++) {
			if (!isWalkable(path[i], path[k], zone)) return false;
		}
	}
	return true;
}

function connectedToSquare(cell, zone) {
	const row = zone.find(row => row.find(c => c.id === cell.id));
	const cellX = row.findIndex(c => c.id === cell.id);
	const cellY = zone.findIndex(row => row.find(c => c.id === cell.id));

	if (0 < cellX && zone[cellY][cellX - 1].type === 'ROOM') {
		if (
			cellY < zone.length - 1 &&
			zone[cellY + 1][cellX].type === 'ROOM' &&
			zone[cellY + 1][cellX - 1].type === 'ROOM'
		) {
			return true;
		}

		if (
			0 < cellY &&
			zone[cellY - 1][cellX].type === 'ROOM' &&
			zone[cellY - 1][cellX - 1].type === 'ROOM'
		) {
			return true;
		}
	}

	if (cellX < row.length - 1 && zone[cellY][cellX + 1].type === 'ROOM') {
		if (
			cellY < zone.length - 1 &&
			zone[cellY + 1][cellX].type === 'ROOM' &&
			zone[cellY + 1][cellX + 1].type === 'ROOM'
		) {
			return true;
		}

		if (
			0 < cellY &&
			zone[cellY - 1][cellX].type === 'ROOM' &&
			zone[cellY - 1][cellX + 1].type === 'ROOM'
		) {
			return true;
		}
	}

	return false;
}

//Return one cell adjacent to a random cell within the path
//RULE: Cannot form squares
function appendPath(path, zone) {
	//pick random cell
	const randCell = path[Math.floor(Math.random() * path.length)];
	let connected = getConnected(randCell, zone);
	let newCell = connected[Math.floor(Math.random() * connected.length)];
	while (connectedToSquare(newCell, zone)) {
		connected = connected.filter(cell => cell.id !== newCell.id);

		if (connected.length === 0) return null;
		newCell = connected[Math.floor(Math.random() * connected.length)];
	}
	return newCell;
}

//RULE: all points of interest must be connected to each other by rooms
export default function generateZone() {
	const tempzone = [
		[
			{ type: 'ROOM', zoneExit: true },
			{ type: 'ROOM' },
			{ type: 'WALL' },
			{ type: 'WALL' },
		],
		[
			{ type: 'WALL' },
			{ type: 'ROOM' },
			{ type: 'ROOM', levelExit: true },
			{ type: 'ROOM' },
		],
		[
			{ type: 'WALL' },
			{ type: 'ROOM', levelExit: true, zoneExit: true },
			{ type: 'WALL' },
			{ type: 'ROOM', enemy: true },
		],
		[
			{ type: 'WALL' },
			{ type: 'WALL' },
			{ type: 'WALL' },
			{ type: 'ROOM' },
		],
	];

	const noRows = Math.floor(Math.random() * MAX_ROWS) + 1;
	const noCols = Math.floor(Math.random() * MAX_COLS) + 1;

	//create zone template
	let zone = [];
	for (let i = 0; i < noRows; i++) {
		zone.push([]);
		for (let j = 0; j < noCols; j++) {
			zone[i].push({
				id: i * noCols + j,
				type: 'WALL',
				levelExit: false,
				zoneExit: false,
				enemy: false,
			});
		}
	}

	//make points of interest
	let noLevelExits =
		Math.floor(Math.random() * MAX_LEVEL_EXITS) + MIN_LEVEL_EXITS;
	while (0 < noLevelExits) {
		zone = zone.map(row =>
			row.map(cell => {
				const levelExit = Math.random() < 0.2 && 0 < noLevelExits;
				if (levelExit) noLevelExits = noLevelExits - 1;
				return {
					...cell,
					levelExit,
					type: levelExit ? 'ROOM' : 'WALL',
				};
			})
		);
	}

	//make path
	let path = zone.flatMap(row => row).filter(cell => cell.type === 'ROOM');
	//make path walkable with random method

	while (!isZoneComplete(path, zone)) {
		const newCell = { ...appendPath(path, zone), type: 'ROOM' };
		zone = zone.map(row =>
			row.map(cell => (cell.id === newCell.id ? newCell : cell))
		);
		if (newCell) path.push(newCell);
		// console.log(path);
	}

	return zone;
}
