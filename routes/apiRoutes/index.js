const router = require('express').Router();
let notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes)
      );
    res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes)
      );
    res.json(notes);
});

module.exports = router;
