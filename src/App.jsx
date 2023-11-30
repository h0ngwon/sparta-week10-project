import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reset.css';
import Router from 'shared/Router';

const App = () => {
	return (
		<>
			<Router />
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss={true}
				draggable={false}
				pauseOnHover={false}
				theme='colored'
			/>
		</>
	);
};

export default App;
