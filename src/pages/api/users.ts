import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

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
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  if (req.method === 'GET') {
    const allUsers = await collection.find().toArray();
    res.status(200).json(allUsers);
  } else if (req.method === 'POST') {
    const userReceived: IUser = { ...req.body };

    const findByEmail = { email: userReceived.email };
    const returnFindByEmail = await collection.findOne(findByEmail);
    console.log('***returnFindByEmail', returnFindByEmail);
    if (!returnFindByEmail) {
      await collection.insertOne(userReceived);
      console.log('***insertedOne');
      return res.status(201).json(userReceived);
    }
    console.log('***Email already registered');
    return res.status(200).json({});
  }
};
