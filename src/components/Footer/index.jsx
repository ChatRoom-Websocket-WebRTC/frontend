import React from 'react';
import { RiHeart3Line, RiCupLine, RiCopyrightLine } from 'react-icons/ri';
import './style.scss';

const Footer = () => {
  return (
    <div className="footer" data-testid="footer">
      <RiCopyrightLine /> ایرانگرد ۱۴۰۱، ساخته‌شده با <RiHeart3Line /> و <RiCupLine />
    </div>
  );
};

export default Footer;
