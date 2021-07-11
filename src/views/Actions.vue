<template>
<div class="text-align-center">
    <AlertModal @click="test" @lis="lis" name="a" age="2" class="test"></AlertModal>
    <label>xxxx<input type="text" @input="actionInputIfTrue" /></label>
    <button @click="test1">Click1211Click1211Click1211</button>
    <p>{{ $store.getters.text }}</p>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import AlertModal from '@/views/AlertModal'
import sum from "@/views/sum";
import debounce from "@/views/promise";

// function sort(arr){
//   if(arr.length <=1){
//     return arr
//   }
//   const index = 0
//   const left = []
//   const right = []
//   for(let i = 1;i<arr.length; i ++){
//     if(arr[i]>arr[index]){
//       right.push(arr[i])
//     }else{
//       left.push(arr[i])
//     }
//   }
//   return sort(left).concat([arr[index]],sort(right))
// }

// var fib = function(n) {
//   if(){}
//   var arr = [0,1]
//   for(let i = 2 ; i <=n ; i++){
//     arr[i] = arr[i-1]+arr[i-2]
//   }
//   console.log(arr)
//   return arr.pop()
// };
// orders = [
//     ["David", "3", "Ceviche"],
//     ["Corina", "10", "Beef Burrito"],
//     ["David", "3", "Fried Chicken"],
//     ["Carla", "5", "Water"],
//     ["Carla", "5", "Ceviche"],
//     ["Rous", "3", "Ceviche"]
// ]
// [
//     ["Table", "Beef Burrito", "Ceviche", "Fried Chicken", "Water"],
//     ["3", "0", "2", "1", "0"],
//     ["5", "0", "1", "0", "1"],
//     ["10", "1", "0", "0", "0"]
// ]

const orders = [
    ["David", "3", "Ceviche"],
    ["Corina", "10", "Beef Burrito"],
    ["David", "3", "Fried Chicken"],
    ["Carla", "5", "Water"],
    ["Carla", "5", "Ceviche"],
    ["Rous", "3", "Ceviche"]
]
var displayTable = function (orders) {
    const ordermenus = []
    const tableMap = {}
    const head = []
    orders.forEach(element => {
        if (!tableMap[element[1]]) {
            tableMap[element[1]] = {}
        }
        if (!head.includes(element[2])) {
            head.push(element[2])
        }

        if (!tableMap[element[1]][element[2]]) {
            tableMap[element[1]][element[2]] = 1
        } else {
            tableMap[element[1]][element[2]]++
        }
    });
    head.sort().unshift("Table")
    ordermenus.push(head)
    for (const key in tableMap) {
        const arr = []
            arr.push(key)
        for (let i = 1; i < head.length; i++) {
            if (!tableMap[key][head[i]]) {
                arr.push(0)
            } else {
                arr.push(tableMap[key][head[i]])
            }
        }
        ordermenus.push(arr)
    }
    return ordermenus
};
console.log(displayTable(orders))

export default {
    components: {
        AlertModal
    },
    methods: {
        lis() {},
        ...mapActions(["actionClick"]),
        actionInputIfTrue: function actionInputIfTrue(event) {
            const inputValue = event.target.value;
            if (inputValue === "input")
                this.$store.dispatch("actionInput", {
                    inputValue
                });
            else this.$store.dispatch("actionInput", {
                inputValue: ""
            });
        },
        test() {},
        test1: debounce(function () {
        }, 500),
    },
    mounted() {
        // var a = [8,7,9,5,6,4,2,1,3]
        // console.log(sort(a))
    }
};
</script>
