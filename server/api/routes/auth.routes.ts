import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", getCurrentUser);

export default router;
