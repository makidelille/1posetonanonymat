let _intance = null;
class ImposeService{
    
    static getInstance(){
        if(_intance == null){
            _intance = new ImposeService();
        }
        return _intance;
    };
        
    constructor(){
        console.log("bijour");
    }


    
    
}

module.exports = ImposeService;