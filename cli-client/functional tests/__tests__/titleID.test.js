const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};

// const runCli = async (command) => {
//     const cmd = `node cli.js ${command}`;
//     console.log("Executing command:", cmd); // Debug: print the command being executed
//     const { stdout, stderr } = await exec(cmd, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
//     console.log("stderr:", stderr); // Debug: print any stderr output
//     return stdout;
//   };

describe('CLI Functional Tests', () => {

  // Example for a fetch command test
  describe('CLI Fetch and Search Commands', () => {
    it('fetches details for a given title ID', async () => {
      const titleID = 'tt0000929';
      nock(baseURL)
        .get(`/title/${titleID}`)
        .reply(200, 
            {
                "titleObject": {
                  "titleID": "tt0000929",
                  "type": "short",
                  "originalTitle": "Klebolin klebt alles",
                  "titlePoster": "\\N\r",
                  "startYear": 1990,
                  "endYear": 0,
                  "genres": [
                    {
                      "genreTitle": "Comedy"
                    },
                    {
                      "genreTitle": "Short"
                    }
                  ],
                  "avRating": 5.3,
                  "nVotes": 46,
                  "titleAkas": [
                    {
                      "akaTitle": "Klebolin klebt alles",
                      "regionAbbrev": "DE"
                    }
                  ],
                  "principals": [
                    {
                      "nameID": "nm0066941",
                      "name": "Ernst Behmer",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0092290",
                      "name": "Curt Bois",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0093361",
                      "name": "Heinrich Bolten-Baeckers",
                      "category": "director"
                    },
                    {
                      "nameID": "nm0170183",
                      "name": "Victor Colani",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0667386",
                      "name": "Charles Paulus",
                      "category": "cinematographer"
                    },
                    {
                      "nameID": "nm1902148",
                      "name": "Alfred Duskes",
                      "category": "producer"
                    }
                  ]
                }
              }
            );

      const { stdout } = await runCli(`title --titleID ${titleID}`);
      expect(stdout).toContain(`Klebolin klebt alles`);
    });

    // Continue for titlefull, searchtitle, bygenre, name, searchname...
  });
});