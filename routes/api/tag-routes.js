const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    Tag.findAll({ include: [{ model: Product }] })
      .then((tag) => {
        res.status(200).json(tag);
      });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    Tag.findByPk(req.params.id, { include: [{ model: Product }] })
      .then((tagId) => {
        if (!tagId) {
          res.status(404).send('No tag found with the ID provided, try another one');
        };
        res.status(200).json(tagId);
      });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    Tag.create(req.body);
    res.status(200).send('Tag created succesfully!');
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.findByPk(req.params.id)
      .then((editedTag) => {
        if (!editedTag) {
          res.status(404).send('No tag found with the ID provided, try another one')
        };
        editedTag.update({ tag_name: req.body.tag_name });
        res.status(200).send('Tag edited succesfully!');
      });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({ where: { id: req.params.id } })
      .then((deletedTag) => {
        if (!deletedTag) {
          res.status(404).send('No tag found with the ID provided, try another one');
        };
        res.status(200).send('Tag deleted succesfully!');
      });
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
