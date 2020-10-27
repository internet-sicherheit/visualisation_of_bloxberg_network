import React from 'react';
import './styles.css';

class ContractVisualisation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div id="input">
                    <input type="text" id="address" placeholder="Address..." /><input type="submit" id="button" value="Submit" />
                </div>
                );
    }
};

export default ContractVisualisation;