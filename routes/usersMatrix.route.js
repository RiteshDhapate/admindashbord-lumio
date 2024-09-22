import express from "express";
import { getTotalUsersController } from "../controllers/getTotalUsersController.js";
import { getPerWeekMessagesController } from "../controllers/getPerWeekMessagesController.js";
import { deleteUserController } from "../controllers/deleteUserController.js";
import { getAllUsersController } from "../controllers/getUsersController.js";
import { getTotalUsersAndMessagesController } from "../controllers/getTotalUsersAndMessagesController.js";
import { getCoachUsagePercentageController } from "../controllers/getCoachUsagePercentageController.js";
import { getDashboardDataController } from "../controllers/getDashboardDataController.js";

const route = express.Router();

route.get("/total-users", getTotalUsersController);
route.get("/per-week-messages", getPerWeekMessagesController);
route.get("/delete-user/:id", deleteUserController);
route.get("/get-all-users", getAllUsersController);
route.get("/get-total-users-and-messages", getTotalUsersAndMessagesController);
route.get("/get-coach-uses", getCoachUsagePercentageController);
route.get("/get-dashboard-data", getDashboardDataController);
export default route;
