import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords, icon }) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* SEO Meta */}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Favicon */}
      {icon && <link rel="icon" type="image/png" href={icon} />}

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default Meta;
