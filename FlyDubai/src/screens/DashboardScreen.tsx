import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setHeaderTitle } from '../store/slices/navigationSlice';
import bridgeUtils from '../bridge/bridgeUtils';
import { RootState } from '../store';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const headerState = useSelector((state: RootState) => state.navigation);

  useEffect(() => {
    dispatch(setHeaderTitle(t('dashboard')));
    // Update native header when this screen comes into focus
    bridgeUtils.updateHeader(t('dashboard'), t('settings'));
  }, [dispatch, t]);

  const handleViewProfile = () => {
    navigation?.navigate('ProfileScreen');
  };

  const handleViewTransactions = () => {
    navigation?.navigate('TransactionsScreen');
  };

  const handleNavigateNative = () => {
    // Example: Navigate to a native screen
    bridgeUtils.openNativeScreen('ProfileActivity', {
      userId: auth.userId,
    });
  };

  const handleLogout = () => {
    bridgeUtils.closeRNView();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          {t('welcome')}{auth.userName ? `, ${auth.userName}` : ''}
        </Text>

        <Text style={styles.subtitle}>
          Logged in as: {auth.userId}
        </Text>

        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={handleViewProfile}
          >
            <Text style={styles.buttonText}>{t('profile')}</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={handleViewTransactions}
          >
            <Text style={styles.buttonText}>{t('transactions')}</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={handleNavigateNative}
          >
            <Text style={styles.buttonText}>Open Native Profile</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonDanger]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>{t('logout')}</Text>
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Debug Info</Text>
          <Text style={styles.infoText}>
            Current Header Title: {headerState.headerTitle}
          </Text>
          <Text style={styles.infoText}>
            Current Screen: {headerState.currentScreen}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003580',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#003580',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#003580',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});

export default DashboardScreen;
