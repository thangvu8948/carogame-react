export default function authHeader() {
    const strToken=localStorage.getItem('token');
    if (Boolean(strToken)){
        const token = JSON.parse(strToken);
        return new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json;charset=utf-8',
        })
     } else {
        return {};
    }
}