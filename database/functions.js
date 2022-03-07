export const lineThroughText = (index, todo) => {
	if (!todo.complete) {
		document.getElementById('input' + index).style =
			'text-decoration: line-through';
	} else {
		document.getElementById('input' + index).style = 'text-decoration: none';
	}
};
