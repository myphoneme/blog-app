const ArticleCard = ({ article }) => {
    return (
      <div className="border-b py-6">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <p className="text-gray-600 text-sm">{article.description}</p>
        <div className="text-gray-500 text-xs mt-2">{article.author} • {article.date}</div>
      </div>
    );
  };
  
  export default ArticleCard;
  