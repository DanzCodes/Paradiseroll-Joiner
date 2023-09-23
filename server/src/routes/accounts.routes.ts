import { Router } from "express";
import { active, add, desactive } from "../controllers/accounts.controller";

const router = Router();

router.post("/account", add);
router.post("/activeaccount", active);
router.post("/desactiveaccount", desactive);

export default router;
