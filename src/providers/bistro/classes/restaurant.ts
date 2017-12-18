import { FirebaseObject } from "../../firebase/classes/firebase-object";
import * as firebase from 'firebase';

export enum RestaurantState {
    /**Trạng thái hoạt động bình thường */
    OPEN = 0,
    /**Trạng thái đã đóng cửa, ngưng hoạt động (lưu ý : khác với hết giờ mở cửa) */
    CLOSED
}

export class Restaurant extends FirebaseObject {
    /**ID của nhà hàng */
    id: string;
    /**Tên nhà hàng */
    name: string;
    /**Logo nhà hàng, thường trùng với logo của thương hiệu */
    logo: string;
    /**Tên thương hiệu */
    vendor_name: string;
    /**ID của thương hiệu */
    vendor_id: string;
    /**Logo của thương hiệu */
    vendor_logo: string;
    /**Địa chỉ */
    address: string;
    /**Tọa độ trên map */
    geopoint: firebase.firestore.GeoPoint;
    /**Đường dây nóng */
    hotline: string;
    /**Trạng thái của nhà hàng. Xem thêm RestaurantState */
    state: number;
    /**Thời gian mở cửa */
    time_open: string;
    /**Thời gian đóng cửa */
    time_close: string;
}