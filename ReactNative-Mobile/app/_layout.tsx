// import { AuthProvider } from "@/contexts/authContext";
// import { Stack } from "expo-router";
// import  React from "react";


// const StackLayout = () => {
//   return <Stack screenOptions={{ headerShown: false }}></Stack>;
// };

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <StackLayout />
//     </AuthProvider>
//   );
// }


// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/authContext'; // Adjust path

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}