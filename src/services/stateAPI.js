import axios from 'axios'


export const fetchStates = async () => {

    try {
        console.log("URL", process.env.REACT_APP_API_URL + "/state")
        const response = await axios.get(process.env.REACT_APP_API_URL + "/state")
        console.log("Response", response)
        if (response.data.statusCode === 200) {
            return response.data.data
        } else {
            alert(response.data.message)
        }
    } catch (err) {
        console.log("error", err)
        alert("Something went wrong. Please try again")
    }

}