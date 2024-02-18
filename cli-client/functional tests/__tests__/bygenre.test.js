const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};

describe('CLI Functional Tests', () => {
    it('fetches titles that match a given genre and minimum rating', async () => {
        const genre = 'Comedy';
        const minrating = '8.5';
        const from = '1900';
        const to = '2000';
        nock(baseURL)
          .get(`/bygenre?genre=${genre}&minrating=${minrating}&from=${from}&to=${to}`)
          .reply(200, 
            {
                "titleObjectList": [
                  {
                    "titleID": "tt0099851",
                    "type": "tvEpisode",
                    "originalTitle": "Into the Woods",
                    "titlePoster": "https://image.tmdb.org/t/p/{width_variable}/uwMNWZg9gxCNCeruYvEdBN3Zhyb.jpg\r",
                    "startYear": 1991,
                    "endYear": 0,
                    "genres": [
                      {
                        "genreTitle": "Comedy"
                      },
                      {
                        "genreTitle": "Drama"
                      },
                      {
                        "genreTitle": "Romance"
                      }
                    ],
                    "avRating": 8.7,
                    "titleAkas": [
                      {
                        "akaTitle": "Into the Woods",
                        "regionAbbrev": "US"
                      }
                    ],
                    "principals": [
                      {
                        "nameID": "nm0001613",
                        "name": "Bernadette Peters",
                        "category": "actress"
                      },
                      {
                        "nameID": "nm0080259",
                        "name": "Girish Bhargava",
                        "category": "editor"
                      },
                      {
                        "nameID": "nm0291839",
                        "name": "Joy Franz",
                        "category": "actress"
                      },
                      {
                        "nameID": "nm0322306",
                        "name": "Joanna Gleason",
                        "category": "actress"
                      },
                      {
                        "nameID": "nm0389058",
                        "name": "Philip Hoffman",
                        "category": "actor"
                      },
                      {
                        "nameID": "nm0487567",
                        "name": "James Lapine",
                        "category": "director"
                      },
                      {
                        "nameID": "nm0528520",
                        "name": "Edmund Lyndeck",
                        "category": "actor"
                      },
                      {
                        "nameID": "nm0581034",
                        "name": "Iris Merlis",
                        "category": "producer"
                      },
                      {
                        "nameID": "nm0833151",
                        "name": "Tony Straiges",
                        "category": "production_designer"
                      },
                      {
                        "nameID": "nm0956268",
                        "name": "Chip Zien",
                        "category": "actor"
                      }
                    ]
                  }
                ]
              }
            );
    
        const { stdout } = await runCli(`bygenre --genre ${genre} --min ${minrating} --from ${from} --to ${to}`);
        expect(stdout).toContain('Into the Woods');
      });

});