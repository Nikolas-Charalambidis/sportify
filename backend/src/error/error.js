const statusError = (status, message) => (req, res, next) => {
	res.status(status, message);
	res.json({error: status + ': ' + message});
};

export default statusError;