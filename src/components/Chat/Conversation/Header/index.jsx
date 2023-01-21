import close from '../../assets/clear-button.svg';

import './style.scss';



function Header(props) {
  return (
    <div className="rcw-header">
      {props.showCloseButton &&
        <button className="rcw-close-button" onClick={props.toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <h4 className="rcw-title">
        {props.titleAvatar && <img src={props.titleAvatar} className="avatar" alt="profile" />}
        {props.title}
      </h4>
      <span>{props.subtitle}</span>
    </div>
  );
}

export default Header;
