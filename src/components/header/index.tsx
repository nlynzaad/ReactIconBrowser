import React from 'react'
import ReactIconsLogo from './ReactIconsLogo';

const Header = () => {
	return (
		<div className={'h-15/100 flex flex-col justify-center items-center content-center'}>
			<div className={'flex flex-row justify-center items-center content-center'}>
				<ReactIconsLogo />
				<h1>React-Icons Browser</h1>
			</div>
			<div className={'text-sm'}>powered by <a href='https://react-icons.github.io/react-icons' >react-icons</a></div>
		</div>
	)
};

export default Header
