import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span> //It will add a loading state spinner. (As in logout.js lodin will be callled true)
			)}
		</div>
	);
};
export default LogoutButton;


//Starter Code
// import { BiLogOut } from "react-icons/bi";

// const LogoutButton = () => {
	
// 	return (
// 		<div className='mt-auto'>
// 				<BiLogOut className='w-6 h-6 text-white cursor-pointer' />		
// 		</div>
// 	);
// };
// export default LogoutButton;