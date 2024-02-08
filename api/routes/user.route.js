import  express  from "express";
import { deleteuser, test, updateUser } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post('/update/:id', varifyToken, updateUser);
router.delete('/delete/:id', varifyToken, deleteuser);

export default router;