import { Router } from "express";
import { createApplicant, deleteApplicant, getApplicant, getApplicants, updateApplicant } from "../controllers/applicant.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, getApplicants)
router.post("/", createApplicant)
router.get("/:id", protect, getApplicant)
router.put("/:id", protect, updateApplicant)
router.delete("/:id", protect, deleteApplicant)



export default router