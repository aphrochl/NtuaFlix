 //what does this code do? Connecting to the server which listens 
//on the "https://localhost:9876/" and it connects to the database and 
//executes the endpoints 1-9, populating the db


const mysql = require('mysql2');
const express = require('express');
const https = require('https');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 
let converter = require('json-2-csv');
 
const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002'
};

const app = express();
app.use(express.json()); // Parse JSON requests

const port = 9876;
const baseURL = '/ntuaflix_api';
app.use(cors()); // Enable CORS for all routes

// Simulated database connection string
const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntuaflix'
};

app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  const frontendData = req.body;
  // Process the data on the server as needed
  console.log('Received data from front-end:', frontendData);

  // Send a response back to the front-end
  res.json({ message: 'Data received on the server!' });
});
const databaseConnectionString = JSON.stringify(databaseConfig);

const upload = multer();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/ntuaflix_api', (req, res) => {
  // Assuming you want to serve the index.html file
  res.sendFile(path.join(__dirname, 'public', 'index_homepage.html'));
});
// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Create a MySQL pool
const pool = mysql.createPool(databaseConfig);

// Function to reset data in each table
async function resetTable(tableName) {
  const query = `DELETE FROM ${tableName}`;
  await pool.promise().query(query);
}

// Define an endpoint handler for /admin/healthcheck
app.get(`${baseURL}/admin/healthcheck`, (req, res) => {
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  // Simulate the database connectivity check
  const connection = mysql.createConnection(databaseConfig);

  connection.connect((error) => {
    if (error) {
      // Build the response JSON object for failure
      const response = {
        status: 'failed',
        dataconnection: [databaseConnectionString]
      };
      if (format === 'json')
        res.status(404).json(response);
      else
        res.status(404).send(converter.json2csv(response));
    } else {
      // Build the response JSON object for success
      const response = {
        status: 'OK',
        dataconnection: [databaseConnectionString]
      };
      if (format === 'json')
        res.status(200).json(response);
      else
        res.status(200).send(converter.json2csv(response));

      // Close the database connection after the check
      connection.end();
    }
  });
});

// Define an endpoint handler for /admin/upload/titlebasics
app.post(`${baseURL}/admin/upload/titlebasics`, upload.single('truncated_title.basics'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  // Insert data into the 'titlebasics' table
  connection.query('INSERT INTO title_basics (title_id, title_type, title_primaryTitle, title_originalTitle, title_isAdult, title_startYear, title_endYear, title_runtimeMinutes, title_genre, title_posterURL) VALUES ? ON DUPLICATE KEY UPDATE title_id = VALUES(title_id), title_type = VALUES(title_type), title_primaryTitle = VALUES(title_primaryTitle), title_originalTitle = VALUES(title_originalTitle), title_isAdult = VALUES(title_isAdult), title_startYear = VALUES(title_startYear), title_endYear = VALUES(title_endYear), title_runtimeMinutes = VALUES(title_runtimeMinutes), title_genre = VALUES(title_genre), title_posterURL = VALUES(title_posterURL)', [rows], (error, results) => {    
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      if (format == 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded and inserted into the database successfully
      else
        res.status(200).send(converter.json2csv(response));
    }

    // Close the database connection after the insertion
    connection.end();
  });
});


// Define an endpoint handler for /admin/upload/titleakas
app.post(`${baseURL}/admin/upload/titleakas`, upload.single('truncated_title.akas'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  // Insert data into the 'titleakas' table
  connection.query('INSERT INTO title_AKAs (title_title_id, AKA_ordering, AKA_title, AKA_region, AKA_language, AKA_types, AKA_attributes, AKA_isOriginal) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), AKA_ordering = VALUES(AKA_ordering), AKA_title = VALUES(AKA_title), AKA_region = VALUES(AKA_region), AKA_language = VALUES(AKA_language), AKA_types = VALUES(AKA_types), AKA_attributes = VALUES(AKA_attributes), AKA_isOriginal = VALUES(AKA_isOriginal)', [rows], (error, results) => {    
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded and inserted into the database successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/namebasics
app.post(`${baseURL}/admin/upload/namebasics`, upload.single('truncated_name.basics'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}


  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  // Insert data into the 'principal' table
  connection.query(`
  INSERT INTO principal (
    principal_id,
    principal_name,
    principal_birthYr,
    principal_deathYr,
    principal_profession,
    titles_titles_id,
    principal_imageURL
  ) 
  VALUES ? 
  ON DUPLICATE KEY UPDATE 
    principal_id = VALUES(principal_id),
    principal_name = VALUES(principal_name),
    principal_birthYr = VALUES(principal_birthYr),
    principal_deathYr = VALUES(principal_deathYr),
    principal_profession = VALUES(principal_profession),
    titles_titles_id = VALUES(titles_titles_id),
    principal_imageURL = VALUES(principal_imageURL)
`, [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded and inserted into the database successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titlecrew
app.post(`${baseURL}/admin/upload/titlecrew`, upload.single('truncated_title.crew'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      res.status(400).json(response); // Bad Request: No file uploaded
    else
      res.status(400).send(converter.json2csv(response));
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  connection.query('SET FOREIGN_KEY_CHECKS=0;');
  
  connection.query('INSERT INTO title_crew (title_title_id, principal_directors_id, principal_writers_id) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), principal_directors_id = VALUES(principal_directors_id), principal_writers_id = VALUES(principal_writers_id)', [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      connection.query('SET FOREIGN_KEY_CHECKS=1;');
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      connection.query('SET FOREIGN_KEY_CHECKS=1;');
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleepisode
app.post(`${baseURL}/admin/upload/titleepisode`, upload.single('truncated_title.episode'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'json')
      res.status(400).json(response); // Bad Request: No file uploaded
    else
      res.status(400).send(converter.json2csv(response));
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));
  
  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  connection.query('SET FOREIGN_KEY_CHECKS=0;');
  connection.query('INSERT INTO title_episode (title_episode_id, title_series_id, title_season_NO, title_episode_NO) VALUES ? ON DUPLICATE KEY UPDATE title_episode_id = VALUES(title_episode_id), title_series_id = VALUES(title_series_id), title_season_NO = VALUES(title_season_NO), title_episode_NO = VALUES(title_episode_NO)', [rows], (error, results) => {    
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      connection.query('SET FOREIGN_KEY_CHECKS=1;');
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      connection.query('SET FOREIGN_KEY_CHECKS=1;');
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleprincipals
app.post(`${baseURL}/admin/upload/titleprincipals`, upload.single('truncated_title.principals'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'json')
      res.status(400).json(response); // Bad Request: No file uploaded
    else
      res.status(400).send(converter.json2csv(response));
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);
  
  connection.query('INSERT INTO title_principals (title_title_id, principal_ordering, principal_principal_id, principal_category, principal_job, principal_character, principal_poster) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), principal_ordering = VALUES(principal_ordering), principal_principal_id = VALUES(principal_principal_id), principal_category = VALUES(principal_category), principal_job = VALUES(principal_job), principal_character = VALUES(principal_character), principal_poster = VALUES(principal_poster)', [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleratings
app.post(`${baseURL}/admin/upload/titleratings`, upload.single('truncated_title.ratings'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'json')
      res.status(400).json(response); // Bad Request: No file uploaded
    else
      res.status(400).send(converter.json2csv(response));
  } //checks that it has a file in the body


  const filePath = fileData.path; 
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);
  
  connection.query('INSERT INTO title_ratings (title_title_id, rating_avg, rating_numVotes) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), rating_avg = VALUES(rating_avg), rating_numVotes = VALUES(rating_numVotes)', [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      if (format === 'json')
        res.status(500).json(response); // Internal Server Error: Database insertion failed
      else
        res.status(500).send(converter.json2csv(response));
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      if (format === 'json')
        res.status(200).json(response); // Success: Data uploaded successfully
      else
        res.status(200).send(converter.json2csv(response));
    }


    // Close the database connection after the insertion
    connection.end();
  });
});


// Define an endpoint handler for /title/:titleID
app.get(`${baseURL}/title/:titleID`, async (req, res) => {
  const titleID = req.params.titleID;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
      // Query to fetch data for the titleObject
      const titleQuery = `
          SELECT 
              tb.title_id AS titleID, 
              tb.title_type AS type, 
              tb.title_originalTitle AS originalTitle, 
              tb.title_posterURL AS titlePoster, 
              tb.title_startYear AS startYear, 
              tb.title_endYear AS endYear, 
              tb.title_genre AS genres,
              tr.rating_avg AS avRating,
              tr.rating_numVotes AS nVotes
          FROM title_basics tb
          LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
          WHERE tb.title_id = ?`;

      // Execute the query
      const [titleResult] = await connection.promise().query(titleQuery, [titleID]);

      if (!titleResult.length) {
        if (format === 'csv')
          return res.status(404).send(converter.json2csv({message: 'Title not found'}));
        return res.status(404).json({ message: 'Title not found' });
      }

      const titleObject = titleResult[0];

      // Fetch genres
      // Assuming the genres are stored in a comma-separated string
      titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));

      // Fetch titleAkas
      const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
      const [akasResult] = await connection.promise().query(akasQuery, [titleID]);
      titleObject.titleAkas = akasResult;

      // Fetch principals
      const principalsQuery = `
          SELECT 
              np.principal_id AS nameID, 
              np.principal_name AS name, 
              tp.principal_category AS category
          FROM title_principals tp
          JOIN principal np ON tp.principal_principal_id = np.principal_id
          WHERE tp.title_title_id = ?`;
      const [principalsResult] = await connection.promise().query(principalsQuery, [titleID]);
      titleObject.principals = principalsResult;

      // Return the titleObject
      if (format === 'json')
        res.status(200).json({ titleObject });
      else
        res.status(200).send(converter.json2csv({ titleObject }));
  } catch (error) {
      console.error('Database error:', error);
      if (format === 'json')
        res.status(500).json({ message: 'Internal server error', error: error.message });
      else
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
  } finally {
      // Close the database connection
      connection.end();
  }
});

app.get(`${baseURL}/title1/:titleID`, async (req, res) => {
  const titleID = req.params.titleID;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  
  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    // Query to fetch data for the titleObject
    const titleQuery = `
    SELECT 
    tb.title_id AS titleID, 
    tb.title_type AS type, 
    tb.title_originalTitle AS originalTitle, 
    tb.title_posterURL AS titlePoster, 
    tb.title_startYear AS startYear, 
    tb.title_endYear AS endYear, 
    tb.title_genre AS genres,
    tb.title_runtimeMinutes AS runtimeMinutes,  
    tr.rating_avg AS avRating,
    tr.rating_numVotes AS nVotes
  FROM title_basics tb
  LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
  WHERE tb.title_id = ?`;

    // Execute the query
    const [titleResult] = await connection.promise().query(titleQuery, [titleID]);

    if (!titleResult.length) {
      if (format === 'csv')
        return res.status(404).send(converter.json2csv({ message: 'Title not found' }))
      return res.status(404).json({ message: 'Title not found' });
    }

    const titleObject = titleResult[0];

    // Fetch genres
    // Assuming the genres are stored in a comma-separated string
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));

    // Fetch titleAkas
    const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleID]);
    titleObject.titleAkas = akasResult;

    // Fetch principals with principal_poster
    const principalsQuery = `
      SELECT 
        np.principal_id AS nameID, 
        np.principal_name AS name, 
        np.principal_imageURL AS principalPoster, -- Use the appropriate column
        tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      WHERE tp.title_title_id = ?`;

    const [principalsResult] = await connection.promise().query(principalsQuery, [titleID]);
    titleObject.principals = principalsResult;

    // Return the titleObject
    if (format === 'json')
      res.status(200).json({ titleObject });
    else
      res.status(200).send(converter.json2csv({ titleObject }));
  } catch (error) {
    if (format === 'json')
      res.status(500).json({ message: 'Internal server error', error: error.message });
    else
      res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
  } finally {
    // Close the database connection
    connection.end();
  }
});

//afro
// Define an endpoint handler for /searchtitle
app.get(`${baseURL}/searchtitle`, async (req, res) => {
  const titlePart = req.body.titlePart; // Extract titlePart from query parameters
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  if (!titlePart) {
    if(format === "json"){
      return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
    }
    else{
      res.status(400).send(converter.json2csv({status: 'failed', message: 'titlePart is required'}));
    }
  }

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT tb.title_id AS titleID, 
    tb.title_type AS type, 
    tb.title_originalTitle AS originalTitle, 
    tb.title_posterURL AS titlePoster, 
    tb.title_startYear AS startYear, 
    tb.title_endYear AS endYear, 
    tb.title_genre AS genres,
    tr.rating_avg AS avRating,
    tr.rating_numVotes AS nVotes
  FROM title_basics tb
  LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id 
  WHERE tb.title_originalTitle LIKE ?`;
  const likeTitlePart = `%${titlePart}%`; // SQL LIKE query format

  const [titleResult] = await connection.promise().query(query,likeTitlePart);
  var titleObjectList = [];
  for (var i = 0; i < titleResult.length; i++) {
    var titleObject = titleResult[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    const principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      INNER JOIN title_basics tb ON tp.title_title_id = tb.title_id
      WHERE tb.title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
  
  if(format === "json"){
    res.status(200).json({titleObjectList}); // Success: Data uploaded successfully
  }
  else{
    res.status(200).send(converter.json2csv({titleObjectList }));
  }
  }
  catch {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
   
  }
  finally {
    connection.end();
  }

});
app.post(`${baseURL}/searchtitle`, async (req, res) => {
  const titlePart = req.body.titlePart; // Extract titlePart from query parameters
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  if (!titlePart) {
    if(format === "json"){
      return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
    }
    else{
      res.status(400).send( {status: 'failed', message: 'titlePart is required'});
    }
  }

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT tb.title_id AS titleID, 
    tb.title_type AS type, 
    tb.title_originalTitle AS originalTitle, 
    tb.title_posterURL AS titlePoster, 
    tb.title_startYear AS startYear, 
    tb.title_endYear AS endYear, 
    tb.title_genre AS genres,
    tr.rating_avg AS avRating,
    tr.rating_numVotes AS nVotes
  FROM title_basics tb
  LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id 
  WHERE tb.title_originalTitle LIKE ?`;
  const likeTitlePart = `%${titlePart}%`; // SQL LIKE query format

  const [titleResult] = await connection.promise().query(query,likeTitlePart);
  var titleObjectList = [];
  for (var i = 0; i < titleResult.length; i++) {
    var titleObject = titleResult[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    const principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      INNER JOIN title_basics tb ON tp.title_title_id = tb.title_id
      WHERE tb.title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
  
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }
  }

  catch {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    else{
      res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
    }
  }
  finally {
    connection.end();
  }

});
app.get(`${baseURL}/bygenre`, async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.body;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  // Start building the query
  let query = `
      SELECT 
          tb.title_id AS titleID, 
          tb.title_type AS type, 
          tb.title_originalTitle AS originalTitle, 
          tb.title_posterURL AS titlePoster, 
          tb.title_startYear AS startYear, 
          tb.title_endYear AS endYear, 
          tb.title_genre AS genres,
          tr.rating_avg AS avRating
      FROM title_basics tb
      LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
      WHERE tb.title_genre LIKE ? AND tr.rating_avg >= ?
  `;

  const queryParams = [`%${qgenre}%`, minrating];

  // Add year range conditions if provided
  if (yrFrom) {
      query += ` AND tb.title_startYear >= ?`;
      queryParams.push(yrFrom);
  }
  if (yrTo) {
      query += ` AND tb.title_startYear <= ?`;
      queryParams.push(yrTo);
  }

  try {
      // Establish a connection to the database
      const connection = mysql.createConnection(databaseConfig);

      // Execute the query
      const [results] = await connection.promise().query(query, queryParams);
  var titleObjectList = [];
  for (var i = 0; i < results.length; i++) {
    var titleObject = results[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    let akasQuery = `SELECT 
      aka_title AS akaTitle,
      AKA_region AS regionAbbrev 
      FROM title_AKAs 
      WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    let principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      WHERE tp.title_title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }

    // Close the database connection
    connection.end();
  } catch (error) {
      console.error('Database error:', error);
      if(format === "json"){
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message}));
      }
  }
});



app.post(`${baseURL}/bygenre`, async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.body;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  

  // Start building the query
  let query = `
      SELECT 
          tb.title_id AS titleID, 
          tb.title_type AS type, 
          tb.title_originalTitle AS originalTitle, 
          tb.title_posterURL AS titlePoster, 
          tb.title_startYear AS startYear, 
          tb.title_endYear AS endYear, 
          tb.title_genre AS genres,
          tr.rating_avg AS avRating
      FROM title_basics tb
      LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
      WHERE tb.title_genre LIKE ? AND tr.rating_avg >= ?
  `;

  const queryParams = [`%${qgenre}%`, minrating];

  // Add year range conditions if provided
  if (yrFrom) {
      query += ` AND tb.title_startYear >= ?`;
      queryParams.push(yrFrom);
  }
  if (yrTo) {
      query += ` AND tb.title_startYear <= ?`;
      queryParams.push(yrTo);
  }

  try {
      // Establish a connection to the database
      const connection = mysql.createConnection(databaseConfig);

      // Execute the query
      const [results] = await connection.promise().query(query, queryParams);
  var titleObjectList = [];
  for (var i = 0; i < results.length; i++) {
    var titleObject = results[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    let akasQuery = `SELECT 
      aka_title AS akaTitle,
      AKA_region AS regionAbbrev 
      FROM title_AKAs 
      WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    let principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      WHERE tp.title_title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }

    // Close the database connection
    connection.end();
  } catch (error) {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        titleObjectList: []
      });
    }
    else{
      res.status(500).send(converter.json2csv({ 
        message: 'Internal server error',
        error: error.message,
        titleObjectList: []
      }));
    }
  }
});
//afro

app.get(`${baseURL}/name/:nameID`, async (req, res) => {
  const nameID = req.params.nameID;
  let format = req.query.format || 'json';
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
      // Query to fetch data for the nameObject
      const nameQuery = `
          SELECT 
              np.principal_id AS nameID, 
              np.principal_name AS name, 
              np.principal_imageURL AS namePoster, 
              np.principal_birthYr AS birthYr, 
              np.principal_deathYr AS deathYr, 
              np.principal_profession AS profession
          FROM principal np
          WHERE np.principal_id = ?`;

      // Execute the query for name details
      const [nameResult] = await connection.promise().query(nameQuery, [nameID]);

      if (!nameResult.length) {

        if(format === "json"){
          return res.status(404).json({ message: 'Name not found' });
           }
          
            else{
              return res.status(404).send(converter.json2csv({ message: 'Name not found' })) ;
            }
           
      }

      const nameObject = nameResult[0];

      // Fetch nameTitles
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameID]);
      nameObject.nameTitles = titlesResult;

      // Return the nameObject

      if(format === "json"){
        res.status(200).json({ nameObject });}
        else{
          res.status(200).send(converter.json2csv({ nameObject })) ;
        }
 
  } catch (error) {
      console.error('Database error:', error);

      if(format === "json"){
        res.status(500).json({ message: 'Internal server error', error: error.message });}
        else{
          res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
        }

       
  } finally {
      // Close the database connection
      connection.end();
  }
});

// Define an endpoint handler for /searchname
app.get(`${baseURL}/searchname`, async (req, res) => {
  const namePart = req.body.namePart; // Extract namePart from query parameters
  let format = req.query.format || 'json';
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
   

  if (!namePart) {
    if(format === "json"){
       
      return res.status(400).json({ status: 'failed', message: 'namePart is required' });}
      
        else{
          return res.status(400).send(converter.json2csv({ status: 'failed', message: 'namePart is required' })) ;
        }

     
  }

  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT 
    np.principal_id AS nameID, 
    np.principal_name AS name, 
    np.principal_imageURL AS namePoster, 
    np.principal_birthYr AS birthYr, 
    np.principal_deathYr AS deathYr, 
    np.principal_profession AS profession
    FROM principal np
    WHERE np.principal_name LIKE ?`;
    const likenamePart = `%${namePart}%`; // SQL LIKE query format

    const [nameResult] = await connection.promise().query(query, [likenamePart]);

    if (!nameResult.length) {
      if(format === "json"){
       
      return res.status(404).json({ message: 'No match found'});}
      
        else{
          return res.status(404).send(converter.json2csv({ message: 'No match found'})) ;
        }
    }

    var nameObjectList = [];
    for (var i = 0; i < nameResult.length; i++) {
      var nameObject = nameResult[i];
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameObject.nameID]);
      nameObject.nameTitles = titlesResult;
      nameObjectList.push(nameObject);
    }    

    if(format === "json"){
      res.status(200).json({ nameObjectList });}
      else{
        res.status(200).send(converter.json2csv({ nameObjectList })) ;
      }
   

  } catch (error) {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });}
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
    
  } finally {
    connection.end();
  }
  
});

app.post(`${baseURL}/searchname`, async (req, res) => {
  const namePart = req.body.namePart; // Extract namePart from query parameters
  let format = req.query.format || 'json';
  
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!namePart) {

    if(format === "json"){
       
      return res.status(400).json({ status: 'failed', message: 'namePart is required' });}
      
        else{
          return res.status(400).send(converter.json2csv({ status: 'failed', message: 'namePart is required' })) ;
        }
     
  }

  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT 
    np.principal_id AS nameID, 
    np.principal_name AS name, 
    np.principal_imageURL AS namePoster, 
    np.principal_birthYr AS birthYr, 
    np.principal_deathYr AS deathYr, 
    np.principal_profession AS profession
    FROM principal np
    WHERE np.principal_name LIKE ?`;
    const likenamePart = `%${namePart}%`; // SQL LIKE query format

    const [nameResult] = await connection.promise().query(query, [likenamePart]);

    if (!nameResult.length) {
      if(format === "json"){
       
        return res.status(404).json({ message: 'No match found'});}
        
          else{
            return res.status(404).send(converter.json2csv({ message: 'No match found'})) ;
          }
       
    }

    var nameObjectList = [];
    for (var i = 0; i < nameResult.length; i++) {
      var nameObject = nameResult[i];
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameObject.nameID]);
      nameObject.nameTitles = titlesResult;
      nameObjectList.push(nameObject);
    }    
 
    if(format === "json"){
      res.status(200).json({ nameObjectList });}
      else{
        res.status(200).send(converter.json2csv({ nameObjectList })) ;
      }
   
  } catch (error) {
    //console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });}
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
     
  } finally {
    connection.end();
  }
  
});

// Define an endpoint handler for /admin/resetall
app.post(`${baseURL}/admin/resetall`, async (req, res) => {
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  
  try {
    // Reset data in each table
    
    await resetTable('title_episode');
    await resetTable('title_crew');
    await resetTable('title_akas');
    await resetTable('title_principals');
    await resetTable('principal');
    await resetTable('title_ratings');
    await resetTable('title_basics');
    

    // For demonstration purposes, let's assume resetting is successful
    const response = {
      status: 'OK',
    };
    if(format === "json"){
    res.status(200).json(response);}
    else{
      res.status(200).send(converter.json2csv(response));
    }
  } catch (error) {
    // If an error occurs during the reset operation
    const response = {
      status: 'failed',
      reason: error.message, // Provide the specific reason for failure
    };
    if(format === "json"){
      res.status(500).json(response);}
      else{
        res.status(500).send(converter.json2csv(response));
      }
    
  }
});

const httpsServer = https.createServer({
  key: httpsOptions.key,
  cert: httpsOptions.cert,
  passphrase: httpsOptions.passphrase 
}, app);

httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});