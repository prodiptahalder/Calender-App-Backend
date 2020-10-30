const express = require('express');
const router = express.Router();

const {createKeyword, getKeywordById, getKeyword, getAllKeywords, updateKeyword, removeKeyword} = require('../controllers/keyword');

//defining url/:id id as keywordId
router.param('keywordId', getKeywordById);

//to create keyword
router.post("/keyword/create",createKeyword);

//to check a keyword
router.get('/keyword/:keywordId',getKeyword);

//to get all keywords
router.get('/keywords', getAllKeywords);

//update keyword
router.put('/keyword/update/:keywordId', updateKeyword);

//delete keyword
router.delete('/keyword/delete/:keywordId', removeKeyword)

module.exports = router;