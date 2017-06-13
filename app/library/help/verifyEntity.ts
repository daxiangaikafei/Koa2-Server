export default function(ins,bases){
    let errors = [];
    let newObj = {};
    let result = true;
    for(let key in bases){
        if(ins[key]==undefined){
            errors.push(key);
            result = false;
        }else{
            newObj[key] = ins[key]
        }
    }
    return result?newObj:errors.join(" 不能为空 ,")+" 不能为空";
}