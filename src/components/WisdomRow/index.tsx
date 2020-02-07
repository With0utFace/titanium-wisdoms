import React, { FC } from 'react';
import { WisdomInterface } from 'interfaces';

type wisdomContent = { wisdom: string; author: string };

type Props = {
  current: WisdomInterface['content'];
};

const Row: FC<Props> = ({ current }) => {
  return (
    <>
      {current.map((elem: wisdomContent) => {
        const onlyOneWisdom = current.length <= 1;
        return (
          <div className={`wisdom-row ${onlyOneWisdom ? 'single' : ''}`} key={elem.wisdom}>
            <span>{elem.wisdom}</span> <p className="wisdom-author">{elem.author}</p>
          </div>
        );
      })}
    </>
  );
};

export default Row;
