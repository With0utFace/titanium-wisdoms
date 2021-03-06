import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomLink from 'components/Link';

/* COMMENTED UNUSED ADDITION FORM, to add it, uncoment code and useDispatch to react-redux import */
// import { setFormModalOpen } from 'store/main/actions';

import { State } from 'interfaces';

import './styles.scss';

const Navigation = () => {
  const { addWisdomModalOpen } = useSelector((s: State) => s.main);
  // const dispatch = useDispatch();
  // const openAdditionForm = () => dispatch(setFormModalOpen(true));

  return (
    <div className="navigation-wrapper">
      <div className="navigation-overlay"></div>
      {!addWisdomModalOpen && (
        <div className="navigation-content">
          <Link to="/home" className="navigation-title">
            #titaniumwisdom
          </Link>

          <div className="navigation-controls">
            <CustomLink to="https://github.com/AlexanderC/nakla.fun/graphs/contributors" blank>
              Лица
            </CustomLink>
            {/* <div className="nav-link" onClick={openAdditionForm}>
              хочу добавить
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
