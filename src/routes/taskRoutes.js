import {Router} from 'express';
import * as taskController from '../controllers/task.controller'

const router = Router();

router.post('/', taskController.createTask);

router.get('/', taskController.findAllTasks);

router.get('/done', taskController.findAllDoneTasks);

router.get('/:id', taskController.findOneTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);


export default router;
