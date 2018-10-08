var connectMongoDB = require('./fun/connectMongoDB')


connectMongoDB.createDB();

connectMongoDB.createCollection('student');