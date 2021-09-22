export const searchFilter = (data,params,query)=>{
    const final = data.filter((a) => {
        return a[params].toLowerCase().includes(query) || a[params].includes(query)
    })
    return query? final : data
}

export const groupFilter = (data, params, query)=>{
    const final = data.filter((a) => {
        return a[params] === query
    })
    return query? final : data
}

export const groupDepartmentFilter = (data, params, query)=>{
    console.log(params)
    const final = data.filter((a) => {
        return a[params] === query
    })
    return query? final : data
}