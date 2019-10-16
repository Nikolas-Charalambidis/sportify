import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
dotenv.config({path: '.env.local'});

const {PORT = 3001} = process.env;

const app = express();

const foos = [{id: 1, text: 'Foo 1'}, {id: 2, text: 'Foo 2'}];

app.get('/foo/:bar', (req, res, next) => {
	const {bar} = req.params;
	const foo = foos.find(item => Number(item.id) === Number(bar));

	if (!foo) {
		res.status(404);
		res.json({error: true, msg: 'No Foo for you!'});
		return;
	}
	res.send(foo.text);
});

app.use('/foo', (req, res, next) => {
	req.res.send('Foo');
});

app.use((req, res, next) => {
	res.status(404);
	res.json({error: '404: Not found'});
});

app.listen(PORT, () => {
	console.log(`Server started poky on http://localhost:${PORT}!`);
});
