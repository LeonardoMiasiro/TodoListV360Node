import {ErrorHandlerGlobal} from "./error-handler";

export class ResourceNotFoundError extends ErrorHandlerGlobal {
    constructor() {
        super({
            message: "Resource Not Found",
            statusCode: 404
        });
    }
}