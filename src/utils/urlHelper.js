import { useLocation } from "react-router-dom";

/**
 * Constructs a URL with existing and new query parameters.
 * @param {string} path - The base path.
 * @param {Object} [newQueryParams={}] - An object containing new query parameters.
 * @returns {string} - The full URL with merged query parameters.
 */
export function useCreateUrlWithParams() {
    const location = useLocation(); // Get current URL details

    return (path, newQueryParams = {}) => {
        const existingParams = new URLSearchParams(location.search);
        
        // Merge existing params with new params
        Object.entries(newQueryParams).forEach(([key, value]) => {
            existingParams.set(key, value); // Updates existing key or adds new one
        });

        const queryString = existingParams.toString();
        return queryString ? `${path}?${queryString}` : path;
    };
}
