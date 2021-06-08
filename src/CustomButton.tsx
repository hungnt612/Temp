import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';

type ButtonType = {
    label: string;
    colorCode: string;
    onPress: (val: any) => void;
};

const CustomButton: React.FC<ButtonType> = ({label, colorCode, onPress}) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(label)}
            style={{
                height: 60,
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: colorCode,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
