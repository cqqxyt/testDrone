// class Promise {
//   constructor(excutor) {
//     this.PromiseState = "pending";
//     this.PromiseResult = "";
//     this.callbacks = [];

//     const _self = this;
//     function resolve(res) {
//       //   console.log("_self.PromiseState", _self.PromiseState);
//       //   console.log(_self.callbacks);
//       if (_self.PromiseState !== "pending") return;
//       _self.PromiseState = "fulfilled";
//       _self.PromiseResult = res;
//       _self.callbacks.forEach((item) => {
//         item && item.onResolve(_self.PromiseResult);
//       });
//     }
//     function reject(res) {
//       if (_self.PromiseState !== "pending") return;
//       _self.PromiseState = "rejected";
//       _self.PromiseResult = res;
//       _self.callbacks.forEach((item) => {
//         item && item.onReject(_self.PromiseResult);
//       });
//     }
//     try {
//       excutor(resolve, reject);
//     } catch (e) {
//       reject(e);
//     }
//   }

//   then(onResolve, onReject) {
//     const me = this;
//     if (typeof onResolve !== "function") {
//       onResolve = (v) => v;
//     }
//     if (typeof onReject !== "function") {
//       onReject = (e) => {
//         throw e;
//       };
//     }

//     return new Promise((resolve, reject) => {
//       function _callback(res) {
//         if (res instanceof Promise) {
//           try {
//             res.then(resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         } else {
//           resolve(res);
//         }
//       }
//       function _runOnResolve() {
//         setTimeout(() => {
//           try {
//             let res = onResolve(me.PromiseResult);
//             _callback(res);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       }

//       function _runOnReJect() {
//         setTimeout(() => {
//           try {
//             let res = onReject(me.PromiseResult);
//             _callback(res);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       }

//       if (me.PromiseState === "fulfilled") {
//         _runOnResolve();
//       }

//       if (me.PromiseState === "rejected") {
//         _runOnReJect();
//       }

//       if (me.PromiseState === "pending") {
//         me.callbacks.push({
//           onResolve: function() {
//             _runOnResolve();
//           },
//           onReject: function() {
//             _runOnReJect();
//           },
//         });
//       }
//     });
//   }

//   catch(reject) {
//     return this.then(undefined, reject);
//   }

//   finally(callback) {
//     return this.then((value) => Promise.resolve(callback()).then(() => value));
//   }
//   static resolve(res) {
//     return new Promise((resolve, reject) => {
//       if (res instanceof Promise) {
//         res.then(resolve, reject);
//       } else {
//         resolve(res);
//       }
//     });
//   }

//   static reject(res) {
//     return new Promise((resolve, reject) => {
//       reject(res);
//     });
//   }
//   static all(promises) {
//     return new Promise((resolve, reject) => {
//       let resArr = [];
//       let count = 0;
//       for (let i = 0; i < promises.length; i++) {
//         promises[i].then(
//           (v) => {
//             count++;
//             resArr[i] = v;
//             if (count === promises.length) {
//               resolve(resArr);
//             }
//           },
//           (r) => {
//             reject(r);
//           }
//         );
//       }
//     });
//   }

//   static race(promises) {
//     return new Promise((resolve, reject) => {
//       for (let i = 0; i < promises.length; i++) {
//         promises[i].then(
//           (v) => {
//             resolve(v);
//           },
//           (r) => {
//             reject(r);
//           }
//         );
//       }
//     });
//   }
// }

function debounce(fn, timer = 0) {
  var t = null;
  return function() {
    const me = this;
    console.log(t);
    if (t) {
      clearTimeout(t);
    }
    if (!t) {
      fn.apply(me, arguments); //me绑定this指向
    }
    t = setTimeout(() => {
      console.log("timer");
      // 使用箭头函数改变this指向
      t = null;
    }, timer);
    console.log(t);
  };
}
export default debounce;
