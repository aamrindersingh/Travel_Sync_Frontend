// TypeScript types for TravelSync

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  interests: string[];
  budgetRange: string;
  groupSize: string;
  travelStyle: string[];
  languages: string[];
  ageRange: {
    min: number;
    max: number;
  };
  location?: {
    country: string;
    city: string;
  };
}

export interface Ticket {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  groupSize: string;
  interests: string[];
  description: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  user?: User;
  matchesCount?: number;
}

export interface Match {
  id: string;
  ticketId: string;
  matchedUserId: string;
  score: number;
  type: 'individual' | 'group';
  status: 'pending' | 'accepted' | 'rejected' | 'connected';
  createdAt: string;
  updatedAt: string;
  matchedUser?: User;
  ticket?: Ticket;
}

export interface MatchGroup {
  id: string;
  ticketId: string;
  type: 'best-match' | 'best-group' | 'alternatives';
  matches: Match[];
  totalCount: number;
  createdAt: string;
}

export interface Connection {
  id: string;
  ticketId: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: string;
  updatedAt: string;
  fromUser?: User;
  toUser?: User;
  ticket?: Ticket;
}

export interface Message {
  id: string;
  connectionId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  createdAt: string;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match_found' | 'connection_request' | 'connection_accepted' | 'message_received' | 'ticket_updated';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterState {
  destination: string;
  budget: string;
  groupSize: string;
  interests: string;
  dateRange: {
    start: string;
    end: string;
  };
  status?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface SearchParams {
  query?: string;
  filters?: FilterState;
  sort?: SortOptions;
  page?: number;
  pageSize?: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TicketForm {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  groupSize: string;
  interests: string[];
  description: string;
}

export interface UserProfileForm {
  name: string;
  bio?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

// Route params types
export interface TicketPageParams {
  ticketId: string;
}

export interface ProfilePageParams {
  userId: string;
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

export interface UseDebounceReturn<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
