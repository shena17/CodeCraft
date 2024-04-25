const router = require('express').Router();
let Forum = require('../models/forum.model');

router.route('/').get((req, res) => {
    Forum.find()
    .then(forums => res.json(forums))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const forumid = req.body.forumid;
  const subject = req.body.subject;
  const body = req.body.body;
  const tags = req.body.tags;
  
  
  const newForum = new Forum({
    forumid,
    subject,
    body,
    tags,
    
  });

  newForum.save()
  .then(() => res.json('New Forum added to the system!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => res.json(forum))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Forum.findByIdAndDelete(req.params.id)
    .then(() => res.json('Forum deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => {
        forum.forumid = req.body.forumid;
        forum.subject = req.body.subject;
        forum.body = req.body.body;
        forum.tags = req.body.tags;

        forum.save()
        .then(() => res.json('Forum details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
