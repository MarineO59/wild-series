import programRepository from "./programRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const program = await programRepository
    .readAll()
    .then((programs) => programs.find((p) => p.id === parsedId));
  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

export default { browse, read };
