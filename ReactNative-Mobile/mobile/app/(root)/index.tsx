import React from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { SignOutButton } from '../../src/components/SignOutButton'
import { useTransactions } from '@/src/hooks/useTranscations'
import { COLORS } from '@/src/constants/colors'

export default function HomeScreen() {
  const { user } = useUser()
  const { transactions, summary, isLoading } = useTransactions(user?.id ?? '')

  if (!user) {
    return (
      <View style={styles.container}>
        <SignedOut>
          <View style={styles.authContainer}>
            <Text style={styles.title}>Welcome to FinTrack</Text>
            <Link href="/(auth)/sign-in" style={styles.link}>
              <Text style={styles.linkText}>Sign in</Text>
            </Link>
            <Link href="/(auth)/sign-up" style={styles.link}>
              <Text style={styles.linkText}>Sign up</Text>
            </Link>
          </View>
        </SignedOut>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {user.emailAddresses[0].emailAddress}
          </Text>
          <SignOutButton />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading your finances...</Text>
          </View>
        ) : (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Financial Summary</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Balance</Text>
              <Text style={styles.summaryValue}>${summary.balance}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>${summary.income}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={styles.summaryValue}>${summary.expenses}</Text>
            </View>
          </View>
        )}
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  greeting: {
    fontSize: 18,
    color: COLORS.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textLight,
  },
  summaryContainer: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
})