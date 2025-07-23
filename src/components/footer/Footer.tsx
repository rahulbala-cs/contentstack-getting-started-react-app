import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { TLink } from "../../types";
import { getEditTags, onEntryChange } from "../../sdk/utils";
import { fetchFooterData } from "../../api";

const Footer: React.FC = () => {
  const footerData = useSelector((state: RootState) => state.main.footerData);
  const { copyright, information_section, navigation_links } = footerData;
  const dispatch = useDispatch();

  // Subscribe to live updates
  useEffect(() => {
    onEntryChange(() => {
      fetchFooterData(dispatch);
    });
  }, [dispatch]);

  return (
    <div className="footer" {...getEditTags(footerData)}>
      <div className="footer-content">
        {navigation_links && (
          <div className="footer-link">
            <h1 {...getEditTags(footerData, 'navigation_links.title')}>
              {navigation_links?.title}
            </h1>
            <nav className="footer-nav">
              {navigation_links?.link?.map((link: TLink, index: number) => (
                <Link 
                  key={`key-${index}`} 
                  to={link.href}
                  {...getEditTags(footerData, `navigation_links.link.${index}`)}
                >
                  <span {...getEditTags(footerData, `navigation_links.link.${index}.title`)}>
                    {link.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
        {information_section && (
          <div className="footer-info">
            <div className="logo" {...getEditTags(footerData, 'information_section.logo')}>
              <img src={information_section.logo?.url} alt="Footer Logo" />
            </div>
            <p {...getEditTags(footerData, 'information_section.descrption')}>
              {information_section.descrption}
            </p>
            <p {...getEditTags(footerData, 'information_section.timings')}>
              {information_section.timings}
            </p>
            <p {...getEditTags(footerData, 'information_section.holiday')}>
              {information_section.holiday}
            </p>
          </div>
        )}
      </div>
      <p className="copyright" {...getEditTags(footerData, 'copyright')}>
        {copyright}
      </p>
    </div>
  );
};

export default Footer;
