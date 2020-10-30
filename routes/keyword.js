const express = require('express');
const router = express.Router();

const {createKeyword, getKeywordbById, getKeyword, getAllKeywords, updateKeyword, removeKeyword} = require('../controllers/keyword');

//defining url/:id id as keywordId
router.param('keywordId', getKeywordbById);

//to create keyword
router.post("/keyword/create",createKeyword);

//to check keyword his profile he should be signed in as well as authenticated
router.get('/keyword/:keywordId',getKeyword);

//to get all keywords
router.get('/keywords', getAllKeywords);

//update keyword
router.put('/keyword/update/:keywordId', updateKeyword);

//delete keyword
router.delete('/keyword/delete/:keywordId', removeKeyword)

module.exports = router;