/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    let x={}
    for(let i =0;i<knowledge.length;i++){
        let [key,val]=knowledge[i]    
           x[key]=val 
    }
    
    let final=""
    for(let i =0;i<s.length;i++){
        if(s[i]=='('){
            let str=''
            while(s[i]!==')'){
                i++
                if(s[i]==')'){
                    break
                }
                str+=s[i]
            }
            if(x[str]){
                final+=x[str]
            }
            else{
                final+='?'
            }
        }
        else{
        final+=s[i]   
        }
    }
    return final
};
