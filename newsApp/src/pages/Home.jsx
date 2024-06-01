import { useState, useEffect } from "react";
import Card from "../components/Card";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
  };

  const getFilteredAndSortedArticles = () => {
    let filteredArticles = articles;

    if (filterKeyword) {
      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(filterKeyword.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filteredArticles.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    } else {
      filteredArticles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    }

    return filteredArticles;
  };

  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }

  if (error) {
    return <p>Error loading news: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Top Headlines</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Filter by keyword"
            value={filterKeyword}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="mr-2 text-sm md:text-md">Sort by date:</label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 px-3 border rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getFilteredAndSortedArticles().map(
          (article, index) =>
            article.urlToImage && <Card article={article} key={index} />
        )}
      </div>
    </div>
  );
};

export default News;
