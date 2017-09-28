import * as React from 'react'
import * as cx from 'classnames';
import {Link} from 'react-router';
import {CSVLink, CSVDownload} from 'react-csv';
import  utility from '../../utility/utility';
import $ from 'jquery';
import './Address.css';


const createMarkup = (value) => ({__html: value});
export default class Address extends React.Component {
 constructor(props){
        super(props);
        this.state = {
            isAdd:true,
            isShow:false,
            isCheck:true,
            keyEdit:"",
            isError:"",
            streetName:"",
            ward : "",
            district : "",
            city : "",
			country : ""
			
            

        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleSubmitEditForm = this.handleSubmitEditForm.bind(this);
  }
  handleClickAddNew = () =>{
      this.setState({isShow: true,isAdd:true,isSuccess:false})
      $("html, body").animate({ scrollTop: $(".Address-form-add").offset().top }, 500);
  }
  handleClickClose = () =>{
    this.setState({isShow: false})
    $("html, body").animate({ scrollTop: 0 }, 500);
 }
 handleChange = (e,key)=>{
    var state = {};
    state[key] = e.target.value;
    this.setState(state);
 }
 handleEditAddress = (e)=>{
    var street = e.target.parentNode.parentNode.querySelector(".streetName").innerText.trim("");
    var ward = e.target.parentNode.parentNode.querySelector(".ward").innerText.trim("");
    var district = e.target.parentNode.parentNode.querySelector(".district").innerText.trim("");
    var city = e.target.parentNode.parentNode.querySelector(".city").innerText.trim("");
    var country = e.target.parentNode.parentNode.querySelector(".country").innerText.trim("");
    this.setState({
        isSuccess:false,
        isShow: true,
        isAdd:false,
        keyEdit:e.target.dataset.id,
        streetName:street,
        ward : ward,
        district : district,
        city : city,
        country : country
        
    });
    $("html, body").animate({ scrollTop: $(".Address-form-add").offset().top }, 500);
 }

 handleSubmitForm(event) {
    event.preventDefault();
    var street = this.state.streetName;
    var ward = this.state.ward;
    var district = this.state.district;
    var city = this.state.city;
    var country = this.state.country;
    var objectCheck = utility.checkValidateForm(street,ward,district,city);
    this.setState({ isCheck: objectCheck.isCheck,isError: objectCheck.isError });
   
    if(objectCheck.isCheck){
        const objectAdress = {
            "StreetName" : street,
            "Ward" : ward,
            "District" : district,
            "City" : city,
            "Country" : country
        }
        this.props.addNewAddress(objectAdress);
        this.setState({
            isShow: false,
            isSuccess:true,
            streetName:"",
            ward : "",
            city : "",
			country : "",
			district : ""
        });
        $("html, body").animate({ scrollTop: 0 }, 500);
        
    }
 }


 handleSubmitEditForm(event) {
    event.preventDefault();
    var street = this.state.streetName;
    var ward = this.state.ward;
    var district = this.state.district;
    var city = this.state.city;
    var country = this.state.country;
    var objectCheck = utility.checkValidateForm(street,ward,district,city);
    this.setState({ isCheck: objectCheck.isCheck,isError: objectCheck.isError });
    if(objectCheck.isCheck){
        console.log("success");
        const objectAdress = {
            "StreetName" : street,
            "Ward" : ward,
            "District" : district,
            "City" : city,
            "Country" : country
        }
        this.props.editAddress(objectAdress,this.state.keyEdit);
        this.setState({
            isShow: false,
            isSuccess:true,
            streetName:"",
            ward : "",
            city : "",
			country : "",
			district : ""
        });
        $("html, body").animate({ scrollTop: 0 }, 500);
        
    }
 }
  
  render() {
      const {address,csvData,Keys} = this.props;
      const title = this.state.isAdd ? "Add new Address" : "Edit Info Address";
      const btn = this.state.isAdd ? "Add" : "Edit";
      const alert = this.state.isAdd ? "Add new address success!" : "Edit info address success!";
      return (
        
        <div className="Address-wrap">
            
            {this.state.isSuccess &&  
                <div className="alert alert-success animated fadeIn">
                    <span>{alert}</span>
                </div>
            }
            <div className="Address-table container">
                <div className="Address-button">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleClickAddNew()}>Add New</button>
                </div>
                <div className="Address-button">
                   <CSVLink filename={"my-address.csv"} data={csvData} className="btn btn-success">Export CSV</CSVLink>
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Street Name</th>
                            <th>Ward</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                        </thead>
                    <tbody>
                    {address != null && address.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td><span data-id={Keys[index]} onClick={(event) => this.handleEditAddress(event)} className="glyphicon glyphicon-edit"></span></td>
                                <td className="streetName">{data.StreetName}</td>
                                <td className="ward">{data.Ward}</td>
                                <td className="district">{data.District}</td>
                                <td className="city">{data.City}</td>
                                <td className="country">{data.Country}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="Address-form-add">
            {this.state.isShow && 
            <div className="container">
                    <h2>{title}</h2>
                    {!this.state.isCheck && 
                        <div className="alert alert-danger">
                            <div dangerouslySetInnerHTML={createMarkup(this.state.isError)} />
                        </div>
                    }
                    <form onSubmit={this.state.isAdd ? this.handleSubmitForm : this.handleSubmitEditForm}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="Street Name">Street Name:</label>
                                <input value={this.state.streetName}  onChange={(event) => this.handleChange(event,'streetName')}  type="text" className="form-control" id="street" placeholder="Enter Street Name" name="street" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Ward">Ward:</label>
                                <input value={this.state.ward}  onChange={(event) => this.handleChange(event,'ward')}  type="text" className="form-control" id="ward" placeholder="Enter Ward" name="ward" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="District">District:</label>
                                <input value={this.state.district}  onChange={(event) => this.handleChange(event,'district')}  type="text" className="form-control" id="district" placeholder="Enter District" name="district" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="City">City:</label>
                                <input value={this.state.city}  onChange={(event) => this.handleChange(event,'city')} type="text" className="form-control" id="city" placeholder="Enter City" name="city" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Country">Country:</label>
                                <input value={this.state.country}  onChange={(event) => this.handleChange(event,'country')}  type="text" className="form-control" id="country" placeholder="Enter Country" name="country" />
                            </div>
                            <button type="submit" className="btn-address btn btn-success">{btn}</button>
                            <button type="button" className="btn btn-default" onClick={() => this.handleClickClose()}>Close</button>
                        </div>
                    </form>
                </div>
            }
            </div>
        </div>
    );
    
  }
}