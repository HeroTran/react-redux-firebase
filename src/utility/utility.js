class utility{
    
    checkValidateForm(street,ward,district,city){
        
        var check = true;
        var error = "";
        if(street.trim("").length == 0){
            check = false;
            error += "street is always required </br> ";
        }
        if(city.trim("").length == 0){
            if(ward.trim("").length == 0){
                check = false;
                error += "ward is required </br> ";
            }
            if(district.trim("").length == 0){
                check = false;
                error += "district is required </br> ";
            }
        }
        var object_check = {
            isCheck:check,
            isError:error
        }
        return object_check;
    }

    handleConvertDataToCSV = (data)=>{
        var csvData = [];
        var header = ["StreetName","Ward","District","City","Country"];
        csvData.push(header);
        for(var i=0;i<data.length;i++){
            var content = [];
            content.push(data[i].StreetName);
            content.push(data[i].Ward);
            content.push(data[i].District);
            content.push(data[i].City);
            content.push(data[i].Country);
            csvData.push(content);
        }
        return csvData;
    }
}
export default new utility();