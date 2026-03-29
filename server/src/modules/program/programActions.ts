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

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title, synopsis, poster, country, year, category_id } = req.body;

  if (title == null) {
    errors.push({ field: "title", message: "The field is required" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  if (synopsis == null) {
    errors.push({ field: "synopsis", message: "The field is required" });
  }

  if (poster == null) {
    errors.push({ field: "poster", message: "The field is required" });
  }

  if (country == null) {
    errors.push({ field: "country", message: "The field is required" });
  }

  if (year == null) {
    errors.push({ field: "year", message: "The field is required" });
  }

  if (category_id == null) {
    errors.push({ field: "category_id", message: "The field is required" });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

export default { browse, read, add, edit, destroy, validate };
