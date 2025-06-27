import express from "express";
import protectRoute from "../Middleware/protectRoute.js";
import { getUsersforSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUsersforSidebar);

export default router;