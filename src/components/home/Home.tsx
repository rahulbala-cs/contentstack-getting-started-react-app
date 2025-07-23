import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Button } from "@contentstack/venus-components";
import { useNavigate } from "react-router-dom";
import { getEditTags, onEntryChange } from "../../sdk/utils";
import { fetchHomePageData } from "../../api";

const Home: React.FC = () => {
  const homePageData = useSelector(
    (state: RootState) => state.main.homePageData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memoizedHomePageData = useMemo(() => homePageData, [homePageData]);

  // Subscribe to live updates
  useEffect(() => {
    onEntryChange(() => {
      fetchHomePageData(dispatch);
    });
  }, [dispatch]);

  const { home } = memoizedHomePageData.sections[0];

  const styleAlternateWords = (text: string) => {
    return text
      .split(" ")
      .map((char, index) =>
        index % 2 === 1 ? <span className="italic">{char}</span> : char
      )
      .reduce(
        (acc, curr) => (
          <>
            {acc} {curr}
          </>
        ),
        <></>
      );
  };

  return (
    <div className="home-page" {...getEditTags(memoizedHomePageData)}>
      {/* Ensure that the path passed to getEditTags matches the data structure */}
      <div className="hero-section" {...getEditTags(memoizedHomePageData, 'sections.0.home')}>
        {home.hero_section?.banner?.url && (
          <div className="hero-banner">
            <img 
              src={home.hero_section.banner.url} 
              alt="Hero Banner"
              {...getEditTags(memoizedHomePageData, 'sections.0.home.hero_section.banner')}
            />
          </div>
        )}
        <div className="hero-content">
          <h1 
            {...getEditTags(memoizedHomePageData, 'sections.0.home.hero_section.heading')}
          >
            {styleAlternateWords(home.hero_section?.heading || "")}
          </h1>
          <p 
            {...getEditTags(memoizedHomePageData, 'sections.0.home.hero_section.description')}
          >
            {home.hero_section?.description}
          </p>
          <Button
            size="large"
            className="cta-button"
            onClick={() => {
              navigate(home.hero_section?.primary_cta ?? "");
            }}
            {...getEditTags(memoizedHomePageData, 'sections.0.home.hero_section.primary_cta')}
          >
            View Our Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
