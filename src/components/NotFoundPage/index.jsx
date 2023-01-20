import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import notfound from '../../assets/images/404.png';
import './style.scss';

const NotFoundPage = () => (
  <div className="notfound">
    <Helmet>
      <title>404، صفحه مورد نظر یافت نشد</title>
    </Helmet>
    <div className="notfound__tile notfound__tile-1"></div>
    <div className="notfound__tile notfound__tile-2"></div>
    <div className="notfound__tile notfound__tile-3"></div>
    <div className="notfound__tile notfound__tile-4"></div>
    <div className="notfound__container">
      <div className="notfound__container-body">
        <img className="notfound__img" src={notfound} alt="404 not found" />
        <div className="notfound__text">
          <div className="notfound__title">404</div>
          <div className="notfound__description">صفحه مورد نظر یافت نشد</div>
          <Link to="/">
            <button className="notfound__back-home-btn">بازگشت به خانه</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
