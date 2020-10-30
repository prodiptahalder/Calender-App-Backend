const Note = require('../models/note');

exports.getNotebById = (req,res,next,id)=>{
    Note.findById(id).exec((err,note)=>{ //always db return 2 things err or note
        if(err || !note){
            return res.status(400).json({
                error: "No note was found in DB"
            });
        }

        req.note = note; //storing the note object in a object name note
        next();
    });
}

exports.createNote = (req,res) => {
    const note = new Note(req.body);
    note.save((err,note)=>{ //gives back two param, error and note
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save note in DB"
            });
        }
        res.json({
            title: note.title,
            content: note.content
        });
    });
}

exports.getNote = (req,res)=>{
    return res.json(req.note);
}

exports.getAllNotes = (req,res,next)=>{
    Note.find().exec((err,notes)=>{
        if(err || !notes)
        {
            return res.status(400).json({
                error: "No notes found."
            })
        }

        res.json(notes);
    })
}

exports.updateNote = (req,res)=>{
    Note.findByIdAndUpdate(
        {_id: req.note._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,note)=>{
            if(err || !note)
            {
                return res.status(400).json({
                    error:"Note Not authorised to update this note"
                })
            }
            res.json(note);
        }
    )
}

exports.removeNote = (req, res) => {
    const note = req.note;
  
    note.remove((err, note) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete note',
        });
      }
      res.json({
        message: note.title + ' note deleted',
      });
    });
  };