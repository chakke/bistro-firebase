import { Food } from "./food";
import { FirebaseObject } from "../../firebase/classes/firebase-object";
import * as firebase from 'firebase';
export enum FoodOrderState {
    /**Mặc định khi order food thì món ăn ở trạng thái đợi */
    WAITING = 0,
    /**Sau khi đầu bếp xem xét các món đang đợi, lựa chọn món để chế biến, đưa nó vào trạng thái Cooking */
    COOKING = 1,
    /**Nếu hết nguyên liệu, hoặc không thể chế biến tại thời điểm hiện tại thì thông báo */
    COOKING_UNAVAILABLE = 2,
    /**Khi chế biến xong, chuyển nó về trạng thái sẵn sàng để giao, chạy bàn tiếp nhận thông tin và chuyển đến bàn theo yêu cầu */
    DELIVERABLE = 3,
    /**Khi phục vụ giao xong món ăn */
    DELIVERED = 4,
    /**Trong quá trình giao, khách không nhận hoặc hủy món */
    RETURNED = 5
}

export enum PaymentState {
    /**Đã thanh toán */
    PAID = 0,
    /**Đã hủy, vì một lý do nào đó,thông tin thanh toán không hợp lệ, nên hủy hóa đơn */
    CANCELLED,
}

export enum PaymentType {
    /**Ghi nợ, chưa trả */
    BOOKED = -1,
    /**Cash : tiền mặt */
    CASH = 0,
    /**Thẻ visa or master hoặc atm */
    BANK
}

export enum OrderState {
    /**Đã tạo, chưa gọi món hoặc đã gọi món nhưng chưa chế biến xong */
    CREATED = 0,
    /**Đã chuyển xong các món */
    FOOD_DONE = 1,
    /**Đã thanh toán */
    PAID = 2,
    /**Đã hủy */
    CANCELLED = 3
}

export class OrderPayment extends FirebaseObject {
    /**ID của payment */
    id: string;
    /**ID của order */
    order_id: string;
    /**Trạng thái của Payment */
    state: number;
    /**Loại hóa đơn */
    type: string;
    /**Thời gian lập hóa đơn, tính theo miliseconds */
    time: number;

    /**Tổng tiền*/
    money_total: number;
    /**Số tiền khách đưa */
    money_reciever: number;
    /**Số tiền trả lại khách */
    money_return: number;
    /**Số tiền được chiết khấu dựa trên coupon hoặc các chương trình khuyến mãi */
    money_sales: number;
    /**Số tiền cuối cùng mà khách phải trả */
    money: number;

    /**ID của nhân viên lập hóa đơn */
    staff_id: string;
    /**ID của khách hàng */
    user_id: string;
}

export class FoodOrder extends FirebaseObject {
    /**ID của food order */
    id: string;
    /**ID cuar order */
    order_id: string;
    /**Nhân viên gọi món */
    staff_id: string;
    /**Trạng thái của food trong order , xem thêm FoodOrderState*/
    state: number;
    /**Số lượng order */
    amount_order: number;
    /**Số lượng đã chế biến xong */
    amount_done: number;
    /**Số lượng đã trả cho khách */
    amount_return: number;
    /**Món ăn */
    food: Food;
    /**Tổng tiền toàn bộ của món ăn = amout * food-saled-price */
    price: number;
    /**Tổng toàn bộ chiết khấu trên món ăn đó */
    sale: number;
    /**Danh sách id của các options */
    options: Array<string>;
    /**Ghi chú */
    note: string;
}

export class Order extends FirebaseObject {
    /**ID của Order */
    id: string;
    /**Mô tả của order */
    descrition: string;
    /**Trạng thái order */
    state: number;
    /**Loại order */
    type: number;
    /**Thời gian tạo order */
    time_create: Date;

    /**ID của khu vực */
    area_id: string;
    /**Danh sách các bàn của order */
    table_ids: Array<string>;
    /**ID nhân viên ghi order */
    staff_id: string;
    /**Ghi chú */
    note: string;
}
