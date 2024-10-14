
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const db = await connectToDatabase();
  const collection = db.model('Data', new mongoose.Schema({ name: String }));

  switch (method) {
    case 'GET':
      const data = await collection.find({});
      res.status(200).json(data);
      break;
    case 'POST':
      const newData = await collection.create(req.body);
      res.status(201).json(newData);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
