import { API } from "./api";

export function AddProducts(data) {
    return API.post('/add', data);
}

export function FetchProducts(search, dateObj, data) {
    return API.get(`/listing?search=${search}&start=${dateObj.startDate}&end=${dateObj.endDate}&page=${data}`);
}