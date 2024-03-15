export class GoogleDelegate {
    googleUserStatusChanged(
      userInfo: {
        // Customizable Area Start
        email: string;
        id: string;
        // Customizable Area End
      },
      isRegistration: boolean
    ): void {
      console.log('Google user status changed:', userInfo, 'isRegistration:', isRegistration);
    }
  }
  