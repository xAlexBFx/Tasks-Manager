import {Router} from 'express';
import { getTasks, getOneTask, createTask, deleteTask, updateTask } from '../controllers/tasks.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getOneTask);
router.post('/tasks',authRequired, validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

export default router;