import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setHeaderTitle } from '../store/slices/navigationSlice';
import bridgeUtils from '../bridge/bridgeUtils';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setHeaderTitle(t('profile')));
    bridgeUtils.updateHeader(t('profile'), null);
  }, [dispatch, t]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('profile')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>user@example.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Account Type:</Text>
            <Text style={styles.value}>Premium</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.buttonText}>{t('back')}</Text>
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.note}>
            This component renders within the React Native container below the
            native header. All navigation is handled through React Navigation.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003580',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#003580',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  note: {
    fontSize: 12,
    color: '#1976d2',
    lineHeight: 18,
  },
});

export default ProfileScreen;
