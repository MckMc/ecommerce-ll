import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import sessionsRouter from './routes/sessions.router.js';
import initPassport from './auth/passport.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use((req, res, next) => { res.locals.path = req.path; next(); });

// Handlebars
app.engine('handlebars', handlebars.engine({
  helpers: {
    json: (ctx)=>JSON.stringify(ctx),
    startsWith: (s,p)=> typeof s==='string' && s.startsWith(p),
    eq: (a,b)=> a===b,
    encode: (v)=> encodeURIComponent(v ?? '')
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Auth
initPassport();
app.use(passport.initialize());

// Home
app.get('/', (req, res) => res.render('home', { title: 'Home' }));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);


export default app;
