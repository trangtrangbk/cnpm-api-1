const News = require("../models/news");
const NEWS_STATUS = require("../utils/constant").NEWS_STATUS;


const getNewsByStatus = async (status) => {
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
  
    return await query;
  };


  const getNewsById = async id => {
    return await News.findById(id);
  };

  const insertNews = async newsData => {
    const news = new News(newsData);
    return await news.save();
  };

  module.exports = {
    
    getNewsByStatus,
    getNewsById,
    insertNews

  };