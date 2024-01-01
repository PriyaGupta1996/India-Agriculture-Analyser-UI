import axios from 'axios'
export const fetchProductionPerYear = async (stateName) => {
    try {
        const token = localStorage.getItem("bearerToken")
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/agriculture/${stateName}/production-per-year`,
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
        throw new Error("Error", error)
    }

}

export const fetchProductionPerCrop = async (stateName) => {
    try {
        const token = localStorage.getItem("bearerToken")
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/agriculture/${stateName}/production-per-crop`,
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
        console.log("Error", error)
        throw error
    }

}