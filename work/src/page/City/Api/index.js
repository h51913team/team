import axios from '../../../Utils/axios'
//获取所有数据
let getAllCitiesData=()=>{
    let url='/mall/city/getInfo'
    return axios.post(url,{})
}
let getlist=(page,pageSize)=>{
    let url='/mall/city/getInfos'
    return axios.post(url,{params:{page,pageSize}})
}
//添加数据
let addCitiesData=(data)=>{
    let url='/mall/city/add'
    return axios.post(url,data)
}
//修改数据
let citiesUpdata=(_id,name, carType, shop, cityAdmin, runType, person )=>{
    let url='/mall/city/update'
    return axios.post(url,{_id,name, carType, shop, cityAdmin, runType, person })
}
//删除数据
let deleteCitiesData=(_id)=>{
    let url='/mall/city/del'
    return axios.post(url,{_id})
}
//查询
let citiesQueryData=(keys)=>{
    let url='/mall/city/getInfos'
    return axios.post(url,{keys})
}
//关键字查询
let citiesKeysData=(kw)=>{
    let url='/mall/city/getInfosByKw'
    return axios.post(url,{kw})
}
export {getAllCitiesData,getlist,addCitiesData,citiesUpdata,deleteCitiesData,citiesQueryData,citiesKeysData}