const express = require('express');
const app = express();
const path = require('path');

// Serve the public folder that contains the json file
app.use(express.static(path.join(__dirname, 'public')));

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});