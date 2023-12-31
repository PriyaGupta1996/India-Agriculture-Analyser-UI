export const titleCase = (data) => {
    if (data) {
        if (!isNaN(parseFloat(data)) && isFinite(data))
            return data
        else return data.trim()[0].toUpperCase() + data.trim().slice(1)
    }

}

//from Array of objects to flat array of relevant key only
export const dataFlattener = (data, key) => {
    if (data && key) {
        const result = []
        for (let item of data) {
            result.push(titleCase(item[key]))
        }
        return result
    }
}

export const roundDecimals = (data) => {
    if (data)
        return data.toFixed(2)
}


export const lowerCase = (data) => {
    if (data) {
        if (!isNaN(parseFloat(data)) && isFinite(data))
            return data
        else return data.toLowerCase()
    }
}