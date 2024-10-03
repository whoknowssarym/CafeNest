import {create} from 'zustand';
import {produce} from 'immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';


export const useStore = create(
    persist((set,get) => ({
        CoffeeList:CoffeeData,
        BeanList:BeansData,
        CartPrice: 0,
        FavouriteList:[],
        CartList:[],
        OrderHistoryList :[],
        /* Add To Cart Function  */
        addToCart:(cartItem : any) => set(produce(state => {
            let found  = false;
            for (let i = 0;i<state.CartList.length;i++){
                if(state.CartList[i].id == cartItem){
                    found = true;
                    let size = false;
                    for(let j = 0 ; j<state.CartList[i].prices.length;j++){
                        if(state.CartList[i].prices[j].size == cartItem.prices[0].size){
                            size = true;
                            state.CartList[i].prices[j].quantity++;
                            break;
                        }
                    }
                    if (size == false){
                        state.CartList[i].prices.push(cartItem.prices[0]);
                    }
                    state.CartList[i].prices.sort((a:any,b:any) => {
                        if (a.size > b.size){
                            return -1;
                        }
                        if (a.size <b.size){
                            return 1;
                        }
                        return 0;
                    })
                    break;
                }

            }
            if (found == false){
                state.CartList.push(cartItem);
            }
     }),
    ),
          /* Calculate Price Method  */
    calculateCartPrice:() => set(produce(state => {
        let totalprice = 0 ;
        for (let i = 0; i < state.CartList.length;i++){
            let tempPrice = 0;
            for(let j = 0 ; j <state.CartList[i].prices.length;j++){
                tempPrice = tempPrice + parseFloat(state.CartList[i].prices[j].price)
                * state.CartList[i].prices[j].quantity;
            }
            state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
            totalprice = totalprice + tempPrice;
        }
        state.CartPrice = totalprice.toFixed(2).toString();
    }),
   ),
   addToFavouriteList: (type: string, id: string) => set(produce(state => {
    if (type === "Coffee") {  // Fix comparison
        for (let i = 0; i < state.CoffeeList.length; i++) {
            if (state.CoffeeList[i].id === id) {  // Fix comparison
                if (!state.CoffeeList[i].favourite) {
                    state.CoffeeList[i].favourite = true;  // Fix assignment
                    state.FavouriteList.unshift(state.CoffeeList[i]);
                }
                break;
            }
        }
    } else if (type === "bean") {  // Fix comparison
        for (let i = 0; i < state.BeanList.length; i++) {
            if (state.BeanList[i].id === id) {  // Fix comparison
                if (!state.BeanList[i].favourite) {
                    state.BeanList[i].favourite = true;  // Fix assignment
                    state.FavouriteList.unshift(state.BeanList[i]);
                }
                break;
            }
        }
    }
    })),

    deleteFromFavouriteList: (type: string, id: string) => set(produce(state => {
        if (type === "Coffee") {  // Fix comparison
            for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {  // Fix comparison
                    if (state.CoffeeList[i].favourite) {
                        state.CoffeeList[i].favourite = false;  // Fix assignment
                    }
                    break;
                }
            }
        } else if (type === "bean") {  // Fix comparison
            for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {  // Fix comparison
                    if (state.BeanList[i].favourite) {
                        state.BeanList[i].favourite = false;  // Fix assignment
                    }
                    break;
                }
            }
        }
    
        let spliceIndex = -1;
        for (let i = 0; i < state.FavouriteList.length; i++) {
            if (state.FavouriteList[i].id === id) {
                spliceIndex = i;
                break;
            }
        }
        if (spliceIndex !== -1) {
            state.FavouriteList.splice(spliceIndex, 1);
        }
    })),
    

    }),
    {
        name:'CafeNest',
        storage:createJSONStorage(() => AsyncStorage),
    },
    ),
);
