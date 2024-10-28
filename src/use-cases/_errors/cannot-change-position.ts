import {ErrorHandlerGlobal} from "./error-handler";

export class CannotChangePosition extends ErrorHandlerGlobal {
    constructor() {
        super({
            message: "Cannot Change Position",
            statusCode: 409
        });
    }
}