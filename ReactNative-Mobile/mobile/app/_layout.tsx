import { Slot } from "expo-router";
// import SafeScreen from "../src/components/SafeScreen"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_bW9kZXN0LWxpZ2VyLTMwLmNsZXJrLmFjY291bnRzLmRldiQ'}>
   

        <Slot />
    
  </ClerkProvider>
  )

}


