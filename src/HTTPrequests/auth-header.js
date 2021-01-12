export default function authHeader(strToken = localStorage.getItem("user")) {
    // const strToken=localStorage.getItem('user');
    //console.log(strToken)
    if (Boolean(strToken)){
        //const token = JSON.parse(strToken);
        return new Headers({
            'Authorization': 'Bearer ' + strToken,
            'Content-Type': 'application/json;charset=utf-8',
        })
     } else {
        return {};
    }
}