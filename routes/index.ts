import { Router } from "express";
import User from "../models/user";

const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
  User.create({
    email: "foo@example.com",
    password: "q1w2e3r4",
  }).then(user => res.json(user.toJSON()));
});

export default router;
