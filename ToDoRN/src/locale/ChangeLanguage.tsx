import React, { useState } from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { borderColor } from '../style/color';
import styles from '../style/styles';
import i18n from './i18n'


const ChangeLanguage = () => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  const changeLang = async (language: string) => {
    await i18n.changeLanguage(language);
    setSelected(language)
  };

  const languages = [
    {language : t("english"), value:"en"},
    {language : t("hindi"), value:"hi"}
  ]


  return (
    <View>
      <Text style={styles.labelStyle} >{t("language")}</Text>
      <View style={{borderWidth:1, borderColor:borderColor, borderRadius:10}}>
      <Picker
        selectedValue={selected}        
        onValueChange={(itemValue) => changeLang(itemValue)}>
        {languages.map((lang)=>
          <Picker.Item style={styles.labelStyle} key={lang.value} label={lang.language} value={lang.value} />
        )}
      </Picker>
      </View>
    </View>
  );
};
export default ChangeLanguage;