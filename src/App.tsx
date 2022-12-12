import './App.css';
// @ts-ignore
import {IconsManifest} from 'react-icons/lib/esm/iconsManifest';
import Header from './components/header';
import IconBrowser from './components/iconBrowser';
import {Toaster} from 'react-hot-toast';

function App() {

	return (
		<>
			<Toaster position='top-right' toastOptions={{
				success: {
					className: 'bg-green-700 text-white'
				}
			}}/>
			<div className={'flex flex-col h-screen w-screen justify-center m-auto px-24 pb-8'}>
				<Header />
				<IconBrowser />
			</div>
		</>
	);
}

export default App;
