const News = require('../models/news');

exports.getNewsById = (req,res,next,id)=>{
    News.findById(id).exec((err,news)=>{ //always db return 2 things err or news
        if(err || !news){
            return res.status(400).json({
                error: "No news was found in DB"
            });
        }

        req.news = news; //storing the news object in a object name news
        next();
    });
}

exports.createNews = (req,res) => {
    const news = new News(req.body);
    news.save((err,news)=>{ //gives back two param, error and news
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save news in DB"
            });
        }
        res.json({
            title:news.title,
            author: news.author,
            source: news.source,
            authorImage: news.authorImage,
            content: news.content
        });
    });
}

exports.getNews = (req,res)=>{
    return res.json(req.news);
}

exports.getAllNewss = (req,res,next)=>{
    News.find().exec((err,newss)=>{
        if(err || !newss)
        {
            return res.status(400).json({
                error: "No newss found."
            })
        }

        res.json(newss);
    })
}

exports.updateNews = (req,res)=>{
    News.findByIdAndUpdate(
        {_id: req.news._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,news)=>{
            if(err || !news)
            {
                return res.status(400).json({
                    error:"News Not authorised to update this news"
                })
            }
            res.json(news);
        }
    )
}

exports.removeNews = (req, res) => {
    const news = req.news;
  
    news.remove((err, news) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete news',
        });
      }
      res.json({
        message: news.title + ' news deleted',
      });
    });
  };