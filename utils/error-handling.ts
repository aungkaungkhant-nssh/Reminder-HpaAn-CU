import toast from "react-hot-toast";

type ErrorDetails = {
    type: string;
    message: string;
};

type HandleErrorOptions = {
    form?: any;
    fieldMapping?: Record<string, string>;
};

export const handleError = (err: any, options?: HandleErrorOptions) => {
    let errorDetails: ErrorDetails;

    try {
        errorDetails = JSON.parse(err.message);
    } catch {
        errorDetails = { type: "UNKNOWN_ERROR", message: "An unexpected error occurred." };
    }

    if (options?.form && options.fieldMapping) {
        const field = options.fieldMapping[errorDetails.type];
        if (field) {
            options.form.setError(field, { type: "manual", message: errorDetails.message });
            return;
        }
    }

    toast.error(errorDetails.message || "An unexpected error occurred.");
    return errorDetails;
};
