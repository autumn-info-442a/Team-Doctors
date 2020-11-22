import { render } from '@testing-library/react';
import React, {Component} from 'react';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.computeResults();
  }

  render() {
      const results = this.props.results;
      var showList = [];
      results.forEach(result => {
        showList.push(<p>{result.name}</p>);
      });
      return (
        this.props.results.length > 0 ?
        <div>
            <p>Here are the testing centers...{showList}</p>
        </div> : 
        <div><p>Loading...</p></div>
      );
  }
}

export default ResultsPage;