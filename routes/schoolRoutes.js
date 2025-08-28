import express from 'express';
const router = express.Router();

import schoolController from '../controllers/schoolController.js';
import {validateAddSchool, validateListSchools} from '../middleware/validation.js';

router.post('/addSchool', validateAddSchool, schoolController.addSchool);
router.get('/listSchools', validateListSchools, schoolController.listSchools);

export default router;