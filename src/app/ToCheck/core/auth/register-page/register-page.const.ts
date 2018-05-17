export const pattern  = {
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
  password: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
};

export const hintMessages = {
  password: 'Rule:At least one number from [0-9], one uppercase, one lowercase letter and at least 8 or more characters'
};

export const validationMessages = {
  email: {
    required: 'emailId is required.',
    pattern: 'Pattern does not match of type user@abc.com'
  },
  password: {
    required: 'Password is required.',
    minlength: 'Password Minimum Length of 8 Characters Required',
    pattern:
      'Pattern mismatch: Must contain at least one number and one uppercase and lowercase letter.'
  },
  cPassword: {
    required: 'Password is required.',
    minlength: 'Password Minimum Length of 8 Characters Required',
    pattern:
      'Pattern mismatch: Must contain at least one number and one uppercase and lowercase letter.'
  },

  first: {
    required: 'First Name is required.',
    pattern: 'Please enter only characters',
    maxlength: 'Maximum 50 characters allowed'
  },

  telephone: {
    pattern: 'Please enter only numbers'
  }
};
