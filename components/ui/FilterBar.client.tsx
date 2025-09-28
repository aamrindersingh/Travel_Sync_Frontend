// client
'use client';

import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  destination: string;
  budget: string;
  groupSize: string;
  interests: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    destination: '',
    budget: '',
    groupSize: '',
    interests: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (key: 'start' | 'end', value: string) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      destination: '',
      budget: '',
      groupSize: '',
      interests: '',
      dateRange: {
        start: '',
        end: ''
      }
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Tickets</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            value={filters.destination}
            onChange={(e) => handleFilterChange('destination', e.target.value)}
            placeholder="Where to?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget
          </label>
          <select
            value={filters.budget}
            onChange={(e) => handleFilterChange('budget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any budget</option>
            <option value="low">$0 - $500</option>
            <option value="medium">$500 - $1500</option>
            <option value="high">$1500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Size
          </label>
          <select
            value={filters.groupSize}
            onChange={(e) => handleFilterChange('groupSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any size</option>
            <option value="1">Solo</option>
            <option value="2">2 people</option>
            <option value="3-5">3-5 people</option>
            <option value="6+">6+ people</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interests
          </label>
          <input
            type="text"
            value={filters.interests}
            onChange={(e) => handleFilterChange('interests', e.target.value)}
            placeholder="e.g., hiking, food"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
