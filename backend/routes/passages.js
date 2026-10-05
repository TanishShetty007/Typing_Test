const express = require('express');
const router = express.Router();
const Passage = require('../models/Passage');

// GET /api/passages/random
router.get('/random', async (req, res) => {
    try {
        const { mode, difficulty, language } = req.query;
        let category;
        if (mode === 'words') category = 'general';
        else if (mode === 'quotes') category = 'quotes';
        else if (mode === 'code') category = 'code';

        const query = { category, difficulty };
        if (category === 'code' && language) {
            query.language = language;
        }

        // Get count to pick random
        let count = await Passage.countDocuments(query);

        // Fallback: ignore difficulty if none match
        if (count === 0) {
            delete query.difficulty;
            count = await Passage.countDocuments(query);
        }

        // Fallback: any category if still none match
        if (count === 0) {
            delete query.category;
            delete query.language;
            count = await Passage.countDocuments(query);
        }

        if (count === 0) {
            return res.status(404).json({ error: 'No passages found' });
        }

        const random = Math.floor(Math.random() * count);
        const passage = await Passage.findOne(query).skip(random);
        
        res.json(passage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
