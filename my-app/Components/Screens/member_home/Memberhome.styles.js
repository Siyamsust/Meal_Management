import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F8FAFC',
  cardBg: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  border: '#E2E8F0',
  shadow: '#000000',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

const styles = StyleSheet.create({
  // ============ MAIN CONTAINER ============
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ============ HEADER ============
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerGreeting: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  headerName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.cardBg,
  },

  // ============ MAIN CONTENT ============
  mainContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    letterSpacing: -0.3,
  },

  // ============ QUICK STATS / SUMMARY CARDS ============
  quickStatsContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  summaryCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  featuredCard: {
    width: width - spacing.lg * 2,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  cardLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  cardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendUp: {
    color: colors.success,
  },
  trendDown: {
    color: colors.danger,
  },
  dashboardTitle: {
    fontSize: width > 600 ? 28 : 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    letterSpacing: -0.5,
  },
  // ============ CHARTS SECTION ============
  chartsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  chartContainer: {
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },

  // ============ BAR CHART ============
  barChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 180,
    marginTop: spacing.md,
  },
  barChartYAxis: {
    justifyContent: 'space-between',
    height: '100%',
    paddingRight: spacing.md,
    marginRight: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  axisLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  barChartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    gap: spacing.xs,
  },
  barChartItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  barChartBar: {
    width: '100%',
    maxWidth: 32,
    backgroundColor: colors.primary,
    borderTopLeftRadius: borderRadius.sm,
    borderTopRightRadius: borderRadius.sm,
    minHeight: 20,
    marginBottom: spacing.sm,
  },
  barChartLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontWeight: '600',
  },

  // ============ DONUT/PROGRESS CHART ============
  donutChartContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  progressCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  progressCircleWrapper: {
    alignItems: 'center',
    minWidth: 90,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  progressAmount: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
  },

  // ============ ACTIVITY SECTION ============
  activityContainer: {
    backgroundColor: colors.cardBg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  activityList: {
    gap: spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // ============ QUICK ACTIONS ============
  quickActionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  quickActionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickActionButton: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // ============ JOIN MESS SCREEN ============
  joinMessContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  joinMessContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  joinMessIllustration: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  joinMessIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: `${colors.primary}20`,
  },
  joinMessTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    letterSpacing: -0.5,
  },
  joinMessSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },

  // ============ FEATURES LIST ============
  featuresList: {
    marginBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  featureIcon: {
    marginRight: spacing.md,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // ============ PRICING CARD ============
  pricingCard: {
    backgroundColor: `${colors.primary}10`,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: `${colors.primary}30`,
    marginBottom: spacing.xl,
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pricingAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacing.sm,
    letterSpacing: -1,
  },
  pricingPeriod: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  pricingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // ============ BUTTONS ============
  joinButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  learnMoreButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default styles;
