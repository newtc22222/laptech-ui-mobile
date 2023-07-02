import { StatusBar } from "expo-status-bar";

import AppProvider from "./app/components/context/AppContext";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </AppProvider>
  );
}
