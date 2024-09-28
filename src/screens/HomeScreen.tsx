import {Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Customicons from '../components/Customicons';
import CoffeCard from '../components/CoffeCard';
import BeansData from '../data/BeansData';


                    {/* Catagerios Function */}
const getCategoriesFromData = (data:any) => {
  let temp:any = {};
  for(let i = 0; i < data.length ; i++ ){
    if (temp[data[i].name] == undefined){
      temp[data[i].name] = 1;
    }else {
        temp[data[i].name]++;
      }
    }
  
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};
                     {/* Coffe List Function */}
const getCoffeList = (category :string , data :any) =>{
  if (category == 'All'){
    return data;
  }else{
    let coffelist = data.filter((item:any) => item.name == category);
    return coffelist;
  }
}

const HomeScreen = ({navigation} : any) => {
  const CoffeeList = useStore((state:any) => state.CoffeeList);
  const BeanList = useStore((state:any) => state.BeanList);
  const[categories , setCategories] = useState(
    getCategoriesFromData(CoffeeList));
  const[searchText , setSearchText] = useState('');
  const[categoryIndex , setCategoryIndex] = useState({
    index:0,
    category: categories[0],
  });
  const [sortedCoffe , setSortedCoffe] = useState(
    getCoffeList(categoryIndex.category,CoffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();


  const searchCoffe = (search:string) =>{
    if (search != ''){
      setCategoryIndex({index:0,category:categories[0]});
      setSortedCoffe([
        ...CoffeeList.filter((item:any) => 
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    ]);
    }

  };

  const resetSearchCoffee = () => {
    setCategoryIndex({index:0,category:categories[0]});
      setSortedCoffe([...CoffeeList]);
      setSearchText('');

  }



  return(
     <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView 
       showsVerticalScrollIndicator = {false} 
       contentContainerStyle ={styles.ScrollViewFlex}>
       {/* App Header*/}
       <HeaderBar/>
       <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>
       {/* Search INput */}
       <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={() => {
          searchCoffe(searchText)

        }}>
          <Customicons 
          style = {styles.InputIcon}
          name = 'search' 
          size={FONTSIZE.size_18}
          color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex }/>
        </TouchableOpacity>
        <TextInput 
         placeholder="Find Your Desired Coffe..." 
         value={searchText} 
         onChangeText={text => {
          setSearchText(text);
          searchCoffe(text);
         }}
         placeholderTextColor={COLORS.primaryLightGreyHex}
         style={styles.TextInputContainer}
         />
         {searchText.length > 0 ?(
           <TouchableOpacity onPress={() =>{
            resetSearchCoffee();

           }}>
             <Customicons
             style={styles.InputIcon} 
             name='close' 
             size={FONTSIZE.size_16}
             color={COLORS.primaryLightGreyHex} />
           </TouchableOpacity>
          ) : (
            <></>
          )}
       </View>
       {/* Category Scroller */}
       <ScrollView 
       horizontal
       showsHorizontalScrollIndicator={false}
       contentContainerStyle= {styles.CategoryScrollViewStyle}>
       {categories.map((data,index) => (
        <View
         key={index.toString()} 
          style={styles.CategoryScrollViewContainer}>
          <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => {
            setCategoryIndex({index : index , category:categories[index]});
            setSortedCoffe([
              ...getCoffeList(categories[index],CoffeeList)]
            );
          }}>
            <Text 
            style ={[ 
            styles.CategoryText ,
            categoryIndex.index == index ?{color:COLORS.primaryOrangeHex} :{}]}>{data}</Text>
            {categoryIndex.index == index ? <View style={styles.ActiveCategory} />:<></>}
          </TouchableOpacity>
        </View>
       ))}
       </ScrollView>
       {/* Coffe Flat List */}
       <FlatList 
         horizontal
         ListEmptyComponent={
          <View style = {styles.EmpltyListContainer}>
            <Text> No COffee Available</Text>

          </View>
         }
         showsHorizontalScrollIndicator ={false}
         data = {sortedCoffe}
         contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}
         keyExtractor={item => item.id}
         renderItem={({item}) =>{
          return ( 
           <TouchableOpacity onPress={() => {
            navigation.push('Details')
           }}>
             <CoffeCard 
             id={item.id}
             index={item.index}
             type={item.type}
             rosted={item.rosted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             price={item.prices[1]}
             buttonPressHandler={() =>{}}
             />
           </TouchableOpacity>
          );
         }}
       />
       <Text style={styles.CoffeBeansTitle}>Coffe Beans</Text>
       {/*  Beans Flat List*/}
       <FlatList 
         horizontal
         showsHorizontalScrollIndicator ={false}
         data = {BeansData}
         contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}
         keyExtractor={item => item.id}
         renderItem={({item}) =>{
          return ( 
           <TouchableOpacity onPress={() => {
            navigation.push('Details')
           }}>
             <CoffeCard 
             id={item.id}
             index={item.index}
             type={item.type}
             rosted={item.roasted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             price={item.prices[2]}
             buttonPressHandler={() =>{}}
             />
           </TouchableOpacity>
          );
         }}
       />

      </ScrollView>
     </View>
  );  
};



const styles = StyleSheet.create({
  ScreenContainer :{
    flex:1,
    backgroundColor :COLORS.primaryBlackHex,
  },
  ScrollViewFlex :{
    flexGrow:1,
  },
  ScreenTitle:{
    fontSize:FONTSIZE.size_28,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingTop:1,
    paddingLeft:35,
    paddingBottom:1

  },
  TextInputContainer:{
    flex:1,
    height:SPACING.space_20 * 3,
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,

  },
  InputIcon:{
    marginHorizontal:SPACING.space_20,

  },
  InputContainerComponent:{
    flexDirection:'row',
    alignItems:'center',
    margin:SPACING.space_30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryDarkGreyHex,
  },
  CategoryScrollViewStyle:{
    paddingHorizontal:SPACING.space_20,
    marginBottom: SPACING.space_20,

  },
  CategoryText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryLightGreyHex,
    marginBottom:SPACING.space_4,


  },
  ActiveCategory:{
    height:SPACING.space_10,
    width:SPACING.space_10,
    borderRadius:BORDERRADIUS.radius_10,
    backgroundColor:COLORS.primaryOrangeHex,

  },
  CategoryScrollViewContainer:{
    paddingHorizontal:SPACING.space_15,
  },
  CategoryScrollViewItem:{
    alignItems:'center',
  },
  FlatListContainer:{
    gap:SPACING.space_20,
    paddingVertical:SPACING.space_2,
    paddingHorizontal:SPACING.space_30,

  },
  CoffeBeansTitle:{
    fontSize:FONTSIZE.size_18,
    marginLeft:SPACING.space_36,
    paddingTop:SPACING.space_2,
    /*marginTop:SPACING.space_10, */
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex,
  },
  EmpltyListContainer:{
    width:Dimensions.get('window').width - SPACING.space_30 *2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:SPACING.space_36*3.6,
    
    

  }
  



  

})

export default HomeScreen