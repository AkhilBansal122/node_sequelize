import { TESTING } from "app/redux/contant";

export const productData = (data = [], action) => {
    switch (action.type) {
        case TESTING:
            console.log("Product list", data);
            return [action.data, ...data];
        default:
            return data;
    }
}