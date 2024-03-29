import React, { useRef, useState } from 'react';
import { Modal, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { addItem, toggleAddModal } from "../redux/reducers/items-reducer/itemsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { Box, Text, theme } from './Theme';
import { useFormik } from "formik";
import { RadioButton } from 'react-native-paper';

import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { itemsAPI, usersAPI } from '../redux/api/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
const token = AsyncStorage.getItem('userToken');

const ModalSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().min(2, 'Too short!').required('required')
});

const { height } = Dimensions.get('screen')

const AddModalForm = () => {
  const dispatch = useDispatch();
  let visible: boolean = useSelector((state: RootState) => state.items.showAddModal);
  const [checked, setChecked] = useState<string>('first');

  const description = useRef<TextInput>(null);
  const position = useRef<TextInput>(null);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: { name: "", description: '', position: "", sector: "" },
    validationSchema: ModalSchema,
    onSubmit: async (values) => {
      const itemId = await itemsAPI.getlastId();
      dispatch(addItem({ ...values, id: itemId.data.id + 1 }));
      dispatch(toggleAddModal());
      
      const title = "добавил";
      const content = values.name + " " + values.description + " [" + values.position + "(" + values.sector + ")" + "]";
      const userId = await AsyncStorage.getItem('userId');
      let config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token._W)
        }
      }
      try {

        const resp = await usersAPI.createPost(title, content, userId, config);
      } catch (e) {
        console.log(e);
      }
    }
  });

  return (
    <Modal visible={visible}
      animationType={"slide"}
      transparent={false}
      onRequestClose={() => dispatch(toggleAddModal())}>
      <Box
        style={{ marginTop: height / 6 }}
        justifyContent={"center"}
        flex={1}>
        <KeyboardAwareScrollView>
          <Box marginBottom={"m"} marginHorizontal={"l"}>

            <Box marginBottom={"m"}>
              <Text variant={"title1"}>Форма добавления</Text>
            </Box>

            <Text variant={"title2"}>название</Text>
            <Box borderColor={"secondary"} borderWidth={StyleSheet.hairlineWidth * 0.7} borderRadius={"m"}
              padding={"s"}>
              <TextInput
                placeholder={"mk-254"}
                onChangeText={handleChange("name")}
                onEndEditing={handleBlur("name")}
                autoCapitalize={"none"}
                onSubmitEditing={() => description.current?.focus()} />
            </Box>

            <Box marginTop={"s"}>
              <Text variant={"title2"}>описание</Text>
              <Box borderColor={"secondary"} borderWidth={StyleSheet.hairlineWidth * 0.7} borderRadius={"m"}
                padding={"s"}>
                <TextInput
                  ref={description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  placeholder={"25-42 моторный блок"}
                  returnKeyType={"go"}
                  returnKeyLabel={"go"}
                  onSubmitEditing={() => position.current?.focus()}
                />
              </Box>
            </Box>

            <Box marginTop={"s"}>
              <Text variant={"title2"}>сектор</Text>
              <Box flexDirection={"row"} alignItems={"center"}>
                <Text variant={"body"}>A</Text>
                <RadioButton value={"A"} onPress={() => {
                  setChecked('A');
                  setFieldValue("sector", "A");
                }} status={checked === 'A' ? 'checked' : 'unchecked'} />
                <Text variant={"body"}>B</Text>
                <RadioButton value={"B"} onPress={() => {
                  setChecked('B');
                  setFieldValue("sector", "B");
                }} status={checked === 'B' ? 'checked' : 'unchecked'} />
                <Text variant={"body"}>C</Text>
                <RadioButton value={"C"} onPress={() => {
                  setChecked('C')
                  setFieldValue("sector", "C");
                }
                } status={checked === 'C' ? 'checked' : 'unchecked'} />
              </Box>
            </Box>

            <Box marginTop={"s"}>
              <Text variant={"title2"}>позиция</Text>
              <Box borderColor={"secondary"} borderWidth={StyleSheet.hairlineWidth * 0.7} borderRadius={"m"}
                padding={"s"}>
                <TextInput
                  ref={position}
                  onChangeText={handleChange("position")}
                  onBlur={handleBlur("position")}
                  placeholder={"A2-F14"}
                  returnKeyType={"go"}
                  returnKeyLabel={"go"}
                />
              </Box>
            </Box>

          </Box>

          <Box alignItems={"center"} marginTop={"s"}>
            {/*@ts-ignore TODO */}
            <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={handleSubmit}>
              <Text variant={"button"} color={"white"}>Добавить</Text>
            </TouchableOpacity>
          </Box>
        </KeyboardAwareScrollView>
      </Box>

    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 50,
    width: 245,
    backgroundColor: theme.colors.primary_analogue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: "white"
  }
})

export default AddModalForm;
