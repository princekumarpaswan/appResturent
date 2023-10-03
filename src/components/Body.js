import RestaurantCard, { withOpenLabel } from './RestaurantCard';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
	// Local State Variable - Super powerful variable
	const [listOfRestaurants, setListOfRestraunt] = useState([]);
	const [filteredRestaurant, setFilteredRestaurant] = useState([]);

	const [searchText, setSearchText] = useState('');

	const RestaurantCardOpen = withOpenLabel(RestaurantCard);

	console.log(listOfRestaurants);

	// Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
	console.log('Body Rendered');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await fetch(
			'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING',
		);

		const json = await data.json();
		console.log(json);

		// Optional Chaining
		setListOfRestraunt(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
				?.restaurants || [],
		);
		setFilteredRestaurant(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
				?.restaurants || [],
		);
	};

	const onlineStatus = useOnlineStatus();

	if (onlineStatus === false)
		return <h1>Look like you are offline ! check your intrnet</h1>;

	return listOfRestaurants.length === 0 ? (
		<Shimmer />
	) : (
		<div className="body">
			<div className="filter flex">
				<div className="search p-4 m-4 ">
					<input
						type="text"
						className="search-box border border-solid border-black"
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>
					<button
						className="px-4 py-1 bg-green-200 m-4 rounded"
						onClick={() => {
							// Filter the restraunt cards and update the UI
							// searchText
							console.log(searchText);

							const filteredRestaurant = listOfRestaurants.filter((res) =>
								res.info.name.toLowerCase().includes(searchText.toLowerCase()),
							);

							setFilteredRestaurant(filteredRestaurant);
						}}
					>
						Search
					</button>
				</div>
				<div className="p-4 m-4 flex items-center">
					<button
						className="px-4 py-1 bg-green-200 rounded"
						onClick={() => {
							const filteredList = listOfRestaurants.filter(
								(res) => res.data.avgRating > 4,
							);
							setListOfRestraunt(filteredList);
						}}
					>
						Top Rated Restaurants
					</button>
				</div>
			</div>
			<div className="flex flex-wrap mx-auto">
				{filteredRestaurant.map((restaurant) => (
					<Link
						key={restaurant.info.id}
						to={'/restaurants/' + restaurant.info.id}
					>
						{restaurant.info.isOpen ? (
							<RestaurantCardOpen resData={restaurant} />
						) : (
							<RestaurantCard resData={restaurant} />
						)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Body;
