// server - matching score helpers (used only for previews)

export interface MatchingCriteria {
  destination: string;
  budget: string;
  groupSize: string;
  interests: string[];
  startDate: string;
  endDate: string;
}

export interface UserProfile {
  id: string;
  interests: string[];
  budgetRange: string;
  groupSize: string;
  travelStyle: string[];
  age: number;
  location?: string;
}

export interface ScoreBreakdown {
  destination: number;
  budget: number;
  groupSize: number;
  interests: number;
  timing: number;
  total: number;
}

export const calculateMatchScore = (
  ticket: MatchingCriteria,
  user: UserProfile
): { score: number; breakdown: ScoreBreakdown } => {
  const breakdown: ScoreBreakdown = {
    destination: 0,
    budget: 0,
    groupSize: 0,
    interests: 0,
    timing: 0,
    total: 0,
  };

  // Destination matching (30% weight)
  breakdown.destination = calculateDestinationScore(ticket.destination, user.location);
  
  // Budget matching (25% weight)
  breakdown.budget = calculateBudgetScore(ticket.budget, user.budgetRange);
  
  // Group size matching (20% weight)
  breakdown.groupSize = calculateGroupSizeScore(ticket.groupSize, user.groupSize);
  
  // Interests matching (20% weight)
  breakdown.interests = calculateInterestsScore(ticket.interests, user.interests);
  
  // Timing matching (5% weight)
  breakdown.timing = calculateTimingScore(ticket.startDate, ticket.endDate);

  // Calculate weighted total
  breakdown.total = (
    breakdown.destination * 0.3 +
    breakdown.budget * 0.25 +
    breakdown.groupSize * 0.2 +
    breakdown.interests * 0.2 +
    breakdown.timing * 0.05
  );

  return {
    score: Math.round(breakdown.total * 100) / 100,
    breakdown,
  };
};

const calculateDestinationScore = (ticketDestination: string, userLocation?: string): number => {
  if (!userLocation) return 0.5; // Neutral score if no location data
  
  // Simple string matching for now
  // TODO: Implement more sophisticated location matching
  const ticketLower = ticketDestination.toLowerCase();
  const userLower = userLocation.toLowerCase();
  
  if (ticketLower.includes(userLower) || userLower.includes(ticketLower)) {
    return 1.0; // Perfect match
  }
  
  // Check for country/region matches
  const commonRegions = {
    'europe': ['france', 'germany', 'italy', 'spain', 'uk', 'netherlands'],
    'asia': ['japan', 'china', 'korea', 'thailand', 'singapore', 'india'],
    'americas': ['usa', 'canada', 'mexico', 'brazil', 'argentina'],
  };
  
  for (const [region, countries] of Object.entries(commonRegions)) {
    if (ticketLower.includes(region) && countries.some(country => userLower.includes(country))) {
      return 0.8; // Good regional match
    }
  }
  
  return 0.3; // Low match
};

const calculateBudgetScore = (ticketBudget: string, userBudget: string): number => {
  const budgetRanges = {
    'low': { min: 0, max: 500 },
    'medium': { min: 500, max: 1500 },
    'high': { min: 1500, max: Infinity },
  };
  
  const ticketRange = budgetRanges[ticketBudget as keyof typeof budgetRanges];
  const userRange = budgetRanges[userBudget as keyof typeof budgetRanges];
  
  if (!ticketRange || !userRange) return 0.5;
  
  // Check for overlap
  const overlap = Math.min(ticketRange.max, userRange.max) - Math.max(ticketRange.min, userRange.min);
  const totalRange = Math.max(ticketRange.max, userRange.max) - Math.min(ticketRange.min, userRange.min);
  
  if (overlap <= 0) return 0.1; // No overlap
  if (overlap === totalRange) return 1.0; // Perfect overlap
  
  return overlap / totalRange;
};

const calculateGroupSizeScore = (ticketGroupSize: string, userGroupSize: string): number => {
  const groupSizeValues = {
    '1': 1,
    '2': 2,
    '3-5': 4,
    '6+': 8,
  };
  
  const ticketValue = groupSizeValues[ticketGroupSize as keyof typeof groupSizeValues] || 0;
  const userValue = groupSizeValues[userGroupSize as keyof typeof groupSizeValues] || 0;
  
  if (ticketValue === 0 || userValue === 0) return 0.5;
  
  // Calculate compatibility based on group size preferences
  if (ticketValue === userValue) return 1.0; // Perfect match
  
  const diff = Math.abs(ticketValue - userValue);
  if (diff <= 1) return 0.8; // Close match
  if (diff <= 2) return 0.6; // Moderate match
  if (diff <= 3) return 0.4; // Poor match
  
  return 0.2; // Very poor match
};

const calculateInterestsScore = (ticketInterests: string[], userInterests: string[]): number => {
  if (ticketInterests.length === 0 || userInterests.length === 0) return 0.5;
  
  const ticketSet = new Set(ticketInterests.map(i => i.toLowerCase()));
  const userSet = new Set(userInterests.map(i => i.toLowerCase()));
  
  const intersection = new Set([...ticketSet].filter(x => userSet.has(x)));
  const union = new Set([...ticketSet, ...userSet]);
  
  // Jaccard similarity coefficient
  return intersection.size / union.size;
};

const calculateTimingScore = (startDate: string, _endDate: string): number => {
  const now = new Date();
  const start = new Date(startDate);
  
  // Check if trip is in the future
  if (start < now) return 0.1; // Past trip
  
  const daysUntilTrip = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Prefer trips that are not too far in the future
  if (daysUntilTrip <= 30) return 1.0; // Within a month
  if (daysUntilTrip <= 90) return 0.8; // Within 3 months
  if (daysUntilTrip <= 180) return 0.6; // Within 6 months
  if (daysUntilTrip <= 365) return 0.4; // Within a year
  
  return 0.2; // More than a year away
};

export const getScoreDescription = (score: number): string => {
  if (score >= 0.9) return 'Excellent match';
  if (score >= 0.8) return 'Very good match';
  if (score >= 0.7) return 'Good match';
  if (score >= 0.6) return 'Fair match';
  if (score >= 0.5) return 'Possible match';
  return 'Poor match';
};

export const getScoreColor = (score: number): string => {
  if (score >= 0.8) return 'text-green-600';
  if (score >= 0.6) return 'text-yellow-600';
  if (score >= 0.4) return 'text-orange-600';
  return 'text-red-600';
};

export const formatScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};
