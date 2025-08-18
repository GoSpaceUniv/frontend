export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9-+\s()]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateProfile = (data: {
  name: string;
  email: string;
  phone: string;
  bio: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name)) {
    errors.name = '이름을 입력해주세요.';
  } else if (!validateMinLength(data.name, 2)) {
    errors.name = '이름은 2자 이상이어야 합니다.';
  }

  if (!validateRequired(data.email)) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!validateEmail(data.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.';
  }

  if (!validateRequired(data.phone)) {
    errors.phone = '전화번호를 입력해주세요.';
  } else if (!validatePhone(data.phone)) {
    errors.phone = '올바른 전화번호 형식을 입력해주세요.';
  }

  if (data.bio && !validateMaxLength(data.bio, 200)) {
    errors.bio = '자기소개는 200자 이하여야 합니다.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
