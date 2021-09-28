export const searchFilter = (data,params,query)=>{
    const final = data.filter((a) => {
        return a[params].toLowerCase().includes(query) || a[params].includes(query)
    })
    return query? final : data
}

export const groupFilter = (data, params, query)=>{
  console.log('data, ', data)
  console.log('query, ', parseInt(query))
  const final = data.filter((a) => {
        return a[params] === parseInt(query)
    })
  console.log('filter, ', final)
    return query? final : data
}

export const groupDepartmentFilter = (data, params, query)=>{
    console.log(params)
    const final = data.filter((a) => {
        return a[params] === query
    })
    return query? final : data
}
