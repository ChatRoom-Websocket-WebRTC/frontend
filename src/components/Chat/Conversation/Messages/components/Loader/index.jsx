import cn from 'classnames';

import './styles.scss';



function Loader(props) {
  return (
    <div className={cn('loader', { active: props.typing })} dir="rtl">
      <div className="loader-container">
        <span className="loader-dots"></span>
        <span className="loader-dots"></span>
        <span className="loader-dots"></span>
      </div>
    </div>
  );
}

export default Loader;
