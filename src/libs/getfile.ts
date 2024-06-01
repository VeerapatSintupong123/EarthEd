export const getExamfile = async (name:string)=>{
    try {
        const response = await fetch(`/api/file/get?file=${name}`,{method:"GET"});
        const result = await response.json();
        if(response.ok && result.status === "success"){
            return result.data;
        }else return [];
    } catch (error) {
        return [];
    }
}