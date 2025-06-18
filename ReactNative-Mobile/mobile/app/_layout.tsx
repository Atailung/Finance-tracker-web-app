import React from 'react';
import { Slot } from "expo-router";
// import SafeScreen from "../src/components/SafeScreen"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

// Your Clerk publishable key
const CLERK_PUBLISHABLE_KEY = 'pk_test_bW9kZXN0LWxpZ2VyLTMwLmNsZXJrLmFjY291bnRzLmRldiQ';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ClerkProvider 
        tokenCache={tokenCache} 
        publishableKey={CLERK_PUBLISHABLE_KEY}
      >
        <StatusBar style="auto" />
        <Slot />
      </ClerkProvider>
    </SafeAreaProvider>
  )
}


