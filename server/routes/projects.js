const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../db');

const router = express.Router();

module.exports = router;

router.post(
  '/create',
  express.json(),
  asyncHandler(async(req, res, next) => {

    // TODO, get two objects from req.body and set them to variables
    const { title, project_id } = req.body;

    db.tx(async (client) => {
      const {
        rows,
      } = await client.query(
        'INSERT INTO tasks (title) VALUES ($1) RETURNING mask_id(task_id) as masked_task_id, task_id',
        [title]
      );

      res.json({ id: rows[0].masked_task_id });
    }, next);
  })
)

// TODO demonstrate error handling
router.post(
  '/login',
  upload.none(),
  [body("email", "Invalid email format").isEmail()],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.mapped()));
    }

    res.json({});
  })
)