import {validationResult} from 'express-validator';
import pool from '../config/db.js';

// Add a new School
export const addSchool = async (req,res)=>{
    const errors = validationResult(req);


    if(!errors.isEmpty()){
        return res.status(400).json({ok: false,
            errors: errors.array()});
    }

    const {name, address, latitude, longitude}= req.body;

    try {
        const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        const params = [name, address, Number(latitude), Number(longitude)];
        const [result] = await pool.execute(sql, params);

        res.status(201).json({
            ok: true,
            message: 'School added successfully',
            schoolID: result.inserted
        });
    } catch (error) {
        console.error(err);
       res.status(500).json({ok: false, error: 'Database error'});
        
    }
};

//List schools sorted by distance


export const listSchools = async (req, res) => {
  // Validate query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const lat = req.query.lat ? parseFloat(req.query.lat) : null;
  const lng = req.query.lng ? parseFloat(req.query.lng) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  if (lat === null || lng === null || isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({
      ok: false,
      error: "Latitude and Longitude are required and must be valid numbers",
    });
  }

  try {
    const sql = `
  SELECT
    id,
    name,
    address,
    latitude,
    longitude,
    (6371 * ACOS(
      COS(RADIANS(?)) *
      COS(RADIANS(latitude)) *
      COS(RADIANS(longitude) - RADIANS(?)) +
      SIN(RADIANS(?)) *
      SIN(RADIANS(latitude))
    )) AS distance_km
  FROM schools
  ORDER BY distance_km ASC
  LIMIT ${limit} OFFSET ${offset};
`;

const params = [lat, lng, lat]; // only 3 placeholders now
const [rows] = await pool.execute(sql, params);
    res.json({ ok: true, schools: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
};
export default {addSchool,listSchools};