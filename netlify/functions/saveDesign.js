const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { designData, templateId } = JSON.parse(event.body);
  const client = new MongoClient(process.env.MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db('designs');
    await db.collection('designs').insertOne({
      templateId,
      designData,
      createdAt: new Date()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Design saved successfully' })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  } finally {
    await client.close();
  }
};