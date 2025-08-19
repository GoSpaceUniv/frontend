import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  containerStyle?: object;
  dropdownStyle?: object;
  itemStyle?: object;
  labelStyle?: object;
  searchable?: boolean; // New prop for search functionality
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = '선택하세요',
  containerStyle,
  dropdownStyle,
  itemStyle,
  labelStyle,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    // When options prop changes, reset filteredOptions and searchQuery
    setFilteredOptions(options);
    setSearchQuery('');
  }, [options]);

  useEffect(() => {
    if (searchable && searchQuery) {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options, searchable]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
    setSearchQuery(''); // Clear search query on selection
  };

  const selectedLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TouchableOpacity style={[styles.dropdownButton, dropdownStyle]} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.selectedText}>{selectedLabel}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          {searchable && (
            <TextInput
              style={styles.searchInput}
              placeholder="검색..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
          )}
          <ScrollView style={styles.scrollView}>
            {filteredOptions.length === 0 ? (
              <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
            ) : (
              filteredOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.optionItem, itemStyle, selectedValue === option.value && styles.selectedOptionItem]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text style={[styles.optionText, selectedValue === option.value && styles.selectedOptionText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '600',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectedText: {
    fontSize: 16,
    color: '#1f2937',
  },
  arrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 4,
    zIndex: 10000, // Increase zIndex to ensure it's on top
    maxHeight: 200, // Limit height for scrollability
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 8,
    marginBottom: 4,
  },
  scrollView: {
    maxHeight: 200, // Ensure scroll view respects container height
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  noResultsText: {
    padding: 15,
    color: '#6b7280',
    textAlign: 'center',
  },
  selectedOptionItem: {
    backgroundColor: '#e0e7ff',
  },
  optionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#1f2937',
  },
});

export default Dropdown;
