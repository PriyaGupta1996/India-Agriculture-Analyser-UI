import axios from 'axios'


export const fetchStates = async () => {

    try {
        const token = localStorage.getItem("bearerToken")
        const response = await axios.get(process.env.REACT_APP_API_URL + "/state",
            {
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json',
                },
            })
        if (response.data.statusCode === 200) {
            return response.data.data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log("error", error)
        throw error
    }

}