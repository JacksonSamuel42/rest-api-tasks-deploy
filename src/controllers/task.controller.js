import Task from '../models/Task';
import {getPagination} from '../libs/getPagination';

export const findAllTasks = async (req, res) => {
  try {
    const {size, page, title} = req.query;
    const condition = title ? {
      title: {$regex: new RegExp(title), $options: "s"}
    } : {}

    const {limit, offset} = getPagination(page, size);

    const data = await Task.paginate(condition, {offset, limit});
    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPage: data.totalPage,
      currentPage: data.page - 1
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'something goes wrong on list tasks',
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({message: 'title cannot be empty'});
  }

  try {
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false,
    };
    const taskSave = await new Task(newTask).save();
    res.json({
      message: 'Task created',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'something goes wrong the creating task',
    });
  }
};

export const findOneTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById({_id: id});
    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: 'something goes wrong on find task verify task id',
    });
  }
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndRemove({_id: id});
    res.json({
      message: 'Task deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'something goes wrong on delete task',
    });
  }
};

export const findAllDoneTasks = async (req, res) => {
  try {
    const task = await Task.find({done: true});
    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'something goes wrong on the list task complete',
    });
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.json({
      message: 'Task was updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'something goes wrong on update task',
    });
  }
};
