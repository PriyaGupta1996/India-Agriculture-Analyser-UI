import axios from 'axios'
export const fetchDataTable = async (primaryFilterKey, titleFilterKey, sortColumn, sortOrder, pageSize,) => {

    try {
        console.log("URL", process.env.REACT_APP_API_URL + "/")
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/agriculture/${primaryFilterKey}`)
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