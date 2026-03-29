import programRepository from "./programRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const program = await programRepository.read(parsedId);
  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

const add: RequestHandler = async (req, res) => {
  const newProgram = req.body;
  const insertId = await programRepository.create(newProgram);
  res.status(201).json({ insertId });
};

const edit: RequestHandler = async (req, res) => {
  const program = {
    ...req.body,
    id: Number.parseInt(req.params.id),
  };
  await programRepository.update(program);
  res.sendStatus(204);
};

const destroy: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  await programRepository.delete(parsedId);
  res.sendStatus(204);
};

export default { browse, read, add, edit, destroy };
