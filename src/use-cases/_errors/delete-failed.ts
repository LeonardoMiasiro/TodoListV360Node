import {ErrorHandlerGlobal} from "./error-handler";

export class DeleteFailed extends ErrorHandlerGlobal {
    constructor() {
        super({
            message: "Delete Failed",
            statusCode: 409
        });
    }
}