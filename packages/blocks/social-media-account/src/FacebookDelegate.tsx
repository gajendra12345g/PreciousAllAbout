export class FacebookDelegate {
    facebookUserStatusChanged(
      userInfo: {
        // Customizable Area Start
        email: string;
        id: string;
        // Customizable Area End
      },
      isRegistration: boolean
    ): void {
      console.log('Facebook user status changed:', userInfo, 'isRegistration:', isRegistration);
    }
  }
  