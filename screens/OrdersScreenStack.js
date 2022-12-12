import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "./CategoryScreen";
import SearchScreen from "./SearchScreen";
import OrdersScreen from "./OrdersScreen";
import newServiceScreen from "./newServiceScreen";

const OrdersStack = createNativeStackNavigator();

const OrdersName= "Orders"

export default function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="newService" component={newServiceScreen} /> 
    </OrdersStack.Navigator>
  );
}
