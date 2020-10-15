import { NotificationManager } from "react-notifications";
import HTTP_STATUS from "../net/httpStatus";

export const NotificationType = {
    WARNING: "warning",
    SUCCESS: "success",
    ERROR: "error"
}

/**
 * It is responsible for showing the backend notification to the user.
 * @param {*} data - Data received by the backend application.
 */
export const BackendErrorNotification = (data) => {    
    if (data.hasOwnProperty("response")) {  
        let response = data.response;          
        if (response.status === HTTP_STATUS.BAD_REQUEST) {
            response = response.data;

            if (response != null && response.message != null) {
                NotificationManager.error(response.message);
            }

            if (response.errors != null && response.errors.length > 0) {
                var err;
                for (err in response.errors) {
                    NotificationManager.error(err);
                }
            }
        }
    } else {
        NotificationManager.error(data.message);
    }
}

/**
 * It is responsible for showing the frontend notification to the user.
 * @param {*} message - Message that will be displayed to the user.
 * @param {*} type - Message type.
 */
export const FrontendNotification = (message, type) => {
    if (type === NotificationType.SUCCESS) {
        NotificationManager.success(message);
    } else if (type === NotificationType.WARNING) {        
        NotificationManager.warning(message);
    } else if (type === NotificationType.ERROR) {
        NotificationManager.error(message);
    }
}