import axios from 'axios';

export const generateToken = async () => {
    const maxRetries = 2;
    let retries = 0;

    while (retries <= maxRetries) {
        try {
            const apiKey = process.env.REACT_APP_X_API_KEY;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/token`, {
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.statusCode === 200) {
                return response.data.data;
            }
            retries++;
        } catch (err) {
            console.log("error", err);
            if (retries < maxRetries) {
                console.log(`Retrying... Attempt ${retries + 1}`);
                retries++;
            } else {
                throw new Error("Unauthenticated request")
            }
        }
    }
};
