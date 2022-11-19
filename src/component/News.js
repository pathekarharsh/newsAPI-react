import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";

//import { throwNotImplemented } from "@maticnetwork/maticjs";

export class News extends Component {
  //in class based component you've state and setState no useState i think
  static defaultProps = {
    //see react documentation
    country: "in",
    pageSize: 14,
    category: "sports",
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    //whenever we are using constructor we've to use super
    super(props);
    console.log("hello im a constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - अखBAR`;
  }

  /*
  async updateNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b2cd78a8f5f4032a97ce3868363f06b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(); //type of default code to fetch api
    //console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  */

  async componentDidMount() {
    //this is using after output has been rendered
    //a async function wait to fetch url (basically it will wait for promise)
    //lifecycle method
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b2cd78a8f5f4032a97ce3868363f06b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(); //type of default code to fetch api
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    //this.updateNews();
  }

  handlePreviousClick = async () => {
    //console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=4b2cd78a8f5f4032a97ce3868363f06b&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(); //type of default code to fetch api
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
    /*
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
    */
  };

  handleNextClick = async () => {
    //console.log("next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=4b2cd78a8f5f4032a97ce3868363f06b&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json(); //type of default code to fetch api
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
    /*
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
    */
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          अखBAR - Top {this.capitalizeFirstLetter(this.props.category)} Events
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  source={element.source.name}
                  title={element.title} //title can be null or desc can be null so we can't slice it
                  description={element.description}
                  imageURL={element.urlToImage}
                  newsURL={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}

          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
