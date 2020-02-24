import React, { useState } from 'react';
import Api from 'api';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { StoreInterface } from 'interfaces';
import Notification from 'components/Notification';

import 'assets/styles/containers/AdditionForm.scss';

type contentElement = { wisdom: string; author: string };

const AdditionForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { wisdoms } = useSelector((s: StoreInterface) => s);

  const submitWisdom = (data: any) => {
    console.log(data);
    console.log(wForm);
    const transformedContent: contentElement[] = [];
    wForm.content.map((el, i) => {
      return transformedContent.push({
        wisdom: data[`wisdom-${i}`],
        author: data[`author-${i}`],
      });
    });
    let generateId: number = 0;
    if (wisdoms) {
      generateId = wisdoms[wisdoms.length - 1].id + 1;
    }

    const objectToSubmit = {
      id: generateId,
      image: data.image,
      content: transformedContent,
    };
    console.log('OUTPUT: submitWisdom -> objectToSubmit', objectToSubmit);

    setWForm(objectToSubmit);
    Api.uploadWisdom(objectToSubmit);
  };

  const addRow = () => {
    setWForm({
      ...wForm,
      content: [...wForm.content, { wisdom: '', author: '' }],
    });
  };

  const [wForm, setWForm] = useState({
    id: 0,
    image: '',
    content: [
      {
        wisdom: '',
        author: '',
      },
    ],
  });
  return (
    <div className="wisdom-form-wrapper">
      <Notification />
      {/* <p>bla</p> */}
      <form onSubmit={handleSubmit(submitWisdom)} className="addition-form">
        <input name="image" ref={register({ required: true })} placeholder="Wisdom Image" />
        {errors.image && <span>required</span>}
        {wForm.content.map((row, i) => {
          return (
            <div className="inputs-row" key={i}>
              <input
                name={`wisdom-${i}`}
                ref={register({ required: true })}
                className="input-wisdom"
                placeholder="Wisdom"
              />
              <input
                name={`author-${i}`}
                ref={register({ required: true })}
                className="input-author"
                placeholder="Author"
              />
            </div>
          );
        })}
        <button onClick={addRow} type="button" className="button add-row">
          Add new row
        </button>
        <button type="submit" className="button submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default AdditionForm;
