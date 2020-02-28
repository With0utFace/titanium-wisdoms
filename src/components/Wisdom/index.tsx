import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner';
import Row from 'components/WisdomRow';
import { State } from 'interfaces';

import './styles.scss';

const EVENT = {
  prev: 'prev',
  next: 'next',
};

const Wisdom = () => {
  const [animations, setAnimations] = useState({
    start: false,
    inProgress: false,
    finished: false,
  });
  const [classes, setClasses] = useState('animation-end');
  const [eventDirection, setEventDirection] = useState('');
  const {
    wisdoms,
    wisdomsMap: { prev, current, next },
  } = useSelector((s: State) => s.main);
  const history = useHistory();

  useEffect(() => {
    document.onkeydown = (event: KeyboardEvent) => {
      if (event.keyCode === 37) {
        setEventDirection(EVENT.prev);
        setAnimations({ ...animations, start: true });
      }
      if (event.keyCode === 39) {
        setEventDirection(EVENT.next);
        setAnimations({ ...animations, start: true });
      }
    };
  });

  useEffect(() => {
    if (prev && current && next) {
      if (animations.start) {
        setClasses('animation-start');
        setTimeout(() => {
          setAnimations({ ...animations, start: false, inProgress: true });
        }, 400);
      }

      if (animations.inProgress) {
        switch (eventDirection) {
          case EVENT.next:
            history.push(`/wisdoms/${next.id.toString()}`);
            break;
          case EVENT.prev:
            history.push(`/wisdoms/${prev.id.toString()}`);
            break;
          default:
            break;
        }
        setAnimations({ ...animations, inProgress: false, finished: true });
      }

      if (animations.finished) {
        setClasses('animation-end');
        setAnimations({ ...animations, finished: false });
      }
    }
  }, [animations, history, wisdoms, next, current, prev, eventDirection]);

  const handleClick = () => {
    setEventDirection(EVENT.next);
    setAnimations({ ...animations, start: true });
  };

  if (current) {
    return (
      <div
        className={`wisdom ${classes}`}
        style={{
          backgroundImage: `url(${current.image})`,
        }}
      >
        <div className="wisdom-content">
          <div className="clickable-area" onClick={handleClick}>
            <div className="one-wisdom-wrapper">
              <Row current={current.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Spinner />;
};

export default Wisdom;
