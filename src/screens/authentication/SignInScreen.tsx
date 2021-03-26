import React, {useRef} from "react";
import {TextInput as RNTextInput} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {AuthenticationRoutes, StackNavigatorProps} from "../../components/Navigation";
import Container from '../../components/Container';
import Button from "../../components/Button";
import {Box, Text} from "../../components/Theme";
import {TextInput} from "../../components/TextInput";
import {Checkbox} from "../../components/CheckBox";
import Footer from "../../components/Footer";

import {login} from "../../redux/actions/authActions";

const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

});


const SignInScreen = ({navigation}: StackNavigatorProps<AuthenticationRoutes, "SignInScreen">) => {
  const dispatch = useDispatch();

  const footer = (
    <Footer title={"If you don`t have a account"}
            action={"Sign Up"}
            onPress={() => navigation.navigate('SignUpScreen')}/>
  )

  const password = useRef<RNTextInput>(null);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {email: "", password: '', remember: true},
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log(values);
      // TODO firebase authentication check
      dispatch(login({email: values.email, userToken: values.email + Date.now().toString()}));
    }
  });

  return (
    <Container {...{footer}} >
      <Box padding={"l"} marginBottom={"l"}
           alignItems={"stretch"} justifyContent={"center"}>

        <Text variant={"title1"}
              textAlign={"center"}
              marginBottom={"m"}>
          Welcome Back
        </Text>
        <Text variant={"body"}
              textAlign={"center"}
              marginBottom={"l"}>
          Use your credentials below and login to your account
        </Text>


        <Box marginTop={"l"}>
          <Box marginBottom={"m"}>
            <TextInput icon={"mail"}
                       placeholder={"enter your email adress"}
                       onChangeText={handleChange("email")}
                       onBlur={handleBlur("email")}
                       error={errors.email}
                       touched={touched.email}
                       autoCapitalize={"none"}
                       autoCompleteType={"email"}
                       onSubmitEditing={() => password.current?.focus()}/>
          </Box>

          <TextInput icon={"lock"}
                     onChangeText={handleChange("password")}
                     onBlur={handleBlur("password")}
                     placeholder={"Enter your password"}
                     error={errors.password}
                     touched={touched.password}
                     secureTextEntry
                     returnKeyType={"go"}
                     returnKeyLabel={"go"}
                     onSubmitEditing={() => handleSubmit()}
          />

          <Box marginVertical={"m"}
               flexDirection={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            <Checkbox label={"remember me"}
                      checked={values.remember}
                      onChange={() => setFieldValue("remember", !values.remember)}/>

            <RectButton onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text variant={"button"} color={"primary"}> Forgot password?</Text>
            </RectButton>
          </Box>

          <Box alignItems={"center"} marginTop={"xl"}>
            <Button variant={"primary"}
                    onPress={handleSubmit}
                    label={"Log into your account"}
            />

          </Box>
        </Box>
      </Box>

    </Container>
  )
}

export default SignInScreen;
