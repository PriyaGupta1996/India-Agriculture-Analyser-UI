export const titleCase = (data) => {
    console.log("data", data)
    return data.trim()[0].toUpperCase() + data.trim().slice(1)
}

//from Array of objects to flat array of relevant key only
export const dataFlattener = (data, key) => {
    const result = []
    for (let item of data) {
        result.push(titleCase(item[key]))
    }
    return result
}