import * as types from './actionType';
import configDatabase from '../database/config.js';


export function getAddress() {
    return dispatch => {
      dispatch(getAddressRequest("waiting fecth for Address..."));
      return configDatabase.ref('/').once('value', snap => {
        const address = snap.val();
        dispatch(getAddressSuccess(address));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getAddressFailed("Failed fecth..."));
      });
    }
  }


export function getAddressSuccess(data) {
    return {
        type: types.FETCH_DATA_ADDRESS_SUCCESS,
        payload:{
            address:data
        }
    };
}

export function getAddressRequest(isRequest) {
    return {
        type: types.FETCH_DATA_ADDRESS_REQUEST,
        payload: isRequest
    };
}

export function getAddressFailed(isFailed) {
    return {
        type: types.FETCH_DATA_ADDRESS_FAILED,
        payload: isFailed
    };
}




/*add new */
export function addToAddress(objectAdress) {
  return dispatch => {
    dispatch(addToAddressRequested("Add Request..."));
    const newAddress = configDatabase.ref('/Address');
    newAddress.push({
        "StreetName" : objectAdress.StreetName,
        "Ward" : objectAdress.Ward,
        "District" : objectAdress.District,
        "City" : objectAdress.City,
        "Country" : objectAdress.Country
    })
    .then((data) => {
        console.log(data);
      dispatch(addToAddressSucess(objectAdress,data.key,true));
    })
    .catch((error) => {
      dispatch(addToAddressFailed("Add Failed ... "));
    });
  }
} 



export function addToAddressSucess(objectAdress,key) {
    return {
        type: types.ADD_DATA_ADDRESS_SUCCESS,
        payload:{
            newAddress:objectAdress,
            keyAdd:key
        }
    };
}

export function addToAddressRequested(isRequest) {
    return {
        type: types.ADD_DATA_ADDRESS_REQUEST,
        payload: isRequest
    };
}

export function addToAddressFailed(isFailed) {
    return {
        type: types.ADD_DATA_ADDRESS_FAILED,
        payload: isFailed
    };
}




/*edit new */
export function editToAddress(objectAdress,adKey) {
  return dispatch => {
    dispatch(editToAddressRequested("edit Request..."));
    configDatabase.ref('Address/' + adKey).set({
        "StreetName" : objectAdress.StreetName,
        "Ward" : objectAdress.Ward,
        "District" : objectAdress.District,
        "City" : objectAdress.City,
        "Country" : objectAdress.Country
    })
    .then((data) => {
        console.log(data);
        dispatch(editToAddressSucess(objectAdress,adKey,true));
    })
    .catch((error) => {
      dispatch(editToAddressFailed("edit Failed ... "));
    });
  }
} 



export function editToAddressSucess(objectAdress,adKey,isSuccess) {
    return {
        type: types.EDIT_DATA_ADDRESS_SUCCESS,
        payload:{
            editAddress:objectAdress,
            adKey:adKey,
            isSuccess:isSuccess
        }
    };
}

export function editToAddressRequested(isRequest) {
    return {
        type: types.EDIT_DATA_ADDRESS_REQUEST,
        payload: isRequest
    };
}

export function editToAddressFailed(isFailed) {
    return {
        type: types.EDIT_DATA_ADDRESS_FAILED,
        payload: isFailed
    };
}