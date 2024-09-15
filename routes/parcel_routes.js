import authenticateToken from "../middlewares/auth_middleware.js";
import {
  createParcel,
  getIndividualParcel,
  getParcels,
} from "../controllers/parcel_controller.js";
import express from "express";
const router = express.Router();

router.use(authenticateToken);
router.post("/createParcel", createParcel);
router.get("/", getParcels);
router.get("/:id", getIndividualParcel);

export default router;
