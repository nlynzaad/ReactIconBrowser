import React, {useState} from 'react'
import type {IconManifest} from 'react-icons/lib/esm/iconsManifest';
// @ts-ignore
import {IconsManifest} from 'react-icons/lib/esm/iconsManifest';
import {IconContext} from 'react-icons';
import {FcSearch} from 'react-icons/all';

interface IProps {
	library: IconManifest | undefined,
	setLibrary: (library: IconManifest | undefined) => void,
	startSearch: (searchTerm: string) => void,
	initialSearch: string | undefined
}

const libraryList: React.FC<IProps> = ({library, setLibrary, startSearch, initialSearch}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const onLibraryChange = (lib: IconManifest) => {
			setSearchTerm('');
			console.log('lib:', lib)
			setLibrary(lib);
	}

	const onSearch = (search: string) => {
		setLibrary(undefined);

		startSearch(search);
	}

	return (
		<div className={'flex flex-col h-full overflow-y-auto w-1/6 p-5 bg-slate-300'}>
			<div className={'flex flex-row w-fit'}>
				<input placeholder={'search'} className={'ring-1 p-1 w-85/100 mr-2'} value={searchTerm ?? initialSearch ?? ''}
				       onChange={(event) => setSearchTerm(event.target.value)} />
				<button className={`rounded bg-slate-500 shadow-md shadow-slate-400 p-1 hover:shadow-slate-500
				 active:shadow-slate-400`} onClick={() => onSearch(searchTerm)}>
					<IconContext.Provider value={{size: '2rem'}}>
						<FcSearch/>
					</IconContext.Provider>
				</button>
			</div>
			<ul>
				{IconsManifest.map((iconLib: IconManifest, index: number) => (
					<li key={index} onClick={() => onLibraryChange(iconLib)}
					    className={`px-2 py-2 my-2 text-left text-md rounded hover:shadow-gray-500 hover:ring-2
								${library?.id === iconLib.id
						    ? `font-bold ring-2 ring-rose-500 bg-slate-100 hover:cursor-default hover:bg-slate-100 
						       shadow-md shadow-slate-400`
						    : `hover:shadow-md hover:shadow-slate-400 hover:bg-slate-50 hover:cursor-pointer 
									 hover:text-bold hover:font-bold active:bg-slate-100 active:ring-blue-500 active:shadow-innerMd`
					    }`
					    }>
						{iconLib.name}
					</li>
				))}
			</ul>
		</div>
	)
};

export default libraryList
