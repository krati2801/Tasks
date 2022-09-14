import mongoose, {ConnectOptions} from 'mongoose';
import envs from '../envs'

mongoose.connect(envs.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)

export default mongoose.connection