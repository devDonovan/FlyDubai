import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setHeaderTitle } from '../store/slices/navigationSlice';
import bridgeUtils from '../bridge/bridgeUtils';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Flight Booking - NYC to LAX',
    amount: '-$450.00',
    date: '2025-02-10',
    status: 'completed',
  },
  {
    id: '2',
    description: 'Hotel Booking - Marriott NYC',
    amount: '-$280.00',
    date: '2025-02-09',
    status: 'completed',
  },
  {
    id: '3',
    description: 'Refund - Cancelled Flight',
    amount: '+$450.00',
    date: '2025-02-08',
    status: 'completed',
  },
  {
    id: '4',
    description: 'Car Rental - Enterprise',
    amount: '-$120.00',
    date: '2025-02-07',
    status: 'pending',
  },
];

const TransactionsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setHeaderTitle(t('transactions')));
    bridgeUtils.updateHeader(t('transactions'), null);
  }, [dispatch, t]);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            item.amount.startsWith('+')
              ? styles.amountPositive
              : styles.amountNegative,
          ]}
        >
          {item.amount}
        </Text>
        <View
          style={[
            styles.statusBadge,
            styles[`status${item.status}`],
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('transactions')}</Text>

        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={styles.summaryValue}>$850.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Refunds</Text>
            <Text style={styles.summaryValue}>$450.00</Text>
          </View>
        </View>

        <FlatList
          data={MOCK_TRANSACTIONS}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <Pressable
          style={styles.button}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.buttonText}>{t('back')}</Text>
        </Pressable>
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
    marginBottom: 16,
  },
  summaryBox: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003580',
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flex: 1,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  amountNegative: {
    color: '#d32f2f',
  },
  amountPositive: {
    color: '#388e3c',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statuspending: {
    backgroundColor: '#fff3cd',
  },
  statuscompleted: {
    backgroundColor: '#d4edda',
  },
  statusfailed: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#003580',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionsScreen;
