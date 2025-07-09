import { Router } from "express";
import { createApplicant, deleteApplicant, getApplicant, getApplicants, updateApplicant } from "../controllers/applicant.controller";
import { authorize, protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, authorize("admin"), getApplicants)
router.post("/", createApplicant)
router.get("/:id", protect, authorize("employer"), getApplicant)
router.put("/:id", protect, authorize("applicant"), updateApplicant)
router.delete("/:id", protect, authorize("applicant"), deleteApplicant)



export default router