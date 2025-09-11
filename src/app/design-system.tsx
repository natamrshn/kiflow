import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from '../components/ui/safe-area-view';
import { ThemedText } from '../components/ui/ThemedText';

// Палитра приложения
const AppPalette = {
  // Основные цвета
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  }
};

// Компонент для отображения цветового блока
const ColorBlock = ({ color, name, hex }: { color: string; name: string; hex: string }) => (
  <View style={{ marginBottom: 16 }}>
    <View
      style={{
        width: 80,
        height: 80,
        backgroundColor: color,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
      }}
    />
    <Text style={{ fontSize: 12, fontWeight: '600', color: '#1E293B' }}>{name}</Text>
    <Text style={{ fontSize: 10, color: '#64748B' }}>{hex}</Text>
  </View>
);

// Вариант 1: Минималистичные компоненты
const MinimalistInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderBottomColor: '#E2E8F0',
      paddingVertical: 12,
      marginBottom: 16,
    }}
  >
    <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{placeholder}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={{
        fontSize: 16,
        color: '#1E293B',
        padding: 0,
      }}
      placeholderTextColor="#94A3B8"
    />
  </View>
);

// Альтернативный минималистичный инпут
const MinimalistInputAlt = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[200],
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const MinimalistButton = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: variant === 'primary' ? AppPalette.black : variant === 'gray' ? AppPalette.gray[300] : 'transparent',
      borderWidth: variant === 'secondary' ? 2 : variant === 'gray' ? 1 : 0,
      borderColor: variant === 'secondary' ? AppPalette.black : variant === 'gray' ? AppPalette.gray[300] : 'transparent',
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: variant === 'primary' ? AppPalette.black : variant === 'secondary' ? AppPalette.gray[400] : 'transparent',
      shadowOffset: { width: 0, height: variant === 'primary' ? 6 : variant === 'secondary' ? 4 : 0 },
      shadowOpacity: variant === 'primary' ? 0.25 : variant === 'secondary' ? 0.15 : 0,
      shadowRadius: variant === 'primary' ? 12 : variant === 'secondary' ? 8 : 0,
      elevation: variant === 'primary' ? 8 : variant === 'secondary' ? 4 : 0,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.white : variant === 'gray' ? AppPalette.gray[800] : AppPalette.black,
        fontSize: 16,
        fontWeight: variant === 'secondary' ? '700' : '600',
        textAlign: 'center',
        letterSpacing: variant === 'secondary' ? 0.8 : 0.5,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Альтернативная минималистическая кнопка
const MinimalistButtonAlt = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: variant === 'primary' ? AppPalette.black : variant === 'gray' ? AppPalette.gray[200] : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: variant === 'secondary' ? AppPalette.black : 'transparent',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 6,
      marginBottom: 12,
      transform: [{ scale: pressed ? 0.99 : 1 }],
      opacity: pressed ? 0.95 : 1,
    })}
  >
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.white : variant === 'gray' ? AppPalette.gray[700] : AppPalette.black,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.3,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Варіант 4: Компоненти з gray-50 & gray-900
const MinimalistInputGray = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[900],
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: AppPalette.gray[50],
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.gray[900],
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[500]}
    />
  </View>
);

const MinimalistButtonGray = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: variant === 'primary' ? AppPalette.gray[900] : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: AppPalette.gray[900],
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 12,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.gray[50] : AppPalette.gray[900],
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Варіант 5: Компоненти з gray-100 & gray-800
const MinimalistInputGray100 = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[800],
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: AppPalette.gray[100],
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.gray[800],
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[500]}
    />
  </View>
);

const MinimalistButtonGray100 = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: variant === 'primary' ? AppPalette.gray[800] : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: AppPalette.gray[800],
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 12,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.gray[100] : AppPalette.gray[800],
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Варіант 6: Компоненти з gray-200 & gray-700
const MinimalistInputGray200 = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[700],
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: AppPalette.gray[200],
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.gray[700],
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[500]}
    />
  </View>
);

const MinimalistButtonGray200 = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: variant === 'primary' ? AppPalette.gray[700] : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: AppPalette.gray[700],
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 12,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.gray[200] : AppPalette.gray[700],
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Варіант 7: Сучасні компоненти з градієнтами та ефектами
const ModernInputGradient = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 16,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 16,
      backgroundColor: AppPalette.white,
      shadowColor: AppPalette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      position: 'relative',
    }}
  >
    <View
      style={{
        position: 'absolute',
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        borderRadius: 16,
        backgroundColor: AppPalette.gray[300],
        zIndex: -1,
      }}
    />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.black,
        padding: 0,
        fontWeight: '500',
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const ModernButtonGradient = ({ title, onPress, variant = 'primary' }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      paddingVertical: 18,
      paddingHorizontal: 32,
      borderRadius: 16,
      marginBottom: 12,
      transform: [{ scale: pressed ? 0.96 : 1 }],
      opacity: pressed ? 0.9 : 1,
      position: 'relative',
      overflow: 'hidden',
    })}
  >
    {/* Градієнтний фон для основної кнопки */}
    {variant === 'primary' && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: AppPalette.black,
          borderRadius: 16,
        }}
      />
    )}
    
    {/* Тінь для основної кнопки */}
    {variant === 'primary' && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          shadowColor: AppPalette.black,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}
      />
    )}
    
    {/* Рамка для вторинної кнопки */}
    {variant === 'secondary' && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderWidth: 2,
          borderColor: AppPalette.black,
          borderRadius: 16,
          backgroundColor: 'transparent',
        }}
      />
    )}
    
    {/* Тінь для вторинної кнопки */}
    {variant === 'secondary' && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          shadowColor: AppPalette.gray[400],
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 8,
        }}
      />
    )}
    
    <Text
      style={{
        color: variant === 'primary' ? AppPalette.white : AppPalette.black,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Розміри компонентів для мобільних
// Розмір 1: Компактний
const CompactInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[300],
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 12,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 14,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const CompactButton = ({ title, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: AppPalette.black,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 6,
      marginBottom: 8,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: AppPalette.white,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Розмір 2: Стандартний
const StandardInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[300],
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 12,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const StandardButton = ({ title, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: AppPalette.black,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 8,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: AppPalette.white,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Розмір 3: Зручний
const ComfortableInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[300],
      borderRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 18,
      marginBottom: 12,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 16,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const ComfortableButton = ({ title, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: AppPalette.black,
      paddingVertical: 16,
      paddingHorizontal: 28,
      borderRadius: 10,
      marginBottom: 8,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: AppPalette.white,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Розмір 4: Великий
const LargeInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[300],
      borderRadius: 12,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 12,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 18,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const LargeButton = ({ title, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: AppPalette.black,
      paddingVertical: 18,
      paddingHorizontal: 32,
      borderRadius: 12,
      marginBottom: 8,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: AppPalette.white,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </Pressable>
);

// Розмір 5: Максимальний
const MaxInput = ({ placeholder, value, onChangeText }: any) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: AppPalette.gray[300],
      borderRadius: 14,
      paddingVertical: 20,
      paddingHorizontal: 22,
      marginBottom: 12,
      backgroundColor: AppPalette.white,
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        fontSize: 20,
        color: AppPalette.black,
        padding: 0,
      }}
      placeholderTextColor={AppPalette.gray[400]}
    />
  </View>
);

const MaxButton = ({ title, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: AppPalette.black,
      paddingVertical: 20,
      paddingHorizontal: 36,
      borderRadius: 14,
      marginBottom: 8,
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Text
      style={{
        color: AppPalette.white,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
      }}
    >
      {title}
    </Text>
  </Pressable>
);


export default function DesignSystemScreen() {
  const [minimalistInput, setMinimalistInput] = useState('');
  const [modernInput, setModernInput] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Refs для скроллов
  const scrollView1Ref = useRef<ScrollView>(null);
  const scrollView2Ref = useRef<ScrollView>(null);
  const scrollView3Ref = useRef<ScrollView>(null);
  
  // Функция для обработки скролла
  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const itemHeight = (contentSize.height - layoutMeasurement.height) / 8; // 8 уроков
    const newSlide = Math.round(scrollY / itemHeight);
    
    if (newSlide !== currentSlide && newSlide >= 0 && newSlide < 8) {
      setCurrentSlide(newSlide);
    }
  };
  
  // Функция для прокрутки к определенному слайду
  const scrollToSlide = (slideIndex: number) => {
    const itemHeight = 280; // Примерная высота одного урока
    const scrollY = slideIndex * itemHeight;
    
    scrollView1Ref.current?.scrollTo({ y: scrollY, animated: true });
    scrollView2Ref.current?.scrollTo({ y: scrollY, animated: true });
    scrollView3Ref.current?.scrollTo({ y: scrollY, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppPalette.white }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={{ flex: 1, padding: 20 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
        <ThemedText type="title" style={{ marginBottom: 24, textAlign: 'center' }}>
          Дизайн-система Kiflow
        </ThemedText>

        {/* Палитра цветів */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Палітра додатку
        </ThemedText>
        
        <View style={{ marginBottom: 32 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12 }}>
            Основні кольори
          </ThemedText>
          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 20 }}>
            <ColorBlock color={AppPalette.black} name="Чорний" hex={AppPalette.black} />
            <ColorBlock color={AppPalette.white} name="Білий" hex={AppPalette.white} />
          </View>

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12 }}>
            Сірі відтінки
          </ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {Object.entries(AppPalette.gray).map(([key, value]) => (
              <ColorBlock key={key} color={value} name={`Gray ${key}`} hex={value} />
            ))}
          </View>

        </View>

        {/* Варіант 1: Мінімалістичні компоненти */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 1: Мінімалістичний стиль (підкреслення)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <MinimalistInput
            placeholder="Ім'я користувача"
            value={minimalistInput}
            onChangeText={setMinimalistInput}
          />
          <MinimalistInput
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <MinimalistButton title="Основна кнопка" onPress={() => {}} />
          <MinimalistButton title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 2: Мінімалістичний стиль (рамка) */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 2: Мінімалістичний стиль (рамка)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <MinimalistInputAlt
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <MinimalistInputAlt
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <MinimalistButtonAlt title="Основна кнопка" onPress={() => {}} />
          <MinimalistButtonAlt title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 3: Гібридний стиль */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 3: Гібридний стиль (кнопки з 1-го, інпути з 2-го)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу (з варіанту 2)
          </ThemedText>
          <MinimalistInputAlt
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <MinimalistInputAlt
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки (з варіанту 1)
          </ThemedText>
          <MinimalistButton title="Основна кнопка" onPress={() => {}} />
          <MinimalistButton title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 4: Мінімалістичний стиль (gray-50 & gray-900) */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 4: Мінімалістичний стиль (gray-50 & gray-900)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <MinimalistInputGray
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <MinimalistInputGray
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <MinimalistButtonGray title="Основна кнопка" onPress={() => {}} />
          <MinimalistButtonGray title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 5: Мінімалістичний стиль (gray-100 & gray-800) */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 5: Мінімалістичний стиль (gray-100 & gray-800)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <MinimalistInputGray100
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <MinimalistInputGray100
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <MinimalistButtonGray100 title="Основна кнопка" onPress={() => {}} />
          <MinimalistButtonGray100 title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 6: Мінімалістичний стиль (gray-200 & gray-700) */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 6: Мінімалістичний стиль (gray-200 & gray-700)
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <MinimalistInputGray200
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <MinimalistInputGray200
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <MinimalistButtonGray200 title="Основна кнопка" onPress={() => {}} />
          <MinimalistButtonGray200 title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Варіант 7: Сучасний стиль з градієнтами та ефектами */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіант 7: Сучасний стиль з градієнтами та ефектами
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Поля вводу
          </ThemedText>
          <ModernInputGradient
            placeholder="Ім'я користувача"
            value={modernInput}
            onChangeText={setModernInput}
          />
          <ModernInputGradient
            placeholder="Email"
            value=""
            onChangeText={() => {}}
          />

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16, marginTop: 8 }}>
            Кнопки
          </ThemedText>
          <ModernButtonGradient title="Основна кнопка" onPress={() => {}} />
          <ModernButtonGradient title="Вторинна кнопка" variant="secondary" onPress={() => {}} />
        </View>

        {/* Розміри компонентів для мобільних */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Розміри компонентів для мобільних
        </ThemedText>
        
        {/* Розмір 1: Компактний */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Розмір 1: Компактний (для щільних інтерфейсів)
          </ThemedText>
          <CompactInput placeholder="Компактний інпут" value="" onChangeText={() => {}} />
          <CompactButton title="Компактна кнопка" onPress={() => {}} />
        </View>

        {/* Розмір 2: Стандартний */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Розмір 2: Стандартний (рекомендований)
          </ThemedText>
          <StandardInput placeholder="Стандартний інпут" value="" onChangeText={() => {}} />
          <StandardButton title="Стандартна кнопка" onPress={() => {}} />
        </View>

        {/* Розмір 3: Зручний */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Розмір 3: Зручний (для основних дій)
          </ThemedText>
          <ComfortableInput placeholder="Зручний інпут" value="" onChangeText={() => {}} />
          <ComfortableButton title="Зручна кнопка" onPress={() => {}} />
        </View>

        {/* Розмір 4: Великий */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Розмір 4: Великий (для важливих дій)
          </ThemedText>
          <LargeInput placeholder="Великий інпут" value="" onChangeText={() => {}} />
          <LargeButton title="Велика кнопка" onPress={() => {}} />
        </View>

        {/* Розмір 5: Максимальний */}
        <View style={{ marginBottom: 32, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Розмір 5: Максимальний (для критичних дій)
          </ThemedText>
          <MaxInput placeholder="Максимальний інпут" value="" onChangeText={() => {}} />
          <MaxButton title="Максимальна кнопка" onPress={() => {}} />
        </View>

        {/* Варіанти вертикального скролла для курсу */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Варіанти вертикального скролла для курсу
        </ThemedText>
        
        {/* Інтерактивні варіанти з можливістю скролу */}
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, fontSize: 16, color: AppPalette.gray[700] }}>
          Інтерактивні варіанти (можна прокручувати):
        </ThemedText>
        
        {/* Варіант 1: Вертикальний скрол з вертикальним індикатором */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Варіант 1: Вертикальний скрол з вертикальним індикатором
          </ThemedText>
          
          {/* Контейнер з вертикальним скролом */}
          <View style={{ 
            height: 300, 
            position: 'relative',
            backgroundColor: AppPalette.white,
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            {/* Вертикальний індикатор справа */}
            <View style={{ 
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: [{ translateY: -60 }], // Центрування по вертикалі
              zIndex: 10,
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
                <Pressable
                  key={step}
                  onPress={() => scrollToSlide(index)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentSlide ? '#10B981' : AppPalette.gray[300],
                    marginVertical: 4,
                  }}
                />
              ))}
            </View>
            
            {/* Вертикальний скрол контент */}
            <ScrollView 
              ref={scrollView1Ref}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20, paddingRight: 40 }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((lesson) => {
                const lessonTitles = [
                  'Вступ до курсу', 'Основні концепції', 'Практичні завдання', 'Тестування',
                  'Розширені теми', 'Проектна робота', 'Фінальний тест', 'Підсумок'
                ];
                const lessonDescriptions = [
                  'Це перший урок нашого курсу. Тут ми розглянемо основні концепції та підготуємося до подальшого навчання.',
                  'Другий урок присвячений детальному розгляду основних концепцій. Вивчимо теоретичні основи.',
                  'Третій урок містить практичні завдання для закріплення матеріалу. Практикуємо отримані знання.',
                  'Четвертий урок - це тестування знань. Перевіряємо рівень засвоєння матеріалу.',
                  'П\'ятий урок розглядає розширені теми. Поглиблюємо знання в предметній області.',
                  'Шостий урок - проектна робота. Застосовуємо знання на практиці.',
                  'Сьомий урок - фінальний тест. Підсумкове тестування всіх знань.',
                  'Восьмий урок - підсумок курсу. Аналізуємо результати та плани на майбутнє.'
                ];
                
                return (
                  <View key={lesson} style={{ 
                    marginBottom: 40,
                    paddingBottom: 20,
                    borderBottomWidth: lesson < 8 ? 1 : 0,
                    borderBottomColor: AppPalette.gray[200],
                  }}>
                    <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, fontSize: 20 }}>
                      Урок {lesson}: {lessonTitles[lesson - 1]}
                    </ThemedText>
                    <ThemedText type="default" style={{ lineHeight: 24, color: AppPalette.gray[600], fontSize: 16 }}>
                      {lessonDescriptions[lesson - 1]}
                    </ThemedText>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Варіант 2: Вертикальний скрол з лінією прогресу */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Варіант 2: Вертикальний скрол з лінією прогресу
          </ThemedText>
          
          {/* Контейнер з вертикальним скролом */}
          <View style={{ 
            height: 300, 
            position: 'relative',
            backgroundColor: AppPalette.white,
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            {/* Вертикальна лінія прогресу справа */}
            <View style={{ 
              position: 'absolute',
              right: 12,
              top: 20,
              bottom: 20,
              width: 2,
              backgroundColor: AppPalette.gray[200],
              borderRadius: 1,
            }}>
              <View style={{
                width: 2,
                backgroundColor: AppPalette.black,
                borderRadius: 1,
                height: `${((currentSlide + 1) / 8) * 100}%`,
              }} />
            </View>
            
            {/* Вертикальний скрол контент */}
            <ScrollView 
              ref={scrollView2Ref}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20, paddingRight: 40 }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((lesson) => {
                const lessonTitles = [
                  'Вступ до курсу', 'Основні концепції', 'Практичні завдання', 'Тестування',
                  'Розширені теми', 'Проектна робота', 'Фінальний тест', 'Підсумок'
                ];
                const lessonDescriptions = [
                  'Це перший урок нашого курсу. Тут ми розглянемо основні концепції та підготуємося до подальшого навчання.',
                  'Другий урок присвячений детальному розгляду основних концепцій. Вивчимо теоретичні основи.',
                  'Третій урок містить практичні завдання для закріплення матеріалу. Практикуємо отримані знання.',
                  'Четвертий урок - це тестування знань. Перевіряємо рівень засвоєння матеріалу.',
                  'П\'ятий урок розглядає розширені теми. Поглиблюємо знання в предметній області.',
                  'Шостий урок - проектна робота. Застосовуємо знання на практиці.',
                  'Сьомий урок - фінальний тест. Підсумкове тестування всіх знань.',
                  'Восьмий урок - підсумок курсу. Аналізуємо результати та плани на майбутнє.'
                ];
                
                return (
                  <View key={lesson} style={{ 
                    marginBottom: 40,
                    paddingBottom: 20,
                    borderBottomWidth: lesson < 8 ? 1 : 0,
                    borderBottomColor: AppPalette.gray[200],
                    borderLeftWidth: lesson === currentSlide + 1 ? 3 : 0,
                    borderLeftColor: lesson === currentSlide + 1 ? '#10B981' : 'transparent',
                    paddingLeft: lesson === currentSlide + 1 ? 17 : 20,
                  }}>
                    <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, fontSize: 20 }}>
                      Урок {lesson}: {lessonTitles[lesson - 1]}
                    </ThemedText>
                    <ThemedText type="default" style={{ lineHeight: 24, color: AppPalette.gray[600], fontSize: 16 }}>
                      {lessonDescriptions[lesson - 1]}
                    </ThemedText>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Варіант 3: Вертикальний скрол з номерами */}
        <View style={{ marginBottom: 24, padding: 16, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
            Варіант 3: Вертикальний скрол з номерами
          </ThemedText>
          
          {/* Контейнер з вертикальним скролом */}
          <View style={{ 
            height: 300, 
            position: 'relative',
            backgroundColor: AppPalette.white,
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            {/* Вертикальний індикатор з номерами справа */}
            <View style={{ 
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: [{ translateY: -120 }], // Центрування по вертикалі
              zIndex: 10,
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
                <Pressable
                  key={step}
                  onPress={() => scrollToSlide(index)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: index === currentSlide ? AppPalette.black : AppPalette.gray[200],
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 4,
                  }}
                >
                  <Text style={{
                    color: index === currentSlide ? AppPalette.white : AppPalette.gray[500],
                    fontSize: 10,
                    fontWeight: '600'
                  }}>
                    {step}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            {/* Вертикальний скрол контент */}
            <ScrollView 
              ref={scrollView3Ref}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20, paddingRight: 50 }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((lesson) => {
                const lessonTitles = [
                  'Вступ до курсу', 'Основні концепції', 'Практичні завдання', 'Тестування',
                  'Розширені теми', 'Проектна робота', 'Фінальний тест', 'Підсумок'
                ];
                const lessonDescriptions = [
                  'Це перший урок нашого курсу. Тут ми розглянемо основні концепції та підготуємося до подальшого навчання.',
                  'Другий урок присвячений детальному розгляду основних концепцій. Вивчимо теоретичні основи.',
                  'Третій урок містить практичні завдання для закріплення матеріалу. Практикуємо отримані знання.',
                  'Четвертий урок - це тестування знань. Перевіряємо рівень засвоєння матеріалу.',
                  'П\'ятий урок розглядає розширені теми. Поглиблюємо знання в предметній області.',
                  'Шостий урок - проектна робота. Застосовуємо знання на практиці.',
                  'Сьомий урок - фінальний тест. Підсумкове тестування всіх знань.',
                  'Восьмий урок - підсумок курсу. Аналізуємо результати та плани на майбутнє.'
                ];
                
                return (
                  <View key={lesson} style={{ 
                    marginBottom: 40,
                    paddingBottom: 20,
                    borderBottomWidth: lesson < 8 ? 1 : 0,
                    borderBottomColor: AppPalette.gray[200],
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                    <View style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: lesson === currentSlide + 1 ? '#10B981' : AppPalette.gray[100],
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16,
                      marginTop: 4,
                    }}>
                      <Text style={{ 
                        fontSize: 14, 
                        fontWeight: '600',
                        color: lesson === currentSlide + 1 ? AppPalette.white : AppPalette.black
                      }}>
                        {lesson}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, fontSize: 20 }}>
                        Урок {lesson}: {lessonTitles[lesson - 1]}
                      </ThemedText>
                      <ThemedText type="default" style={{ lineHeight: 24, color: AppPalette.gray[600], fontSize: 16 }}>
                        {lessonDescriptions[lesson - 1]}
                      </ThemedText>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Ідеї для подальшого розвитку */}
        <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
          Ідеї для подальшого розвитку дизайн-системи
        </ThemedText>
        
        <View style={{ marginBottom: 32, padding: 20, backgroundColor: AppPalette.gray[50], borderRadius: 12 }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, fontSize: 16 }}>
            🎨 Додаткові компоненти:
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Карточки (Cards) - для відображення контенту
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Модальні вікна (Modals) - для діалогів та форм
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Списки (Lists) - для навігації та даних
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Таби (Tabs) - для навігації між розділами
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Слайдери (Sliders) - для вибору значень
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Перемикачі (Switches) - для налаштувань
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Прогрес-бари (Progress) - для завантаження
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Алерти (Alerts) - для повідомлень
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, marginTop: 16, fontSize: 16 }}>
            🎯 Стани компонентів:
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Loading стани - для асинхронних операцій
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Error стани - для обробки помилок
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Empty стани - для порожніх списків
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Disabled стани - для неактивних елементів
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, marginTop: 16, fontSize: 16 }}>
            📱 Мобільні особливості:
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Pull-to-refresh - для оновлення контенту
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Swipe gestures - для взаємодії
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Haptic feedback - для тактильного відгуку
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Safe area - для різних розмірів екранів
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, marginTop: 16, fontSize: 16 }}>
            🎨 Візуальні ефекти:
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Анімації переходів - для плавності
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Градієнти - для сучасного вигляду
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Тіні та елевація - для глибини
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Blur ефекти - для сучасності
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 12, marginTop: 16, fontSize: 16 }}>
            🌙 Темна тема:
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Адаптація всіх компонентів під темну тему
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Автоматичне перемикання за системою
          </ThemedText>
          <ThemedText type="default" style={{ marginBottom: 8, lineHeight: 22 }}>
            • Збереження налаштувань користувача
          </ThemedText>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
