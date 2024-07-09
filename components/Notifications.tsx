import React, { useEffect,useState} from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function ErrorNotification({ error }: any) {
    const [displayedErrors, setDisplayedErrors] = useState<string[]>([]);

    useEffect(() => {
        if (error && error.error && Array.isArray(error.error)) {
            const errorMessage = error.error.join(', ');

            if (!displayedErrors.includes(errorMessage)) {
                toast.error(errorMessage, {
                    autoClose: 7000, 
                });
                setDisplayedErrors([...displayedErrors, errorMessage]);
            }
        } else if (error && typeof error.error === 'string') {
            if (!displayedErrors.includes(error.error)) {
                toast.error(error.error, {
                    autoClose: 7000,
                });
                setDisplayedErrors([...displayedErrors, error.error]);
            }
        }
    }, [error, displayedErrors]);

    return <ToastContainer />;
}
export function SuccessNotification({ successResponse }: any) {
    const [displayedError, setDisplayedError] = useState<string | null>(null);

    useEffect(() => {
        if (successResponse && successResponse.message !== displayedError) {
            toast.success(successResponse.message, {
                autoClose: 7000,
            });
            setDisplayedError(successResponse.message);
        }
    }, [successResponse, displayedError]);

    return <ToastContainer />;
}
