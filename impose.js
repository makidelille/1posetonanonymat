const fs = require("fs");
const path = require("path");


let _intance = null;
class ImposeService{
    
    static getInstance(){
        if(_intance == null){
            _intance = new ImposeService();
        }
        return _intance;
    };
        

    constructor(){
        this.pathMap = [];
        this.basePath = "./img/IMPOSE TON ANONYMAT";
        this.buildIndex();
    }   

    buildIndex(){
        const timeStart = Date.now();
        const paths = fs.readdirSync(path.resolve(this.basePath));
        console.log(`${paths.length} images trouvées, construction de l'index`);
        for(let p of paths){
            let stats = fs.statSync(path.resolve(this.basePath, p));
            this.pathMap.push({birthTimeMs: stats.birthtimeMs, path: p});
        }
        
        console.log("Tri des images");
        this.pathMap = this.pathMap.sort((a, b) => b.birthTimeMs - a.birthTimeMs); // la plus recente en premier

        console.log(`Traitement fini en ${Date.now() - timeStart}ms`)
    }

    resolveFileName(imgPath){
        return path.resolve(this.basePath, imgPath);
    }

    get first(){
        return this.pathMap[0];
    }

    get last(){
        return this.pathMap[this.pathMap.length - 1];
    }

    get random(){
        return this.pathMap[Math.floor(Math.random() * this.length)];
    }

    get length(){
        return this.pathMap.length;
    }



    
}

module.exports = ImposeService;