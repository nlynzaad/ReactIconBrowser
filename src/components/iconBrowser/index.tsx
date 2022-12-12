import React, {Suspense, useState} from 'react';
import type {IconManifest} from 'react-icons/lib/esm/iconsManifest';
// @ts-ignore
import {IconsManifest} from 'react-icons/lib/esm/iconsManifest';
import IconsView from './iconsView';
import LibraryList from './libraryList';
import ReactIconsLogo from '../header/ReactIconsLogo';

const IconBrowser = () => {
	const [library, setLibrary] = useState<IconManifest | undefined>(undefined);
	const [icons, setIcons] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

	const onLibraryChange = (library: IconsManifest) => {
		setLibrary(library);
		if (library) {
			setSearchTerm(undefined);
			setIsLoading(true);
			import(`react-icons/${library.id}/index.esm.js`).then((module) => {
				const icons: string[] = [];
				for (const icon in module) {
					icons.push(`${library.id}/${icon}`);
				}
				setIcons(icons);
				setIsLoading(false)
			});
		}
		setSearchTerm(undefined);
	}

	const onSearching = (search: string) => {
		setSearchTerm(search);
		setLibrary(undefined);
		setIsLoading(true);
		const foundIcons: string[] = []

		const modules = import.meta.glob('../../../node_modules/react-icons/*/index.esm.js');

		const promises = () => {
			const p = []
			for (const modulePath in modules) {
				const path = modulePath.split('/');
				const library = path[path.length - 2];

				p.push(import(`react-icons/${library}/index.esm.js`).then((module) => {
					for (const icon in module) {
						if (icon.toLowerCase().indexOf(search.toLowerCase()) > -1) {
							foundIcons.push(`${library}/${icon}`);
						}
					}
				}));
			}
			return p
		};
		Promise.all([...promises()]).then(() => {
			setIcons(foundIcons)

			setIsLoading(false);
		})
	}


	const Loading = () => (
		<div className={'flex flex-col h-full justify-center content-center items-center'}>
			<ReactIconsLogo/> Loading...</div>
	);

	return (
		<div className={'flex flex-row h-85/100 w-full border-2 border-slate-900'}>
			<LibraryList library={library} setLibrary={onLibraryChange} startSearch={onSearching} initialSearch={searchTerm}/>
			<Suspense fallback={<Loading/>}>
				<IconsView icons={icons} isLoading={isLoading}
				           title={library?.name ? library.name : searchTerm ? `Search Results for: ${searchTerm}` : ''}/>
			</Suspense>
		</div>
	);
};

export default IconBrowser;
