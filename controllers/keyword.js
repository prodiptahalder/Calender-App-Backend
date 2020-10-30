const Keyword = require('../models/keyword');

exports.getKeywordById = (req,res,next,id)=>{
    Keyword.findById(id).exec((err,keyword)=>{ //always db return 2 things err or keyword
        if(err || !keyword){
            return res.status(400).json({
                error: "No keyword was found in DB"
            });
        }

        req.keyword = keyword; //storing the keyword object in a object name keyword
        next();
    });
}

exports.createKeyword = (req,res) => {
    const keyword = new Keyword(req.body);
    keyword.save((err,keyword)=>{ //gives back two param, error and keyword
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save keyword in DB"
            });
        }
        res.json({
            name:keyword.name
        });
    });
}

exports.getKeyword = (req,res)=>{
    return res.json(req.keyword);
}

exports.getAllKeywords = (req,res,next)=>{
    Keyword.find().exec((err,keywords)=>{
        if(err || !keywords)
        {
            return res.status(400).json({
                error: "No keywords found."
            })
        }

        res.json(keywords);
    })
}

exports.updateKeyword = (req,res)=>{
    Keyword.findByIdAndUpdate(
        {_id: req.keyword._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,keyword)=>{
            if(err || !keyword)
            {
                return res.status(400).json({
                    error:"Keyword Not authorised to update this keyword"
                })
            }
            res.json(keyword);
        }
    )
}

exports.removeKeyword = (req, res) => {
    const keyword = req.keyword;
  
    keyword.remove((err, keyword) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete keyword',
        });
      }
      res.json({
        message: keyword.name + ' keyword deleted',
      });
    });
  };