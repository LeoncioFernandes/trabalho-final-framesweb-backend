import { Router } from "express";
import MovieController from "../controllers/MovieController.js";

const router = Router();

router.get("/movies", MovieController.findAll);
router.get("/movies/:title", MovieController.findByTitle);
router.get("/movie/:id", MovieController.findOne);
router.post("/movie", MovieController.create);
router.put("/movie/:id", MovieController.update);
router.delete("/movie/:id", MovieController.delete);

export default router;