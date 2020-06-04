const News = require("../models/news");
const NEWS_STATUS = require("../utils/constant").NEWS_STATUS;


const getNewsByStatus = async (status, page = 1, pageSize = 5) => {
    let query;
    switch (status) {
      case NEWS_STATUS.AVAILABLE:
        query = News.find({ status: NEWS_STATUS.AVAILABLE });
        break;
      case NEWS_STATUS.UNAVAILABLE:
        query = News.find({ status: NEWS_STATUS.UNAVAILABLE });
        break;
      case NEWS_STATUS.HIDE:
        query = News.find({ status: NEWS_STATUS.HIDE });
        break;
      default:
        query = News.find();
    }
  
    return await getPageNews(query, page, pageSize);
  };


  const getNewsById = async id => {
    return await News.findById(id);
  };

  const insertNews = async newsData => {
    const news = new News(newsData);
    return await news.save();
  };


  const getPageNews = async (query, page, pageSize) => {
  
    page = page > 0 ? page : 1;
    const totalPage = await getTotalPage(pageSize, query);
    const data = await query
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    return { page, pageSize, totalPage, data };
  };

  const getTotalPage = async (pageSize, query) => {
    const count = await News.countDocuments(query);
    return Math.ceil(count / pageSize);
  };
  
  


  module.exports = {
    
    getNewsByStatus,
    getNewsById,
    insertNews

  };