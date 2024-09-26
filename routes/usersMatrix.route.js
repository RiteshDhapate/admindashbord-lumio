import express from "express";
import { getTotalUsersController } from "../controllers/getTotalUsersController.js";
import { getPerWeekMessagesController } from "../controllers/getPerWeekMessagesController.js";
import { deleteUserController } from "../controllers/deleteUserController.js";
import { getAllUsersController } from "../controllers/getUsersController.js";
import { getTotalUsersAndMessagesController } from "../controllers/getTotalUsersAndMessagesController.js";
import { getCoachUsagePercentageController } from "../controllers/getCoachUsagePercentageController.js";
import { getDashboardDataController } from "../controllers/getDashboardDataController.js";
import { getFrontPageDataController } from "../controllers/getFrontPageDataController.js";
import { uploadFrontPageDataController } from "../controllers/uploadFrontPageDataController.js";
import { insertLandingpageController } from "../controllers/inertlandingpage.controller.js";
import { updateLandingPage } from "../controllers/updateLandingPage.controller.js";
import { getLandingPageController } from "../controllers/getLandingPage.controller.js";

const route = express.Router();

route.get("/total-users", getTotalUsersController);
route.get("/per-week-messages", getPerWeekMessagesController);
route.get("/delete-user/:id", deleteUserController);
route.get("/get-all-users", getAllUsersController);
route.get("/get-total-users-and-messages", getTotalUsersAndMessagesController);
route.get("/get-coach-uses", getCoachUsagePercentageController);
route.get("/get-dashboard-data", getDashboardDataController);
route.get("/get-front-page-data", getFrontPageDataController);
route.post("/upload-front-page-data", uploadFrontPageDataController);
route.post("/insert-landing-page", insertLandingpageController);
route.post("/update-landing-page", updateLandingPage);
route.get("/get-landing-page", getLandingPageController);
export default route;
