import { View, StyleSheet, Image } from 'react-native';

export default function Logo({ width, height }) {
  const styles = StyleSheet.create({
    logo: {
      width: width,
      height: height,
      alignSelf: 'center',
      resizeMode: 'contain', 
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-no-background.png')}
        style={styles.logo}
      />
    </View>
  );
}