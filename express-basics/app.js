const path = require('path');
const express = require('express');

// Init app
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded());

// Endpoint -> render home page
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'views', 'index.html');
  // res.status(200).sendFile(indexPath);

  res.status(200).json({ status: 'success' });
});

// Endpoint /login GET -> render login page
app.get('/login', (req, res) => {
  const loginPath = path.join(__dirname, 'views', 'login.html');
  res.status(200).sendFile(loginPath);
});

// Endpoint /login POST -> get data from client
app.post('/login', (req, res) => {
  // Log the email and password from the client
  console.log(req.body);

  // { email, password }
  const { email: correo, password: clave } = req.body;
	console.log(correo, clave);

  // Compare the email with john@test.com and if password is pass1234
	// If success, send 200 status to client
	if (correo === 'john@test.com' && clave === 'pass1234') {
		console.log('access granted');
		return res.status(200).json({
			status: 'success', 
			data: {message: 'access granted'}
		});
		// return res.end();
	}
  // If the credentials are wrong, send 500 status to client
  res.status(500).json({
    status: 'failed',
    data: { status: 'access denied' },
  });
});

// Middleware

// Run server on post 4000
app.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});
