//get a random element from an array
export default randElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}
