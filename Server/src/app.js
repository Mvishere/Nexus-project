import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.routes.js'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// routes import
import userRoutes from './routes/user.routes.js';

// routes
app.use("/api/p1/users/", userRoutes);

app.use('/api/p1/posts', postRouter)

export { app }
