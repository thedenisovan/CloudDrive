import { Router } from 'express';

const homePage = Router();

homePage.get('/', (req, res) => res.render('index'));

export default homePage;
