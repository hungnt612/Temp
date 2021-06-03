import React, {useState, useContext} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {changeAnswer} from '../redux/action/answerAction';

const data = [
  '1. dưới 10 triệu',
  '2. 10 - 20 triệu',
  '3. 20 - 100 triệu',
  '5. Trên 100 triệu',
];

const Survey2: React.FC<{answers: any; changeAnswer: (data: any) => void}> = ({
  answers,
  changeAnswer,
}) => {
  const {survey2Answer} = answers;
  const navigation = useNavigation();

  const handleCheckBox = (arrange: number) => {
    const isChecked = survey2Answer.find(item => item === data[arrange]);
    let updatedAnswers = {};
    if (!isChecked) {
      //option not chosen
      const array = [...survey2Answer, data[arrange]];
      updatedAnswers = {...answers, survey2Answer: array};
    } else {
      //option was chosen
      updatedAnswers = {
        ...answers,
        survey2Answer: survey2Answer.filter(item => item != data[arrange]),
      };
    }
    AsyncStorage.setItem('answers', JSON.stringify(updatedAnswers)).then(() => {
      changeAnswer(updatedAnswers);
    });
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center'}}>Câu 2:</Text>
      <Text>thu nhập của quý khách:</Text>
      <View>
        {data.map((item, index) => {
          const isChecked = survey2Answer.find(item => item === data[index]);
          return (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleCheckBox(index)}
                style={{
                  width: 30,
                  height: 30,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isChecked && <Text>V</Text>}
              </TouchableOpacity>
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <Button
          title="Prev"
          color="yellow"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Next"
          color="green"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  const {answerReducer} = state;
  return {answers: answerReducer};
};
export default connect(mapStateToProps, {changeAnswer: changeAnswer})(Survey2);
