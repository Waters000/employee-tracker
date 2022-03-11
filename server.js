const db = require('./db/connection')

const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

// Add near the top of the file
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Add after Express middleware
app.use('/api', apiRoutes);




// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
