import React from "react";
import html from "../../images/html.png";
import c from "../../images/c.svg";
import cpp from "../../images/c++.svg";
import csharp from "../../images/csharp.svg";
import java from "../../images/java.svg";
import php from "../../images/php.svg";
import python from "../../images/python.svg";
import html5 from "../../images/html5.png";
import css from "../../images/css.png";
import javascript from "../../images/javascript.png";
import defaultIcon from "../../images/default.png";
import react from "../../images/react.png";
import node from "../../images/node.png";
import typescript from "../../images/typescript.png";

export default function TutorialLogo(props) {
  const { tags } = props;

  const languageImages = {
    html: html,
    c: c,
    "c++": cpp,
    "c#": csharp,
    java: java,
    php: php,
    python: python,
    html5: html5,
    css: css,
    javascript: javascript,
    react: react,
    node: node,
    typescript: typescript,
    defaultIcon: defaultIcon,
  };

  const getImageForTag = (tag) => {
    const tagName = tag.tagname.toLowerCase();
    return languageImages[tagName] || null;
  };

  const getImageForTags = () => {
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        const image = getImageForTag(tag);
        if (image) {
          return image;
        }
      }
    } else if (typeof tags === "object" && tags !== null) {
      return getImageForTag(tags);
    }
    return defaultIcon;
  };

  return (
    <div>
      <img src={getImageForTags()} alt="Tutorial" className="tutLogo" />
    </div>
  );
}
