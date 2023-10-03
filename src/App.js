import React, { lazy, Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import Error from './components/Error';
import UserContext from './utils/UserContext';
// import Grocery from './components/Grocery';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
// LAZY loading - given to us by react,we can import it as a named import.
const Grocery = lazy(() => import('./components/Grocery'));

const AppLayout = () => {
	// Mock User Authentication
	const [userName, setUserName] = useState();

	useEffect(() => {
		// API Call
		const data = {
			name: 'Vidya Sagar',
		};

		setUserName(data.name);
	}, []);

	return (
		// Wrapping whole the app inside the UserContext so that the value will be accessible throughout the whole app. And it override the context data
		// If we want to provide the data to the specific part of the app only then we can exclude those component from the wrapping
		<Provider store={appStore} >
			<UserContext.Provider value={{ loggedInUser: userName }}>
				<div className="app">
					<Header />
					<Outlet />
				</div>
			</UserContext.Provider>
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Body />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},
			{
				path: '/restaurants/:resId',
				element: <RestaurantMenu />,
			},
			{
				path: '/grocery',
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<Grocery />
					</Suspense>
				),
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
