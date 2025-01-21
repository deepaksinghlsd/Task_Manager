const Task = require('../models/Tassks');
exports.GetAllTask= (req, res) => {
  Task.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.TaskCreate = (req, res) => {
  const { name, status } = req.body;
  Task.create({ name, status }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, name, status });
  });
};

exports.TaskUpdate = (req, res) => {
  const { status } = req.body;
  Task.update(req.params.id, status, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated' });
  });
};

exports.TaskDelete = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
};