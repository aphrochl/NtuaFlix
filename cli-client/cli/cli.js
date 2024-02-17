process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let converter = require('json-2-csv');
const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const FormData = require('form-data');
const https = require('https');


const baseURL = 'https://localhost:8765/energy/api';

const csvmaker = function (data) {

  // Array to store the values
  csvRows = [];

  // Keys:
  const headers = Object.keys(data);
  // Keys to csv format:
  csvRows.push(headers.join(','));

  // Values with comma seperation:
  const values = Object.values(data).join(',');
  // Values into array:
  csvRows.push(values);

  // Return the array joining with new line
  return csvRows.join('\n');
}


yargs
  .command({
    command: 'resetall',
    describe: 'Reset all data on the server',
    handler: async (argv) => {
      try {
        // Make the corresponding REST API call
        const response = await axios.post(`${baseURL}/admin/resetall`, {});

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'healthcheck',
    describe: 'Perform a health check on the server',
    handler: async (argv) => {
      try {
        // Make the corresponding REST API call for healthcheck
        const response = await axios.get(`${baseURL}/admin/healthcheck`);

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newtitles',
    describe: 'Upload titlebasics data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titlebasics data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;
  
        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.basics', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titlebasics
        const response = await axios.post(`${baseURL}/admin/upload/titlebasics`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });
  
        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newakas',
    describe: 'Upload titleakas data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleakas data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.akas', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleakas
        const response = await axios.post(`${baseURL}/admin/upload/titleakas`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newnames',
    describe: 'Upload namebasics data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing namebasics data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_name.basics', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for namebasics
        const response = await axios.post(`${baseURL}/admin/upload/namebasics`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newcrew',
    describe: 'Upload titlecrew data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titlecrew data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.crew', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titlecrew
        const response = await axios.post(`${baseURL}/admin/upload/titlecrew`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newepisode',
    describe: 'Upload titleepisode data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleepisode data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.episode', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleepisode
        const response = await axios.post(`${baseURL}/admin/upload/titleepisode`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newprincipals',
    describe: 'Upload titleprincipals data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleprincipals data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.principals', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleprincipals
        const response = await axios.post(`${baseURL}/admin/upload/titleprincipals`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'newratings',
    describe: 'Upload titleratings data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleratings data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.ratings', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleratings
        const response = await axios.post(`${baseURL}/admin/upload/titleratings`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(csvmaker(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'title',
    describe: 'Get details from title with the given ID',
    builder: (yargs) => {
      return yargs.option('titleID', {
        describe: 'Title ID',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      const titleID = argv.titleID;

      try {
        // Make the corresponding REST API call for titleID
        const response = await axios.get(`${baseURL}/title/${titleID}`);

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(converter.json2csv(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'searchtitle',
    describe: 'Get title that contains the search word',
    builder: (yargs) => {
      return yargs.option('titlepart', {
        describe: 'Keyword for title search',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      const titlePart = argv.titlepart;

      try {
        // Create the data object to be sent in the request body
        const data = JSON.stringify({
          titlePart: titlePart
        });
  
        // Set the options for the https.request
        const options = {
          hostname: 'localhost', // Replace with your API hostname
          port: 8765,            // Replace with your API port
          path: '/energy/api/searchtitle',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        };
  
        // Make the request using https.request
        const req = https.request(options, (res) => {
          let responseData = '';
  
          // A chunk of data has been received.
          res.on('data', (chunk) => {
            responseData += chunk;
          });
  
          // The whole response has been received.
          res.on('end', () => {
            // Output the response based on the specified format
            if (argv.format && argv.format.toLowerCase() === 'csv') {
              // Handle CSV format
              console.log(converter.json2csv(JSON.parse(responseData)));
            } else {
              // Default to JSON format
              console.log(JSON.stringify(JSON.parse(responseData), null, 2));
            }
          });
        });
  
        // Handle errors
        req.on('error', (error) => {
          console.error('Error:', error.message);
        });
  
        // Send the request body
        req.write(data);
  
        // End the request
        req.end();
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'bygenre',
    describe: 'Get titles that match given genre and minimum rating',
    builder: (yargs) => {
      return yargs.option(
        'genre', {
        describe: 'Genre for title search',
        type: 'string',
        demandOption: true,
      })
      .option(
      'min', {
      describe: 'Minimum rating for movie search',
      type: 'string',
      demandOption: true
      })
      .option(
        'from',{
        describe: 'Optional minimum airing year',
        type: 'int',
        demandOption: false
        })
      .option(
        'to', {
          describe: 'Optional maximum airing end year',
          type: 'int',
          demandOption: false
          }
      );
    },
    handler: async (argv) => {
      const qgenre = argv.genre;
      const minrating = argv.min;
      const yrFrom = argv.from;
      const yrTo = argv.to;

      try {
        // Create the data object to be sent in the request body
        const data = JSON.stringify({
          qgenre: qgenre,
          minrating: minrating,
          yrFrom: yrFrom,
          yrTo: yrTo
        });
  
        // Set the options for the https.request
        const options = {
          hostname: 'localhost', // Replace with your API hostname
          port: 8765,            // Replace with your API port
          path: '/energy/api/bygenre',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        };
  
        // Make the request using https.request
        const req = https.request(options, (res) => {
          let responseData = '';
  
          // A chunk of data has been received.
          res.on('data', (chunk) => {
            responseData += chunk;
          });
  
          // The whole response has been received.
          res.on('end', () => {
            // Output the response based on the specified format
            if (argv.format && argv.format.toLowerCase() === 'csv') {
              // Handle CSV format
              console.log(converter.json2csv(JSON.parse(responseData)));
            } else {
              // Default to JSON format
              console.log(JSON.stringify(JSON.parse(responseData), null, 2));
            }
          });
        });
  
        // Handle errors
        req.on('error', (error) => {
          console.error('Error:', error.message);
        });
  
        // Send the request body
        req.write(data);
  
        // End the request
        req.end();
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'name',
    describe: 'Get details for actor with the given ID',
    builder: (yargs) => {
      return yargs.option('nameid', {
        describe: 'name ID',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      const nameID = argv.nameid;

      try {
        // Make the corresponding REST API call for nameID
        const response = await axios.get(`${baseURL}/name/${nameID}`);

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log(converter.json2csv(response.data));
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'searchname',
    describe: 'Get name that contains the search word',
    builder: (yargs) => {
      return yargs.option('name', {
        describe: 'Keyword for name search',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      const namePart = argv.name;

      try {
        // Create the data object to be sent in the request body
        const data = JSON.stringify({
          namePart: namePart
        });
  
        // Set the options for the https.request
        const options = {
          hostname: 'localhost', // Replace with your API hostname
          port: 8765,            // Replace with your API port
          path: '/energy/api/searchname',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        };
  
        // Make the request using https.request
        const req = https.request(options, (res) => {
          let responseData = '';
  
          // A chunk of data has been received.
          res.on('data', (chunk) => {
            responseData += chunk;
          });
  
          // The whole response has been received.
          res.on('end', () => {
            // Output the response based on the specified format
            if (argv.format && argv.format.toLowerCase() === 'csv') {
              // Handle CSV format
              console.log(converter.json2csv(JSON.parse(responseData)));
            } else {
              // Default to JSON format
              console.log(JSON.stringify(JSON.parse(responseData), null, 2));
            }
          });
        });
  
        // Handle errors
        req.on('error', (error) => {
          console.error('Error:', error.message);
        });
  
        // Send the request body
        req.write(data);
  
        // End the request
        req.end();
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .option('format', {
    describe: 'Output format (json or csv)',
    type: 'string',
  })
  .parse();
