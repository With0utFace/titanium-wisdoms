import React, { useState, useEffect } from 'react';
import { uploadWisdom } from 'store/main/actions';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'interfaces';
import Notification from 'components/Notification';

import { setFormModalOpen } from 'store/main/actions';

import './styles.scss';

type contentElement = { wisdom: string; author: string };

const AdditionForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { wisdoms, addWisdomModalOpen } = useSelector((s: State) => s.main);
  const { disableSubmit } = useSelector((s: State) => s.notifications);
  const dispatch = useDispatch();

  const formTemplate = {
    id: 0,
    verified: false,
    image: '',
    content: [
      {
        wisdom: '',
        author: '',
      },
    ],
  };

  const [wForm, setWForm] = useState(formTemplate);

  const [formStateClasses, setFormStateClasses] = useState('');
  useEffect(() => {
    if (addWisdomModalOpen) {
      setFormStateClasses('active');
    }
  }, [addWisdomModalOpen]);

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
      verified: false,
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
  const closeAdditionForm = () => {
    setFormStateClasses('closed');
    setTimeout(() => {
      dispatch(setFormModalOpen(false));
    }, 400);
  };

  const formBackgroundURL =
    'https://images.unsplash.com/photo-1571733916769-85cdd0893bdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80';

  return (
    <>
      <Notification />
      <div
        className={`wisdom-form-wrapper ${formStateClasses}`}
        style={{ backgroundImage: `url(${formBackgroundURL})` }}
      >
        <div className="close-form-wrapper">
          <div className="close-form" onClick={closeAdditionForm}></div>
        </div>
        <div className="wisdom-form-content">
          <div className="form-title">
            Привет чувак , тут ты можешь залить свою шутку. Она может быть из одной реплики или
            больше и добавь УРЛ картинки, постарайся по качественнее. Ну давай.
          </div>
          <form onSubmit={handleSubmit(submitWisdom)} className="addition-form" autoComplete="off">
            <div className="scroll-wrapper">
              <div className="form-inputs">
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
              </div>
            </div>
            <div className="wisdom-form-controls">
              <button onClick={addRow} type="button" className="button add-row">
                добавить реплику
              </button>
              <button
                type="submit"
                className={`button submit ${disableSubmit ? 'disabled' : ''}`}
                disabled={disableSubmit}
              >
                залить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdditionForm;
