import React from 'react';
import unsplash from '../api/unsplash';
import wiki from '../api/wiki';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

class App extends React.Component {
  state = { images: [], result: "" };


  onSearchSubmit = async term => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });

    const data  =  await wiki.get("", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: term
      }
    });

    this.setState({ images: response.data.results});
    this.setState({ result: data.data.query.search[0].snippet });
  };

  render() {
    return (
      <div >  
        <div className="ui container" style={{ marginTop: '10px' }}>
          <SearchBar onSubmit={this.onSearchSubmit} />
          <div className="column grid">
          <div className="column"> 
            <div className="ui segment">
              <span dangerouslySetInnerHTML={{ __html: this.state.result }}></span>
            </div>    
            </div>
            <div className="column">     
              <ImageList images={this.state.images} />
            </div>
           
          </div>
          
        </div>
      </div>  
    );
  }
}

export default App;
