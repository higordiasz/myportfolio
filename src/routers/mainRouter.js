import Express from 'express';
const mainRouter = Express.Router();

mainRouter.get('/', async (req, res, next) => {
  return res.render('index', {})
});

export {
  mainRouter
};