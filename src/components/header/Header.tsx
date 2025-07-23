import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { TLink } from "../../types";
import { getEditTags, onEntryChange } from "../../sdk/utils";
import { fetchHeaderData } from "../../api";

const Header: React.FC = () => {
  const headerData = useSelector((state: RootState) => state.main.headerData);
  
  // FIXED: Access nested content from the full entry object
  const { logo, navigation_links } = headerData || {};
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Subscribe to live updates
  useEffect(() => {
    onEntryChange(() => {
      fetchHeaderData(dispatch);
    });
  }, [dispatch]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`header ${isOpen ? "open" : ""}`} {...getEditTags(headerData)}>
      <div className="logo-menu">
        <Link to="/" {...getEditTags(headerData, 'logo')}>
          <img src={logo?.url} alt="Logo" />
        </Link>
      </div>
      <nav className={`nav ${isOpen ? "active" : ""}`} {...getEditTags(headerData, 'navigation_links')}>
        {navigation_links?.link.map((link: TLink, index: number) => (
          <Link
            key={`key-${index}`}
            to={link.href}
            className={location.pathname === link.href ? "active" : ""}
            onClick={() => setIsOpen(false)}
            {...getEditTags(headerData, `navigation_links.link.${index}`)}
          >
            <span {...getEditTags(headerData, `navigation_links.link.${index}.title`)}>
              {link.title}
            </span>
          </Link>
        ))}
      </nav>
      <div className="menu-toggle" onClick={handleToggleMenu}>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
      </div>
    </div>
  );
};

export default Header;
