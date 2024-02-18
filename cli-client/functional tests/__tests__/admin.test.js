const nock = require('nock');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const baseURL = 'https://localhost:9876/ntuaflix_api';

// Helper function to run CLI commands
const runCli = async (command) => {
  return exec(`node cli.js ${command}`, { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' } });
};
  
// Adjusted helper function for file upload command tests
const testFileUploadCommand = async (command, endpoint, successMessage, filename) => {
    nock(baseURL)
      .post(endpoint)
      .reply(200, { status: 'success', message: successMessage });
  
    // Ensure filename is correctly included in the command
    const { stdout } = await runCli(`${command} --filename ${filename}`);
    expect(stdout).toContain(successMessage);
  };
  
  describe('CLI Functional Tests', () => {
    // describe('resetall command', () => {
    //     it('should reset all data on the server', async () => {
    //         nock(baseURL).post('/admin/resetall').reply(200, { status: 'OK' });
    //         const { stdout } = await runCli('resetall');
    //         expect(stdout).toContain('"status": "OK"');
    //     });
    // });

    describe('healthcheck command', () => {
        it('should perform a health check on the server', async () => {
            nock(baseURL).get('/admin/healthcheck').reply(200, { status: 'OK' });
            const { stdout } = await runCli('healthcheck');
            expect(stdout).toContain('"status": "OK"');
        });
    });

    describe('CLI Upload Commands', () => {
      it('uploads titlebasics data', async () => {
        await testFileUploadCommand(
          'newtitles',
          '/admin/upload/titlebasics',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.basics.tsv"' 
        );
      });
  
    it('uploads titleakas data', async () => {
        await testFileUploadCommand(
            'newakas',
            '/admin/upload/titleakas',
            'Data uploaded and inserted into the database successfully',
            '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.akas.tsv"'
        );
      });

      it('uploads namebasics data', async () => {
        await testFileUploadCommand(
          'newnames',
          '/admin/upload/namebasics',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_name.basics.tsv"'
        );
      });
    
      it('uploads titlecrew data', async () => {
        await testFileUploadCommand(
          'newcrew',
          '/admin/upload/titlecrew',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.crew.tsv"'
        );
      });
    
      it('uploads titleepisode data', async () => {
        await testFileUploadCommand(
          'newepisode',
          '/admin/upload/titleepisode',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.episode.tsv"'
        );
      });
    
      it('uploads titleprincipals data', async () => {
        await testFileUploadCommand(
          'newprincipals',
          '/admin/upload/titleprincipals',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.principals.tsv"'
        );
      });
    
      it('uploads titleratings data', async () => {
        await testFileUploadCommand(
          'newratings',
          '/admin/upload/titleratings',
          'Data uploaded and inserted into the database successfully',
          '"C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.ratings.tsv"'
        );
      });
    });    
  });