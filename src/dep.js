let id = 0
class Dep{
    static target = null
    constructor(){
        this.id = id++
        this.subs = []
        
    }
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
    depend(){
        Dep.target.addDep(this)
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    
}

export function pushTarget(watcher){
    Dep.target = watcher
}

export function popTarget(){
    Dep.target = null
}

export default Dep