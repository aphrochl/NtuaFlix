const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};

describe('CLI Functional Tests', () => {
    it('searches names that contain the search word', async () => {
        const name = 'Audrey';
        nock(baseURL)
          .get(`/searchname?name=${name}`)
          .reply(200, 
            {
                "nameObjectList": [
                  {
                    "nameID": "nm0000030",
                    "name": "Audrey Hepburn",
                    "namePoster": "https://image.tmdb.org/t/p/{width_variable}/nbkNJ8dr6j5vSZ3M6SKwp0F7Q1P.jpg\r",
                    "birthYr": 1929,
                    "deathYr": 1993,
                    "profession": "actress,soundtrack",
                    "nameTitles": [
                      {
                        "titleID": "tt0101915",
                        "category": "self"
                      }
                    ]
                  }
                ]
              }
            );
    
        const { stdout } = await runCli(`searchname --name ${name}`);
        expect(stdout).toContain("Audrey Hepburn");
      });

});