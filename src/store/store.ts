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
    }),
    {
        name:'CafeNest',
        storage:createJSONStorage(() => AsyncStorage),
    },
    ),
);
