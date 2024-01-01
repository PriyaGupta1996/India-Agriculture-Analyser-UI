import axios from 'axios'

export const fetchDataTable = async ({ StateName, secondaryFilters, sortColumn, sortOrder, page, pageSize }) => {

    try {
        let API_QUERY = `${process.env.REACT_APP_API_URL}/agriculture/${StateName}?`

        if (secondaryFilters && Object.keys(secondaryFilters).length > 0) {
            for (let [key, value] of Object.entries(secondaryFilters)) {
                API_QUERY = API_QUERY + `${key}=${value}&`
            }
        }
        if (sortColumn && sortOrder) {
            API_QUERY = API_QUERY + `sortColumn=${sortColumn}&sortOrder=${sortOrder}`
        }
        if (page) {
            API_QUERY = API_QUERY + `&page=${page}`
        }
        if (pageSize) {
            API_QUERY = API_QUERY + `&pageSize=${pageSize}`
        }

        const token = localStorage.getItem("bearerToken")

        const response = await axios.get(API_QUERY, {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json',
            },
        })
        if (response.data.statusCode === 200) {
            return response.data.data
        } else {
            console.log(response.data.message)
            throw new Error(response.data.message)
        }
    } catch (err) {
        console.log("error", err)
        throw err
    }

}