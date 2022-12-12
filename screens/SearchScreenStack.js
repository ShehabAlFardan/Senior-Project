import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "./CategoryScreen";
import SearchScreen from "./SearchScreen";
import ServiceScreen from "./ServiceScreen";
import ServiceProceedScreen from "./ServiceProceedScreen";
import CheckoutScreen from "./CheckoutSceen";

const SearchStack = createNativeStackNavigator();

const SearchName= "Search"

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator initialRouteName={SearchName} >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Category" component={CategoryScreen} />
      <SearchStack.Screen name="Service" component={ServiceScreen} />
      <SearchStack.Screen name="ServiceProceed" component={ServiceProceedScreen} />
      <SearchStack.Screen name="Checkout" component={CheckoutScreen} />
    </SearchStack.Navigator>
  );
}
