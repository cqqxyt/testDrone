let callbacks = [],pendding = false
function flushCallbacks(){
    pendding = false
    callbacks.forEach(cb=>cb())
    callbacks = []
}
export function nextTick(cb){
    callbacks.push(cb)
    if(!pendding){
        Promise.resolve().then(flushCallbacks)
        pendding = true
    }
}