import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import { Navbar } from './modules/core';

const notify = () => toast.success('Inventory Genie');

const App = () => {
	return (
		<Router>
			<div>
				<Navbar />
				<button
					className="rounded-md bg-teal-200 p-4 m-4"
					onClick={notify}
				>
					Project Name?
				</button>
				<Toaster />
			</div>
		</Router>
	);
};

export default App;
