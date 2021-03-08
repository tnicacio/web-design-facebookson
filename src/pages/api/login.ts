import { NowRequest, NowResponse } from '@vercel/node';

//Mock Login
export default (req: NowRequest, res: NowResponse) => {
  res.status(200).json({ name: 'John Dow' });
};
