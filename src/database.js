import mongoose from 'mongoose';
import config from './config';

(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connection established');

  } catch (err) {
    console.log('there was internal error' + err);
  }
})();
