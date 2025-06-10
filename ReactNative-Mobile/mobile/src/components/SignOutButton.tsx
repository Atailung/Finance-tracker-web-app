import { styles } from '@/assets/styles/auth.styles'
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, View } from 'react-native'

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <View style = {styles.container}>

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText} >Sign out</Text>
        </TouchableOpacity>
        </View>
    )
}