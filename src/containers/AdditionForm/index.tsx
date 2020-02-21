import React from 'react';

import Api from 'api';

const AdditionForm = () => {
  const testData = {
    id: 55,
    image: 'https://titanium-wisdom.s3-eu-west-1.amazonaws.com/images/Frame+63.png',
    content: [
      {
        wisdom: 'Я напишу либу которая тебе будет давать',
        author: 'Кучер',
      },
    ],
  };

  const submitWisdom = () => {
    Api.uploadWisdom(testData);
  };
  return <div onClick={submitWisdom}>test</div>;
};

export default AdditionForm;
