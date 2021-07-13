import { popTarget, pushTarget } from "./dep"
import { nextTick } from "./util";

let id = 0
class Watcher{
    constructor(vm, fn){
        this.vm = vm
        this.id = id++
        this.getter = fn
        this.deps = []
        this.depsId = new Set()
        this.get()
    }
    run(){
        this.get()
    }
    get(){
        pushTarget(this)
        this.getter()
        popTarget()
    }
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){
            this.depsId.add(id)
            // this.deps.push(dep)
            dep.addSub(this)
        }
    }
    update(){
        queueWatcher(this)
        // this.get()
    }
}

let hasIds = new Set(),queue = []

function flushQueue(){
    if(queue.length ===0){
        return
    }
    queue.forEach(wathcer=>{
        wathcer.run()
    })
    queue = []
    hasIds = new Set()
}
function queueWatcher(wathcer){
    let id = wathcer.id
    if(!hasIds.has(id)){
        hasIds.add(id)
        queue.push(wathcer)

        nextTick(flushQueue)
    }
}

export default Watcher