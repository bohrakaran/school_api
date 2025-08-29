import {body, query} from 'express-validator';

const validateAddSchool =[
    body('name').trim().notEmpty().withMessage('name is required'),

    body('address').trim().notEmpty().withMessage('address is required'),

    body('latitude').notEmpty().withMessage('latitude is required').isFloat({min: -90, max: 90}).withMessage('latitude must be valid'),

    body('longitude').notEmpty().withMessage('longitude is required').isFloat({min: -180, max: 180}).withMessage('longitude must be valid'),
];

const validateListSchools = [
    query('lat').notEmpty().withMessage('lat is required').isFloat({min:-90,max:90}).withMessage('lat mus be valid'),
    query('lng').notEmpty().withMessage('lng is required').isFloat({min:-180,max:180}).withMessage('lng mus be valid'),
    query('limit').optional().isInt({min: 1, max: 500}),
    query('offset').optional().isInt({min: 0})
];

export {validateAddSchool,validateListSchools};