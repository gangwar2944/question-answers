const fs = require('fs');

// Example: Reading a file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File contents:', data);
  }
});

// Example: Writing to a file
fs.writeFile('newfile.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File written successfully');
  }
});
