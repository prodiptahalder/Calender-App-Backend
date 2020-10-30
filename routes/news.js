const express = require('express');
const router = express.Router();

const {createNews, getNewsById, getNews, getAllNewss, updateNews, removeNews} = require('../controllers/news');

//defining url/:id id as newsId
router.param('newsId', getNewsById);

//to create news
router.post("/news/create",createNews);

//to check a news
router.get('/news/:newsId',getNews);

//to get all newss
router.get('/newss', getAllNewss);

//update news
router.put('/news/update/:newsId', updateNews);

//delete news
router.delete('/news/delete/:newsId', removeNews)

module.exports = router;