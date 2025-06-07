import { auth, firebase } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";

// const AuthContext = createContext<AuthContextType | null>(null);
const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message as string;
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firebase, "user", response?.user?.uid),{
        name,
        email,
        uid: response?.user?.uid,
      });
      return {success: true}
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
   };

   const updateUserData = async (uid: string) =>{
    try {
      const docRef = doc(firebase, "user", uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        const data = docSnap.data();
        const userData: UserType = {
            uid: data?.uid,
            email: data.email || null,
            name: data.name || null,
            image: data.image || null,
        };
        setUser({ ...userData})
      }
      
    } catch (error: any) {
      let msg = error.message;
    //   return { success: false, ShowMessage };
        console.log("error:", error)
    }
   };

   const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
   };

   const contextValue : AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
    logout
   };
   return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
   );
};



export const useAuth = (): AuthContextType =>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error ("useAuth must be wrapped inside AuthProvider")
  }
  return context;
}


// // components/AuthProvider.tsx
// import { auth, firebase } from '@/config/firebase';
// import { AuthContextType, UserType } from '@/types';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const db = getFirestore(firebase); // Use Firestore instance

//   const login = async (email: string, password: string) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       return { success: true };
//     } catch (error: any) {
//       let msg = error.message as string;
//       return { success: false, msg };
//     }
//   };

//   const register = async (email: string, password: string, name: string) => {
//     try {
//       let response = await createUserWithEmailAndPassword(auth, email, password);
//       await setDoc(doc(db, 'user', response?.user?.uid), {
//         name,
//         email,
//         uid: response?.user?.uid,
//       });
//       return { success: true };
//     } catch (error: any) {
//       let msg = error.message;
//       return { success: false, msg };
//     }
//   };

//   const updateUserData = async (uid: string) => {
//     try {
//       const docRef = doc(db, 'user', uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const userData: UserType = {
//           uid: data?.uid,
//           email: data.email || null,
//           name: data.name || null,
//           image: data.image || null,
//         };
//         setUser({ ...userData });
//       }
//     } catch (error: any) {
//       let msg = error.message;
//       console.log('error:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       return { success: true };
//     } catch (error: any) {
//       let msg = error.message;
//       return { success: false, msg };
//     }
//   };

//   const contextValue: AuthContextType = {
//     user,
//     setUser,
//     login,
//     register,
//     updateUserData,
//     logout,
//   };

//   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be wrapped inside AuthProvider');
//   }
//   return context;
// };