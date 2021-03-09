export const parseResponseError=(e)=>{
    if(e?.response){
        const {response:{data}} = e;
        return data;
    }else{
        return e;
    }
}