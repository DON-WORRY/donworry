import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const width = Dimensions.get('screen').width;

interface CardItem {
  cardCompanyName: string;
  cardId: number;
  consumptionTotalPrice: number;
}

interface CardPickerProps {
  cardId: number;
  setCardId: (id: number) => void; // 추가
  cards: CardItem[];
}

export default function CardPicker({ cards, cardId, setCardId }: CardPickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(cardId);  // 초기값 설정
  const [items, setItems] = useState<{ label: string; value: number }[]>([]);
  
  useEffect(() => {
    const newItems = cards.map((card) => ({
      label: card.cardCompanyName,
      value: card.cardId,
    }));
    setItems(newItems);
  }, [cards]);
  
  useEffect(() => {
    if (typeof value === 'number') {
      setCardId(value);
    }
  }, [value]);

  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: width * 0.45,
          paddingHorizontal: 15,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue} 
          setItems={setItems}
          placeholder={'Choose a card.'}
        />
      </View>
    </View>
  );
}