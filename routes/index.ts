import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", (_req, res) => {
  res.json({ msg: "Hello World" });
});

export default router;
