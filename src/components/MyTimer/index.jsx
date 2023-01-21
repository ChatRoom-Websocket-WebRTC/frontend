import React from 'react';
import {convertNumberToPersian} from '../../utils/helpers';
export default function MyTimer({ expire, resend, seconds }) {
  const [timer, setTimer] = React.useState(seconds);
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    if (resend === false) {
      setTimer(seconds);
      id.current = window.setInterval(() => {
        setTimer(time => time - 1);
      }, 1000);
      return () => clear();
    }
  }, [resend]);

  React.useEffect(() => {
    if (timer === 0) {
      expire(true);
      clear();
    }
  }, [timer]);

  return <span style={{ fontSize: '40px' }}>{convertNumberToPersian(timer)}</span>;
}
