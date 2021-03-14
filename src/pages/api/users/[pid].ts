import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';
import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const cliente = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbName = url.parse(uri).pathname.substr(1);
  const db = cliente.db(dbName);
  cachedDb = db;

  return db;
}

export default async (req: NowRequest, res: NowResponse) => {
  const { pid } = req.query;
  const userReceived: IUser = { ...req.body };

  console.log('*pid', pid);
  const userId = mongoose.Types.ObjectId(String(pid));
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const findById = { _id: userId };

  if (req.method === 'GET') {
    console.log('*userId', userId);
    const returnFindById = await collection.findOne(findById);
    console.log('***returnFindById GET', returnFindById);
    if (!returnFindById) {
      console.log('***User Not Found', userId);
      return res.status(404);
    }
    console.log('***User Found', returnFindById);
    return res.status(200).json({ returnFindById });
  } else if (req.method === 'PUT') {
    const update = {
      $set: {
        level: userReceived.level,
        currentExperience: userReceived.currentExperience,
        challengesCompleted: userReceived.challengesCompleted,
      },
    };
    const userUpdated = await collection.findOneAndUpdate(findById, update);
    if (!userUpdated) {
      return res.status(404);
    }
    return res.status(200).json(userUpdated);
  }
};
