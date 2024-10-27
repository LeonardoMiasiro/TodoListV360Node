type ErrorHandlerGlobalProps = {
    message: string;
    statusCode: number;
};

export class ErrorHandlerGlobal extends Error {
    private props: ErrorHandlerGlobalProps;
    constructor(props: ErrorHandlerGlobalProps) {
        super(props.message);
        this.props = props;
    }

    get statusCode() {
        return this.props.statusCode;
    }

    get message() {
        return this.props.message;
    }
}