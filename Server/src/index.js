import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
dotenv.config({
    path: '.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("Server failed to start ", error);
        process.exit(1);
    })