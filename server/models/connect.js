const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/note_to_search', {
	useMongoClient: true,
});

mongoose.Promise = global.Promise;

// 关闭数据库
// module.exports = () => {
// 	mongoose.connection.close();
// };
