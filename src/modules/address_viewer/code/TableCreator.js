import React, { Component } from 'react';
import './styles.css';
import '../../../bootstrap.min.css';

class TableCreator extends Component {
    
    responseObject = null;

    constructor(props) {
        super(props);
        console.log("Consturctor:")
        console.log(props);
        this.responseObject = new DataFetcher();
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }
    
    componentDidUpdate() {

    }

    


  render() {

    return (
        <div className="TableCreator">
        </div>
    );
  }

}

export default TableCreator;