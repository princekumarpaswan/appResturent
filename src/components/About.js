import UserContext from '../utils/UserContext';
import User from './User';
import UserClass from './UserClass'; //class based component

const About = () => {
	return (
		<div>
			<h3>
				User Name from context :
				<UserContext.Consumer>
					{({ loggedInUser }) => loggedInUser}
				</UserContext.Consumer>
			</h3>
			<h1>About component </h1>
			<h2>This is about component from namste react </h2>
			{/* <User name={'Vidya Sagar mehar'} /> */}
			<UserClass name={'Vidya Sagar'} location={'Simdega'} />
		</div>
	);
};

export default About;
