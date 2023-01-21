import format from 'date-fns/format';

// import { Link } from 'src/store/types';

import './styles.scss';



function Snippet(props) {
  return (
    <div>
      <div className="rcw-snippet">
        <h5 className="rcw-snippet-title">{props.message.title}</h5>
        <div className="rcw-snippet-details">
          <a href={props.message.link} target={props.message.target} className="rcw-link">
            {props.message.link}
          </a>
        </div>
      </div>
      {props.showTimeStamp && <span className="rcw-timestamp">{format(props.message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Snippet;
