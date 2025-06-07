import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const Register: React.FC = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("sign up", "Please fill all the fields");
      return;
    }
    setLoading(true);
    const respone = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    console.log("register result: ", respone);
    if (!respone.success) {
      Alert.alert("please sign up & get Acess this App", respone.msg);
    }
    setLoading(false);
    console.log("register result: ", respone);
    if (!respone.success) {
      Alert.alert("please sign up & get Acess this App", respone.msg);
    }
  }
  
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* back button */}
        <BackButton iconSize={28} />

        <View style={{ gap: 2, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let&apos;s
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track your expense
          </Typo>
          {/* input */}
          <Input
            placeholder="Enter your Name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter your Email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Sign Up
            </Typo>
          </Button>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15}>
            {" "}
            Already have an account?
            <Pressable onPress={() => router.navigate("/(auth)/login")}>
              <Typo size={15} fontWeight={"700"} color={colors.primary}>
                log in
              </Typo>
            </Pressable>
          </Typo>
        </View>
      </View>
    </ScreenWrapper>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  WelcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});


export default Register;




