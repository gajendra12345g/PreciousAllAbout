function hideEmail(email) {
    // Split the email into local part and domain
    const [localPart, domain] = email.split('@');
  
    // Replace characters in the local part with asterisks
    const hiddenLocalPart = localPart.substring(0, 2) + '*'.repeat(localPart.length - 2);
  
    // Create the hidden email by combining the hidden local part and the domain
    const hiddenEmail = `${hiddenLocalPart}@${domain}`;
  
    return hiddenEmail;
  }
  
  // Example usage
  const originalEmail = 'example.email@example.com';
  const hiddenEmail = hideEmail(originalEmail);
  
  console.log(hiddenEmail);