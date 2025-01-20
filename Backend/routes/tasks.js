const express = require('express');
const Task = require('../models/Tassks');
const router = express.Router();

router.get('/', (req, res) => {
  Task.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, status } = req.body;
  Task.create({ name, status }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, name, status });
  });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;
  Task.update(req.params.id, status, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated' });
  });
});

router.delete('/:id', (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;