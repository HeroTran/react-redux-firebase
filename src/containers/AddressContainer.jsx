import * as React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Address from '../components/Address/Address';
import * as addressAction from '../actions/AddressAction';
import * as cx from 'classnames';
import configDatabase from '../database/config.js';






class AddressContainer extends React.Component {
    componentDidMount() {
        this.props.showAddress();
    }

   
    render() {
        const {address,csvData,Keys,addNewAddress,editAddress} = this.props;
        return (
          <div className="Address">
            <header className="Address-header">
              <h1 className="Address-title">List of Address in Vietnam</h1>
            </header>
           <div className="Address-content">
               <Address  address={address} Keys={Keys} csvData={csvData} addNewAddress={addNewAddress} editAddress={editAddress}/>
           </div>
          </div>
        );
      }
}


const mapStateToProps = (state) => {
   
    return {
        address: state.AddressReducer.address,
        csvData: state.AddressReducer.csvData,
        Keys: state.AddressReducer.Keys,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAddress: () => dispatch(addressAction.getAddress()),
        addNewAddress:(objectAdress) =>dispatch(addressAction.addToAddress(objectAdress)),
        editAddress:(objectAdress,key) =>dispatch(addressAction.editToAddress(objectAdress,key))
        
    }
}


const ConnectAddressContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressContainer)


export default ConnectAddressContainer;