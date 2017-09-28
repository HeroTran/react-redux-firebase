import * as types from '../actions/actionType';
import  utility from '../utility/utility';
export const initialState = {
    address:[],
    csvData:[],
    Keys:[]
   
};



export default function AddressReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_ADDRESS_SUCCESS:
        const address = action.payload.address.Address;
        const newStateGet = Object.assign({}, state);
        newStateGet.address = [];
        for (var key in address) {
            newStateGet.Keys.push(key);
        }
        if (address) {
            newStateGet.address = Object.keys(address).map(
                k => address[k]
            );
            newStateGet.csvData = utility.handleConvertDataToCSV(newStateGet.address);
        }
        
        return newStateGet;
    case types.ADD_DATA_ADDRESS_SUCCESS:
        const newState = Object.assign({}, state);
        newState.address = newState.address || [];
        newState.address = newState.address.slice();
        newState.Keys.push(action.payload.keyAdd);
        newState.address.push(action.payload.newAddress);
        newState.csvData = utility.handleConvertDataToCSV(newState.address);
        return newState;
    case types.EDIT_DATA_ADDRESS_SUCCESS:
        const editState = Object.assign({}, state);
        editState.address = editState.address || [];
        editState.address = editState.address.slice();
        for(var i=0;i<editState.address.length;i++){
            if(editState.Keys[i] == action.payload.adKey){
                editState.address[i].StreetName =  action.payload.editAddress.StreetName;
                editState.address[i].Ward = action.payload.editAddress.Ward;
                editState.address[i].District = action.payload.editAddress.District;
                editState.address[i].City =  action.payload.editAddress.City;
                editState.address[i].Country = action.payload.editAddress.Country;
            }
        }
        editState.csvData = utility.handleConvertDataToCSV(editState.address);
        return editState;
    default:
      return state
  }
}











