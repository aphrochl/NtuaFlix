const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};

describe('CLI Functional Tests', () => {
    it('searches titles that contain the search word', async () => {
        const titlePart = 'Hen Ho';
        nock(baseURL)
          .get(`/searchtitle?titlePart=${titlePart}`)
          .reply(200, 
            {
                "titleObjectList": [
                  {
                    "titleID": "tt0034841",
                    "type": "short",
                    "originalTitle": "Hen Hop",
                    "titlePoster": "https://image.tmdb.org/t/p/{width_variable}/88EH2TVg6fGK7SnGXcfQ05MD2Rk.jpg\r",
                    "startYear": 1994,
                    "endYear": 0,
                    "genres": [
                      {
                        "genreTitle": "Animation"
                      },
                      {
                        "genreTitle": "Short"
                      }
                    ],
                    "avRating": 6.3,
                    "nVotes": 282,
                    "titleAkas": [
                      {
                        "akaTitle": "Hen Hop",
                        "regionAbbrev": "CA"
                      }
                    ],
                    "principals": [
                      {
                        "nameID": "nm0572235",
                        "name": "Norman McLaren",
                        "category": "director"
                      }
                    ]
                  }
                ]
              }
            );
    
        const { stdout } = await runCli(`searchtitle --titlepart ${titlePart}`);
        expect(stdout).toContain('Hen Hop');
      });

});