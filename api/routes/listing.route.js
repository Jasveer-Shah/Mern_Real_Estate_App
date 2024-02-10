import  express  from "express";
import { createlisting, deleteListing, updateListing, getListing, getListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/create', verifyToken, createlisting);
router.delete("/delete/:id", verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get("/get", getListings)       // not protected route/ Public route / everyone can see listings

export default router;