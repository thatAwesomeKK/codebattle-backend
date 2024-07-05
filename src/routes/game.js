import { Router } from "express";
import matchInfoController from "../controller/game/matchInfoController.js";
import compileCodeController from "../controller/game/compileCodeController.js";
import submitCodeController from "../controller/game/submitCodeController.js";
const router = Router();

router.get("/match-info", matchInfoController);
router.post("/compile-answer", compileCodeController)
router.post("/submit-answer", submitCodeController)

export default router;
