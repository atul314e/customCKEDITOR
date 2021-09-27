/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description example function to make api call
 */

import axios from 'axios';

export default async (): Promise<any> => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

	return response.data.results;
};
