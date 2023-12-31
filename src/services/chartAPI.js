import axios from 'axios'
export const fetchProductionPerYear = async (stateName) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/agriculture/${stateName}/production-per-year`)
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

export const fetchProductionPerCrop = async (stateName) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/agriculture/${stateName}/production-per-crop`)
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