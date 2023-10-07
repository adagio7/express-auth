const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user record in the database
  const user = {
    username,
    email,
    password: hashedPassword
  };

  // Save the user record to the database (implementation depends on your chosen database library)

  // Send a success response
  res.status(201).json({ message: 'User registered successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
