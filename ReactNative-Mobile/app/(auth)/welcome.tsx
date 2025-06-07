// import Button from "@/components/Button";
// import ScreenWrapper from "@/components/ScreenWrapper";
// import Typo from "@/components/Typo";
// import { colors, spacingX, spacingY } from "@/constants/theme";
// import { verticalScale } from "@/utils/styling";
// import React from "react";
// import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
// import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

// const Welcome = () => {
//   return (
//     <ScreenWrapper>
//       <View style={styles.container}>
//         {/* login button */}
//         <TouchableOpacity style={styles.loginButton}>
//           <Typo fontWeight="500">Sign in</Typo>
//         </TouchableOpacity>

//         <Animated.Image
//           entering={FadeIn.duration(500)}
//           source={require("../../assets/images/welcome.png")}
//           style={styles.welcomeImage}
//           resizeMode="contain"
//         />
//       </View>
//       {/* footer */}
//       <View style={styles.footer}>
//         <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)} style={{ alignItems: "center" }}>
//           <Typo size={30} fontWeight="800">Always take control</Typo>
//           <Typo size={30} fontWeight="800">of your finances</Typo>
//         </Animated.View>
//         <Animated.View entering={FadeInDown.duration(1000).delay(200).springify().damping(12)} style={{ alignItems: "center", gap: 2 }}>
//           <Typo size={17} color={colors.textLight}>Always take control</Typo>
//           <Typo size={17} color={colors.textLight}>of your finances</Typo>
//         </Animated.View>
//         <Animated.View entering={FadeInUp.duration(1000).delay(300).springify().damping(12)} style={styles.buttonContainer}>
//           <Button>
//             <Typo size={22} color={colors.neutral900} fontWeight="600">Get Started</Typo>
//           </Button>
//         </Animated.View>
//       </View>
//     </ScreenWrapper>
//   );
// };

// export default Welcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//     paddingTop: spacingY._7,
//   },
//   welcomeImage: {
//     width: "100%",
//     height: verticalScale(300),
//     alignSelf: "center",
//     marginTop: verticalScale(100),
//   },
//   loginButton: {
//     alignSelf: "flex-end",
//     marginRight: spacingX._20,
//   },
//   footer: {
//     backgroundColor: colors.neutral900,
//     alignItems: "center",
//     paddingTop: verticalScale(30),
//     paddingBottom: verticalScale(45),
//     gap: spacingY._20,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#fff",
//         shadowOffset: { width: 0, height: -10 },
//         shadowOpacity: 0.15,
//         shadowRadius: 25,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//   },
//   buttonContainer: {
//     width: "100%",
//     paddingHorizontal: spacingX._10, // Adjusted padding
//   },
// });



import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Platform, Dimensions } from "react-native";
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp, 
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay
} from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');

const Welcome = () => {
  const router = useRouter();
  const imageScale = useSharedValue(0.8);
  const imageOpacity = useSharedValue(0);

  React.useEffect(() => {
    imageScale.value = withDelay(300, withSpring(1, { damping: 15, stiffness: 100 }));
    imageOpacity.value = withDelay(300, withSpring(1));
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
    opacity: imageOpacity.value,
  }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header with Sign In Button */}
        <Animated.View 
          entering={SlideInRight.duration(800).springify()}
          style={styles.header}
        >
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.7} onPress={() => router.push("/(auth)/login")}>
            <View style={styles.loginButtonInner}>
              <Typo fontWeight="600" size={16} color={colors.primary}>
                Sign in
              </Typo>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Welcome Image with Enhanced Animation */}
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.imageBackground, animatedImageStyle]}>
            <LinearGradient
              colors={[colors.primary + '10', colors.primary + '10']}
              style={styles.imageGradient}
            />
          </Animated.View>
          <Animated.Image
            entering={FadeIn.duration(800).delay(200)}
            source={require("../../assets/images/welcome.png")}
            style={[styles.welcomeImage, animatedImageStyle]}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Enhanced Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={[colors.neutral900 + '00', colors.neutral900]}
          style={styles.footerGradient}
        />
        
        {/* Main Title */}
        <Animated.View 
          entering={FadeInDown.duration(1000).springify().damping(12)} 
          style={styles.titleContainer}
        >
          <Typo size={32} fontWeight="800" color={colors.white} style={styles.titleText}>
            Always take control
          </Typo>
          <Typo size={32} fontWeight="800" color={colors.white} style={styles.titleText}>
            of your{' '}
            <Typo size={32} fontWeight="800" color={colors.primary}>
              finances
            </Typo>
          </Typo>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(200).springify().damping(12)} 
          style={styles.subtitleContainer}
        >
          <Typo size={17} color={colors.textLight} style={styles.subtitleText}>
            Take charge of your financial future with smart
          </Typo>
          <Typo size={17} color={colors.textLight} style={styles.subtitleText}>
            budgeting and expense tracking tools
          </Typo>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View 
          entering={FadeInUp.duration(1000).delay(400).springify().damping(12)} 
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.getStartedButton} activeOpacity={0.9} onPress={() => router.push("/(auth)/register")}>
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Typo size={18} color={colors.white} fontWeight="700">
                Get Started
              </Typo>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Optional: Add some decorative elements */}
        <Animated.View 
          entering={FadeIn.duration(1500).delay(600)}
          style={styles.decorativeElements}
        >
          <View style={[styles.dot, { backgroundColor: colors.primary + '30' }]} />
          <View style={[styles.dot, { backgroundColor: colors.primary + '50' }]} />
          <View style={[styles.dot, { backgroundColor: colors.primary + '20' }]} />
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacingY._7,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: spacingX._20,
    marginBottom: spacingY._10,
  },
  loginButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  loginButtonInner: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
    backgroundColor: colors.primary + '15',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: screenWidth * 0.4,
    overflow: 'hidden',
  },
  imageGradient: {
    flex: 1,
    borderRadius: screenWidth * 0.4,
  },
  welcomeImage: {
    width: screenWidth * 0.75,
    height: verticalScale(320),
    zIndex: 1,
  },
  footer: {
    position: 'relative',
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(50),
    paddingHorizontal: spacingX._20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -15 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  footerGradient: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    height: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacingY._15,
  },
  titleText: {
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: spacingY._25,
    paddingHorizontal: spacingX._10,
  },
  subtitleText: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX._5,
  },
  getStartedButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: verticalScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeElements: {
    flexDirection: 'row',
    marginTop: spacingY._20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});