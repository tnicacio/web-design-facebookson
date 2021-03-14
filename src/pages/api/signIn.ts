import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

interface IUser {
  email: string;
  password: string;
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
  const userReceived: IUser = { ...req.body };

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const findByEmailAndPassword = {
    $and: [{ email: userReceived.email }, { password: userReceived.password }],
  };
  const returnFindByEmail = await collection.findOne(findByEmailAndPassword);
  console.log('***returnFindByEmail', returnFindByEmail);
  if (returnFindByEmail) {
    return res.status(200).json(returnFindByEmail);
  }
  return res.status(200).json({ message: 'Incorrect Email or Password' });
};
