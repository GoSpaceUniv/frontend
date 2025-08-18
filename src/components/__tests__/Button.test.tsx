import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={mockOnPress} variant="primary" />
    );

    rerender(
      <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
    );

    rerender(
      <Button title="Outline" onPress={mockOnPress} variant="outline" />
    );

    rerender(
      <Button title="Danger" onPress={mockOnPress} variant="danger" />
    );

    expect(getByText('Danger')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(
      <Button title="Small" onPress={mockOnPress} size="small" />
    );

    rerender(
      <Button title="Medium" onPress={mockOnPress} size="medium" />
    );

    rerender(
      <Button title="Large" onPress={mockOnPress} size="large" />
    );

    expect(getByText('Large')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const { getByText } = render(
      <Button title="Disabled Button" onPress={mockOnPress} disabled={true} />
    );

    const button = getByText('Disabled Button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByText } = render(
      <Button 
        title="Custom Style" 
        onPress={mockOnPress} 
        style={customStyle}
      />
    );

    expect(getByText('Custom Style')).toBeTruthy();
  });
});
