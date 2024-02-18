const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};

describe('CLI Functional Tests', () => {
    it('fetches full details for a given title ID with titlefull command', async () => {
        const titleID = 'tt0000929';
        nock(baseURL)
          .get(`/title1/${titleID}`)
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
                  "runtimeMinutes": 0,
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
                      "principalPoster": "\\N\r",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0092290",
                      "name": "Curt Bois",
                      "principalPoster": "https://image.tmdb.org/t/p/{width_variable}/4LeEAQ539JgoRcqX4Er0fGOwoZg.jpg\r",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0093361",
                      "name": "Heinrich Bolten-Baeckers",
                      "principalPoster": "\\N\r",
                      "category": "director"
                    },
                    {
                      "nameID": "nm0170183",
                      "name": "Victor Colani",
                      "principalPoster": "\\N\r",
                      "category": "actor"
                    },
                    {
                      "nameID": "nm0667386",
                      "name": "Charles Paulus",
                      "principalPoster": "\\N\r",
                      "category": "cinematographer"
                    },
                    {
                      "nameID": "nm1902148",
                      "name": "Alfred Duskes",
                      "principalPoster": "\\N\r",
                      "category": "producer"
                    }
                  ]
                }
              }
            );
    
        const { stdout } = await runCli(`titlefull --titleID ${titleID}`);
        expect(stdout).toContain('Klebolin klebt alles');
      });

});