 import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {  //If token not present in the cookies it's means not logged in;
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify & decode the token with our secret in .env file;

		if (!decoded) { //Not decoded means invalid token provided;
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password"); //Extracting UserId from decodedToken and then removing password while storing it into user;

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user; //Attach the user object to req, so downstream handlers can use it
        //It carries users data forward;

		next(); 
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;