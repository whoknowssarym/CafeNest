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
   addToFavourateList :(type : string , id : string) => set(produce(state => {
    if (type = "Coffe"){
        for(let i = 0 ; i<state.CoffeeList.length;i++){
            if(state.CoffeeList[i].id == id){
                if(state.CoffeeList[i].favourite == false){
                    state.CoffeeList[i].favourite == true;
                    state.FavouriteList.unshift(state.CoffeeList[i]);
                }
                break;
            }
        }
    }else if (type = "bean"){
        for(let i = 0 ; i<state.BeanList.length;i++){
            if(state.beanList[i].id == id){
                if(state.beanList[i].favourite == false){
                    state.beanList[i].favourite == true;
                    state.FavouriteList.unshift(state.beanList[i]);
                }
                break;
            }
        }
    }
   } )),
   deleteFromFavouriteList : (type : string , id : string ) => set(produce(state => {
    if (type == "Coffe" ){
        for(let i = 0 ; i<state.CoffeeList.length;i++){
            if(state.CoffeeList[i].id == id){
                if(state.CoffeeList[i].favourite == true){
                    state.CoffeeList[i].favourite == false;
                    
                }
                break;
            }
        }
    }else if (type = "beans"){
        for(let i = 0 ; i<state.BeanList.length;i++){
            if(state.beanList[i].id == id){
                if(state.beanList[i].favourite == true){
                    state.beanList[i].favourite == false;
                }
                break;
            }
        }
    }
    let spliceIndex = -1;
    for (let i = 0 ; i<state.FavouriteList.length;i++){
        if (state.FavouriteList[i].id == id){
            spliceIndex = i;
            break;
        }
    }
    state.FavouriteList.splice(spliceIndex,1);
   }),),

    }),
    {
        name:'CafeNest',
        storage:createJSONStorage(() => AsyncStorage),
    },
    ),
);
