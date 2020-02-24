import axios from 'api/axios';
import { Base64 } from 'js-base64';

export const repository = '/repos/With0utFace/titanium-wisdoms';
export const contents = '/contents/';
export const wisdomsURL = 'src/dummy-data/wisdoms.json';

export const request = async (method: string = 'get', path: string, data?: object) => {
  const requestPath = `${repository}${contents}${path}`;
  switch (method) {
    case 'put':
      return await axios.put(requestPath, data);
    case 'delete':
      return await axios.delete(requestPath, data);
    default:
      return await axios.get(requestPath);
  }
};

export const getWisdoms = async () => {
  const result = await request('get', wisdomsURL);
  const decodedResult = JSON.parse(Base64.decode(result.data.content));
  return decodedResult;
};

export const genReqCredentials = (message: string, name: string, email: string) => {
  return {
    message: message,
    committer: {
      name: name,
      email: email,
    },
  };
};

// UNUSED FUNCTION => moved into 'store/notifications/actions'
// export const uploadData = (dataToUpload: any) => {
//   request('get', wisdomsURL).then(response => {
//     const decodedResponse = JSON.parse(Base64.decode(response.data.content));
//     request('put', wisdomsURL, {
//       ...genReqCredentials('adding data to wisdoms', 'test@test.com', 'test@test.com'),
//       content: Base64.encode(JSON.stringify([...decodedResponse, dataToUpload])),
//       // sha: response.data.sha,
//     })
//       .then(done => done.status)
//       .catch(err => err.response.status);
//   });
// };
