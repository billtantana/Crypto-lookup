import express from "express";

import {
  getSnapshot,
  getWorldCoinIndex,
  getWorldCoinList,
} from "../controller/crypto-lookup-controller.js";

const router = express.Router();

router.get("/", getWorldCoinIndex);

router.get("/list", getWorldCoinList);

router.post("/", getSnapshot);

export default router;
