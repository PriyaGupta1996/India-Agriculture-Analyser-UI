import axios from 'axios'
export const fetchDataTable = async ({ StateName, secondaryFilters, sortColumn, sortOrder, pageSize }) => {

    try {
        console.log("filter in datatable fetch", StateName, secondaryFilters);
        let API_QUERY = `${process.env.REACT_APP_API_URL}/agriculture/${StateName}?`

        if (secondaryFilters && Object.keys(secondaryFilters).length > 0) {
            for (let [key, value] of Object.entries(secondaryFilters)) {
                API_QUERY = API_QUERY + `${key}=${value}&`
            }
        }
        if (sortColumn && sortOrder) {
            API_QUERY = API_QUERY + `sortColumn=${sortColumn}&sortOrder=${sortOrder}`
        }

        console.log("FInal query", API_QUERY)
        const response = await axios.get(API_QUERY)
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