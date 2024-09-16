import authenticateToken from "../middlewares/auth_middleware.js";
import {
  createParcel,
  getIndividualParcel,
  getParcels,
  getRecentParcels,
} from "../controllers/parcel_controller.js";
import express from "express";
const router = express.Router();

router.use(authenticateToken);
router.post("/createParcel", createParcel);
router.get("/all", getParcels);
router.get("/:id", getIndividualParcel);
router.get("/recent", getRecentParcels);

export default router;
