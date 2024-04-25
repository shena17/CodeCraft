const router = require('express').Router();
let Resource = require('../models/resource.model');

router.route('/').get((req, res) => {
    Resource.find()
    .then(resources => res.json(resources))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const resourceid = req.body.resourceid;
  const type = req.body.type;
  const attach = req.body.attach;
  const heading = req.body.heading;
  
  
  const newResource = new Resource({
    resourceid,
    type,
    attach,
    heading
    
  });

  newResource.save()
  .then(() => res.json('New Resource added to the system!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Resource.findById(req.params.id)
    .then(resource => res.json(resource))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Resource.findByIdAndDelete(req.params.id)
    .then(() => res.json('Resource deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Resource.findById(req.params.id)
    .then(resource => {
        resource.resourceid = req.body.resourceid;
        resource.type = req.body.type;
        resource.attach = req.body.attach;
        resource.heading = req.body.heading;

        resource.save()
        .then(() => res.json('Resource details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
