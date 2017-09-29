class utility{
    
    checkValidateForm(street,ward,district,city){
        
        var check = true;
        var error = "";
        if(street.trim("").length === 0){
            check = false;
            error += "street is  required </br> ";
        }
        if(city.trim("").length === 0){
            if(ward.trim("").length === 0){
                check = false;
                error += "ward is required </br> ";
            }
            if(district.trim("").length === 0){
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
    getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address);
                    
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};
}
export default new utility();