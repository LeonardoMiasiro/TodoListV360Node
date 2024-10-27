import {ErrorHandlerGlobal} from "./error-handler";

export class UpdateFailed extends ErrorHandlerGlobal {
    constructor() {
        super({
            message: "Update Failed",
            statusCode: 409
        });
    }
}