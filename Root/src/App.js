import React, { Component } from 'react';
import './App.css';
import  {ScoreBoard ,Image, Fraction,Loading}  from './components/image.js';
import axios from 'axios';

class App extends Component {

  state = {
    renderedImages : [],
    clickedImages : [],
    images: [],
    loading : true,
    score : 0,
    highscore : 0,
    imagesOnPage : 10,
    maximumImages : 20,
  }

  incrementProgress = () => {
    var a = this.state.numberOfImagesLoaded;
    a++;
    this.setState({numberOfImagesLoaded : a});
  }

  FYShuffle = (a) => {
    
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  
  }

  componentDidMount = () => {
    var images = [];
    var promises = [];
    var self = this;
    var maximumImages = this.state.maximumImages;
    var imagesOnPage = this.state.imagesOnPage;
    for (var i = 0; i < maximumImages; i++) {
      promises.push(axios({
        url: "https://dog.ceo/api/breeds/image/random",
        method: "GET"
      }));
    }

    axios.all(promises).then(function (results) {
      results.forEach(function (element) {
        images.push(element.data.message);
      });
      var renderedImages = [];
      for (var i = 0; i < imagesOnPage;i++){
         renderedImages.push(images.pop());
      }

      self.setState({
        renderedImages : renderedImages,
        images : images,
        loading : false
      });
    });
  }



  handler = (src) => {
    var images = this.state.images;
    var renderedImages = this.state.renderedImages.slice(0);
    var clickedImages = this.state.clickedImages;
    var score = this.state.score;
    var highscore = this.state.highscore;
    
    var currentIndex = renderedImages.indexOf(src);
    var currentImage = src;
    

    var index = Math.floor(Math.random() * images.length);
    var newImage = images.pop();

    images.push(currentImage);

    renderedImages[currentIndex] = (newImage);
    renderedImages = this.FYShuffle(renderedImages);
    

    if (clickedImages.includes(currentImage)){

      if (highscore < score) {
        highscore = score;
      }

      score = 0;
      clickedImages = [];


    } else {
      clickedImages.push(currentImage);
      score++;
    }


    this.setState({
      renderedImages : renderedImages,
      images : images,
      clickedImages : clickedImages,
      score : score,
      highscore : highscore
    });

  }

 

  render() {
    return (

      <div id="root">
        <div>
          COUNTER
          <ScoreBoard score = {this.state.score} highscore = {this.state.highscore}/>
        </div>

     

        <div>
          <Loading loading = {this.state.loading}/>
        </div>
        <div id="imageContainer" className="container">
          <div>

            {
           
              this.state.renderedImages.map( image => <Image handler = {this.handler} src = {image}/>)
            }
              
         
          </div>

        </div>
      </div>
    );
  }
}

export default App;
