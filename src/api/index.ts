import axios from 'api/axios';

import { Base64 } from 'js-base64';

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

  updateWisdoms = (dataToUpload: object) => {
    this.request('get', this.wisdomsURL).then(response => {
      const decodedResponse = JSON.parse(Base64.decode(response.data.content));
      this.request('put', this.wisdomsURL, {
        ...this.genReqCredentials('adding data to wisdoms', 'test@test.com', 'test@test.com'),
        content: Base64.encode(JSON.stringify([...decodedResponse, dataToUpload])),
        sha: response.data.sha,
      })
        .then(done => {
          console.log('sent', done);
        })
        .catch(err => console.log('error', err));
    });
  };

  uploadWisdom = async (data: object) => {
    return await this.updateWisdoms(data);
  };
}

export default new Api();
