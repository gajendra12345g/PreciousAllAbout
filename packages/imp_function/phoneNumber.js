function hideMobileNumber(mobileNumber) {
    // Check if the provided mobileNumber is a string
    if (typeof mobileNumber !== 'string') {
      return 'Invalid mobile number';
    }
  
    // Check if the mobileNumber has at least 4 digits
    if (mobileNumber.length < 4) {
      return 'Mobile number is too short';
    }
  
    // Extract the first two and last two digits
    const firstTwo = mobileNumber.slice(0, 2);
    const lastTwo = mobileNumber.slice(-2);
  
    // Replace the remaining digits with asterisks
    const hiddenDigits = '*'.repeat(mobileNumber.length - 4);
  
    // Combine the visible and hidden parts
    const hiddenNumber = firstTwo + hiddenDigits + lastTwo;
  
    return hiddenNumber;
  }
  
  // Example usage
  const originalNumber = '1234567890';
  const hiddenNumber = hideMobileNumber(originalNumber);
  
  console.log(hiddenNumber);