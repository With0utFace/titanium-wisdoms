import axios from 'api/axios';

import { Base64 } from 'js-base64';

import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: 'a1e74bd75b551cb171ff7e7bba3f1b477a90f351',
});
console.log('OUTPUT: octokit', octokit);

octokit.repos.get({ owner: 'With0utFace', repo: 'titanium-wisdoms' }).then(data => {
  console.log(data);
});

class Api {
  repository = '/repos/With0utFace/titanium-wisdoms';
  contents = '/contents/';
  commits = '/commits';
  wisdomsURL = 'src/dummy-data/wisdoms.json';
  wisdomsCopyURL = 'src/dummy-data/wisdoms-copy.json';
  wisdoms = [];
  SHA = {};

  request = async (method: string = 'get', path: string, data?: object) => {
    const requestPath = `${this.repository}${this.contents}${path}`;
    switch (method) {
      case 'put':
        return await axios.put(requestPath, data);
      case 'delete':
        return await axios.delete(requestPath, data);
      default:
        return await axios.get(requestPath);
    }
  };

  getWisdoms = async () => {
    const result = await this.request('get', this.wisdomsURL);
    const decodedResult = JSON.parse(Base64.decode(result.data.content));
    this.wisdoms = decodedResult;
    return decodedResult;
  };

  genReqCredentials = (message: string, name: string, email: string) => {
    return {
      message: message,
      committer: {
        name: name,
        email: email,
      },
    };
  };

  copyWisdoms = () => {
    this.request('get', this.wisdomsURL).then(response => {
      this.request('put', this.wisdomsCopyURL, {
        ...this.genReqCredentials('making copy of wisdoms', 'test@test.com', 'test@test.com'),
        content: response.data.content,
      }).catch(err => {
        if (err.response.status === 409) {
          this.request('get', this.wisdomsCopyURL).then(copy => {
            this.request('put', this.wisdomsCopyURL, {
              ...this.genReqCredentials('making copy of wisdoms', 'test@test.com', 'test@test.com'),
              content: response.data.content,
              sha: copy.data.sha,
            });
          });
        }
      });
    });
  };

  updateWisdoms = (dataToUpload: object) => {
    this.request('get', this.wisdomsURL).then(response => {
      const decodedResponse = JSON.parse(Base64.decode(response.data.content));
      this.request('put', this.wisdomsURL, {
        ...this.genReqCredentials('adding data to wisdoms', 'test@test.com', 'test@test.com'),
        content: Base64.encode(JSON.stringify([...decodedResponse, dataToUpload])),
        sha: response.data.sha,
      });
    });
  };

  uploadWisdom = async (data: object) => {
    await this.copyWisdoms();
    return await this.updateWisdoms(data);
  };
}

export default new Api();
