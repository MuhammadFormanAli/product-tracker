import React from 'react';

const Footer = () => {
    return (
        <div className="shrink-0  bg-white border-t flex items-center px-6 py-4 text-sm text-gray-600 justify-center">
        © {new Date().getFullYear()} IT Asset Tracker , Developed By Forman
      </div>
    );
};

export default Footer;