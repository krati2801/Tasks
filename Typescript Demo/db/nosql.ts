import path from 'path';
import dotenv from 'dotenv';
import mongoose, {ConnectOptions} from 'mongoose';

/* https://www.youtube.com/watch?v=JlM81PN9OP4 */

dotenv.config({
    path: path.resolve(__dirname, `../env/local.env`)
});

console.log(`environment set ${process.env.NODE_ENV}`);

const db_connection = () => {
    mongoose.connect(`${process.env.HOST}${process.env.DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions,
        (error : any) => {
            if (error) console.log(error);
            else console.log("db connection success");
        }
    )
}

export default {db_connection}