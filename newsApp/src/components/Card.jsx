import React from "react";
import "../App.css";
const Card = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col bg-white p-2 rounded shadow">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2 truncate-2-lines">
        {article.title}
      </h2>
      <p className="text-gray-700 text-sm truncate-2-lines">
        {article.description}
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm mb-2"
      >
        Read more
      </a>
      <p className="text-gray-500 text-xs mb-2">
        Published on {formatDate(article.publishedAt)}
      </p>
    </div>
  );
};

export default Card;
