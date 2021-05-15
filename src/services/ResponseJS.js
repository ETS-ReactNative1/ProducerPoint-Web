class ResponseJS {
    get = async (response)=>{
        if (response.status >= 200 && response.status <= 299){
            const json = await response.json()
            if (json){
                return json;
            } else  {
                const text = await response.text()
                if (text){
                    return text;
                }
                return "Body empty"
            }
        } else {
            return null;
        }
    }
}

export default new ResponseJS();
