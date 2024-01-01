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
    } catch (err) {
        console.log("error", err)
        throw new Error("Error", err)
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
    } catch (err) {
        console.log("Error", err)
        throw err
    }

}