import axios from 'axios';

export const getWisdoms = async () => {
  const result = await axios.get(
    'https://titanium-wisdom.s3-eu-west-1.amazonaws.com/wisdoms-original.json'
  );
  return result.data;
};
