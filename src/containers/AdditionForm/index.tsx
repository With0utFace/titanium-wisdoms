import React, { useState } from 'react';
import { uploadWisdom } from 'store/main/actions';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'interfaces';
import Notification from 'components/Notification';

import 'assets/styles/containers/AdditionForm.scss';

type contentElement = { wisdom: string; author: string };

const AdditionForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { wisdoms } = useSelector((s: State) => s.main);
  const { disableSubmit } = useSelector((s: State) => s.notifications);
  const dispatch = useDispatch();

  const formTemplate = {
    id: 0,
    image: '',
    content: [
      {
        wisdom: '',
        author: '',
      },
    ],
  };

  const [wForm, setWForm] = useState(formTemplate);

  const submitWisdom = (data: any) => {
    const transformedContent: contentElement[] = [];
    wForm.content.map((_, i) => {
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

    setWForm(formTemplate);
    dispatch(uploadWisdom(objectToSubmit));
  };

  const addRow = () => {
    setWForm({
      ...wForm,
      content: [...wForm.content, { wisdom: '', author: '' }],
    });
  };

  return (
    <div className="wisdom-form-wrapper">
      <Notification />
      <div className="form-title">
        Привет чувак , тут ты можешь залить свою шутку. Она может быть из одной реплики или больше и
        добавь УРЛ картинки, постарайся по качественнее. Ну давай.
      </div>
      <form onSubmit={handleSubmit(submitWisdom)} className="addition-form">
        <input
          name="image"
          ref={register({ required: true })}
          placeholder="УРЛ картинки"
          className={`image-input ${errors.image ? 'error' : ''}`}
        />
        {wForm.content.map((_, i) => {
          return (
            <div className="inputs-row" key={i}>
              <input
                name={`wisdom-${i}`}
                ref={register({ required: true })}
                className={`input-wisdom ${errors[`wisdom-${i}`] ? 'error' : ''}`}
                placeholder={`Реплика ${i + 1}`}
              />
              <input
                name={`author-${i}`}
                ref={register()}
                className="input-author"
                placeholder="Имя"
              />
            </div>
          );
        })}
        <button onClick={addRow} type="button" className="button add-row">
          Add new row
        </button>
        <button
          type="submit"
          className={`button submit ${disableSubmit ? 'disabled' : ''}`}
          disabled={disableSubmit}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default AdditionForm;
