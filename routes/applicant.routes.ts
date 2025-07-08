import { Router } from "express";
import { createApplicant, deleteApplicant, getApplicant, getApplicants, updateApplicant } from "../controllers/applicant.controller";

const router = Router();

router.get("/", getApplicants)
router.post("/", createApplicant)
router.get("/:id", getApplicant)
router.put("/:id", updateApplicant)
router.delete("/:id", deleteApplicant)



export default router