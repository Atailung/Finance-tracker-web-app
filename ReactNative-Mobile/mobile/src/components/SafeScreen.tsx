import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from "../constants/colors"

const SafeScreen: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            {children}
        </SafeAreaView>
    )
}

export default SafeScreen

