import React, {CSSProperties, lazy, Suspense} from 'react';
import {IconContext, IconType} from 'react-icons';
import ReactIconsLogo from '../header/ReactIconsLogo';
import toast from 'react-hot-toast';

const importIcon = async (path: string): Promise<IconType> => {
	const [library, IconComponent] = path.split('/');
	const module = await import(`react-icons/${library.toLowerCase()}/index.esm.js`);
	return module[IconComponent];
};

const errorIcon = async () => {
	const errorIconPath = 'bi/BiError';
	return await importIcon(errorIconPath);
};

interface IProps {
	icons: string[],
	title: string | undefined,
	isLoading: boolean
}

const IconsView: React.FC<IProps> = ({icons, title, isLoading}) => {
	const defaultIcon = async (fallbackIcon?: string) => {
		if (!fallbackIcon) return errorIcon();

		try {
			return (await importIcon(fallbackIcon)) ?? (await errorIcon());
		} catch {
			return await errorIcon();
		}
	};

	const getIcon = (icon: string, className?: string, style?: CSSProperties) => {
		const Icon = lazy(async () => {
			try {
				return {default: (await importIcon(icon)) ?? (await defaultIcon())};
			} catch {
				return {default: await defaultIcon()};
			}
		});

		return (
			<Icon style={style} className={className}/>
		)
	}

	const onIconSelect = (icon: string) => {
		navigator.clipboard.writeText(icon).then(() => {
			toast.success(`${icon} was copied to clipboard`);
		});
	}

	const Loading = () => (
		<div className={'flex flex-col h-full justify-center content-center items-center'}>
			<ReactIconsLogo/> Loading...</div>
	);

	return (
		<div className={'flex flex-col h-full pt-5 pb-1 w-5/6 bg-gray-100 scroll-p-5'}>
			<span className={'pl-12 mb-3 underline text-2xl font-bold'}>{title}</span>
			{isLoading ? <Loading/> :
				<Suspense fallback={<Loading/>}>
				<div className={'overflow-y-auto pt-2 pb-3'}>
						<div className={'flex flex-row flex-wrap gap-4 justify-center items-center'}>
							<IconContext.Provider value={{className: 'h-1/3 w-1/3'}}>
								{icons.map((icon) => (
									<div key={icon} className={`flex flex-col w-28 h-28 text-white p-2 rounded shadow-md justify-evenly 
																	 bg-slate-600 shadow-gray-400 hover:shadow-gray-500 hover:w-30 hover:h-30 
																	 hover:m-n1 active:h-28 active:w-28 active:shadow-inner active:m-0`}
										onClick={() => onIconSelect(icon)}>
										<div className={'flex flex-col justify-center items-center w-full h-4/6'}>
											{getIcon(icon, 'h-1/3 w-1/3')}
										</div>
										<div className={`flex flex-col justify-center items-center h-1/6 w-full 
																			min-h-1/4 text-xxs break-all`}>
											{icon}
										</div>
									</div>
								))}
							</IconContext.Provider>
						</div>
				</div>
				</Suspense>
			}
		</div>
	);
};

export default IconsView;
