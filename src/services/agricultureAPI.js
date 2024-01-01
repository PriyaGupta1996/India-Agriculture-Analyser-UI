import axios from 'axios'

export const fetchDataTable = async ({ StateName, secondaryFilters, sortColumn, sortOrder, page, pageSize }) => {

    try {
        let url = `${process.env.REACT_APP_API_URL}/agriculture/${StateName}?`

        const params = {
            ...secondaryFilters,
            sortColumn,
            sortOrder,
            page,
            pageSize
        }

        const token = localStorage.getItem("bearerToken")

        const response = await axios.get(url, {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json',
            }, params
        })
        if (response.data.statusCode === 200) {
            return response.data.data
        } else {
            console.log(response.data.message)
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log("error", error)
        throw error
    }

}