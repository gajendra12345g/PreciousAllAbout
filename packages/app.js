// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import Reservations from "../../blocks/reservations/src/Reservations";
import Filecompression from "../../blocks/filecompression/src/Filecompression";
import OrderManagement from "../../blocks/ordermanagement/src/OrderManagement";
import Watermark from "../../blocks/watermark/src/Watermark";
import Filteritems from "../../blocks/filteritems/src/Filteritems";
import Filteroptions from "../../blocks/filteritems/src/Filteroptions";
import Onboardingguide from "../../blocks/onboardingguide/src/Onboardingguide";
import Notificationsettings from "../../blocks/notificationsettings/src/Notificationsettings";
import PhoneNumberInput from "../../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../../blocks/mobile-account-registration/src/AdditionalDetailForm";
import EducationalUserProfile from "../../blocks/educational-user-profile/src/EducationalUserProfile";
import Emailnotifications2 from "../../blocks/emailnotifications2/src/Emailnotifications2";
import Cfaibasedvideoandaudiogeneration from "../../blocks/cfaibasedvideoandaudiogeneration/src/Cfaibasedvideoandaudiogeneration";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Cfintegrationwithnuclia from "../../blocks/cfintegrationwithnuclia/src/Cfintegrationwithnuclia";
import Cfintegrationwithaiforpreviewandrefinement2 from "../../blocks/cfintegrationwithaiforpreviewandrefinement2/src/Cfintegrationwithaiforpreviewandrefinement2";
import LanguageSupport from "../../blocks/languagesupport/src/LanguageSupport";
import RecommendationEngine from "../../blocks/recommendationengine/src/RecommendationEngine";
import Adminconsole2 from "../../blocks/adminconsole2/src/Adminconsole2";
import MultipleCurrencySupport from "../../blocks/multiplecurrencysupport/src/MultipleCurrencySupport";
import Notifications from "../../blocks/notifications/src/Notifications";
import Reviewprompt2 from "../../blocks/reviewprompt2/src/Reviewprompt2";
import VideoTrimmer from "../../blocks/videotrimmer/src/VideoTrimmer";
import Paymentadmin2 from "../../blocks/paymentadmin2/src/Paymentadmin2";
import Downloadableproducts from "../../blocks/downloadableproducts/src/Downloadableproducts";
import Contactsharing from "../../blocks/contactsharing/src/Contactsharing";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import Catalogue from "../../blocks/catalogue/src/Catalogue.web";
import CataloguePortfolio from "../../blocks/catalogue/src/CataloguePortfolio.web";
import Rolesandpermissions2 from "../../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import Cffilecompressionforvideos from "../../blocks/cffilecompressionforvideos/src/Cffilecompressionforvideos";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import Scheduling from "../../blocks/scheduling/src/Scheduling";
import Cfintegrationaiguidededitingforvideos2 from "../../blocks/cfintegrationaiguidededitingforvideos2/src/Cfintegrationaiguidededitingforvideos2";
import Contactus from "../../blocks/contactus/src/Contactus";
import ContributorContactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import Settings2 from "../../blocks/settings2/src/Settings2";
import Share from "../../blocks/share/src/Share";
import Hashtags from "../../blocks/hashtags/src/Hashtags";
import Favourites from "../../blocks/favourites/src/Favourites";
import AddFavourites from "../../blocks/favourites/src/AddFavourites";
import Sorting from "../../blocks/sorting/src/Sorting";
import PostCreation from "../../blocks/postcreation/src/PostCreation";
import Posts from "../../blocks/postcreation/src/Posts";
import PostDetails from "../../blocks/postcreation/src/PostDetails";
import RequestManagement from "../../blocks/requestmanagement/src/RequestManagement";
import Reviews from "../../blocks/reviews/src/Reviews";
import AddReview from "../../blocks/reviews/src/AddReview";
import Cfintegrationwithaitoolforfinalizationandenhancement from "../../blocks/cfintegrationwithaitoolforfinalizationandenhancement/src/Cfintegrationwithaitoolforfinalizationandenhancement";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import Videos from "../../blocks/videos/src/Videos";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword.web";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import ResetPassword from "../../blocks/forgot-password/src/ResetPassword.web";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import Chat from "../../blocks/chat/src/Chat";
import ViewChat from "../../blocks/chat/src/ViewChat";
import Cfintegrationwithmidjourneyforvideos from "../../blocks/cfintegrationwithmidjourneyforvideos/src/Cfintegrationwithmidjourneyforvideos";
import Translation from "../../blocks/translation/src/Translation";
import StripePayments from "../../blocks/stripepayments/src/StripePayments";
import ImportExportData from "../../blocks/importexportdata/src/ImportExportData";
import TermsConditions from "../../blocks/termsconditions/src/TermsConditions.web";
import TermsConditionsDetail from "../../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../../blocks/termsconditions/src/TermsConditionsUsers";
import BulkUploading from "../../blocks/bulkuploading/src/BulkUploading";
import MobileAccountLoginBlock from "../../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import Analytics from "../../blocks/analytics/src/Analytics";
import PhotoLibrary from "../../blocks/photolibrary/src/PhotoLibrary";
import Cfintegrationwithmidjourneyordalle2forphoto from "../../blocks/cfintegrationwithmidjourneyordalle2forphoto/src/Cfintegrationwithmidjourneyordalle2forphoto";
import Interactivefaqs from "../../blocks/interactivefaqs/src/Interactivefaqs";
import AddInteractivefaqs from "../../blocks/interactivefaqs/src/AddInteractivefaqs";
import Categoriessubcategories from "../../blocks/categoriessubcategories/src/Categoriessubcategories";
import Trending from "../../blocks/trending/src/Trending";
import Cfhiringofthecontentcreator from "../../blocks/cfhiringofthecontentcreator/src/Cfhiringofthecontentcreator";
import ReviewApprovalAdmin from "../../blocks/reviewandapproval/src/ReviewApprovalAdmin";
import ReviewApprovalBasicUser from "../../blocks/reviewandapproval/src/ReviewApprovalBasicUser";
import Multitieredpricing from "../../blocks/multitieredpricing/src/Multitieredpricing";
import Splitpayments2 from "../../blocks/splitpayments2/src/Splitpayments2";
import ShoppingCartOrders from "../../blocks/shoppingcart/src/ShoppingCartOrders";
import AddShoppingCartOrderItem from "../../blocks/shoppingcart/src/AddShoppingCartOrderItem";
import AdvancedSearch from "../../blocks/advancedsearch/src/AdvancedSearch";
import CarouselDisplay from "../../blocks/carouseldisplay/src/CarouselDisplay";
import UserProfilePrivacyAndSecurity from "../../blocks/user-profile-basic/src/UserProfilePrivacyAndSecurity.web"
import UserProfileSetting from "../../blocks/user-profile-basic/src/UserProfileSetting.web"
import UserProfileDetails from "../../blocks/user-profile-basic/src/UserProfileDetails.web"
import LandingPageContributor from "../../blocks/landingpage/src/LandingPageContributor.web"
import ForgotPasswordContributor from "../../blocks/forgot-password/src/ForgotPasswordContributor.web"
import ResetPasswordContributor from "../../blocks/forgot-password/src/ResetPasswordContributor.web"
import ContributorLandingPageAfterLogin from "../../blocks/landingpage/src/LadingPageAfterLoginContributor.web"
import NavigationMenu from '../../blocks/navigationmenu/src/NavigationMenu.web'
import PrivacyPolicy from "../../blocks/termsconditions/src/PrivacyPolicy.web"


const routeMap = {
Multitieredpricing:{
 component:Multitieredpricing,
path:"/Multitieredpricing"},
Splitpayments2:{
 component:Splitpayments2,
path:"/Splitpayments2"},
ShoppingCartOrders:{
 component:ShoppingCartOrders,
path:"/ShoppingCartOrders"},
AddShoppingCartOrderItem:{
 component:AddShoppingCartOrderItem,
path:"/AddShoppingCartOrderItem"},
AdvancedSearch:{
 component:AdvancedSearch,
path:"/AdvancedSearch/:searchQuery?"},
CarouselDisplay:{
 component:CarouselDisplay,
path:"/CarouselDisplay"},
UserProfilePrivacyAndSecurity:{
  component:UserProfilePrivacyAndSecurity,
  path:"/UserProfilePrivacyAndSecurity"
},
UserProfileSetting:{
  component:UserProfileSetting,
 path:"/UserProfileSetting"},
 Contributor:{
  component:LandingPageContributor,
 path:"/Contributor",
exact:true},
 ForgotPasswordContributor:{
  component:ForgotPasswordContributor,
  path:'/Contributor/forgot-password',
  exact:true
 },
 ResetPasswordContributor:{
  component:ResetPasswordContributor,
  path:"/Contributor/reset-password",
  exact:true
 },
 LadingPageAfterLoginContributor:{
  component:ContributorLandingPageAfterLogin,
  path:"/Contributor/home",
  exact:true
 },
 ContributorContactus:{
  component:ContributorContactus,
  path:"/Contributor/Contactus",
  exact:true
 },

Reservations:{
 component:Reservations,
path:"/Reservations"},
Filecompression:{
 component:Filecompression,
path:"/Filecompression"},
OrderManagement:{
 component:OrderManagement,
path:"/OrderManagement"},
Watermark:{
 component:Watermark,
path:"/Watermark"},
Filteritems:{
 component:Filteritems,
path:"/Filteritems"},
Filteroptions:{
 component:Filteroptions,
path:"/Filteroptions"},
Onboardingguide:{
 component:Onboardingguide,
path:"/Onboardingguide"},
Notificationsettings:{
 component:Notificationsettings,
path:"/Notificationsettings"},
PhoneNumberInput:{
 component:PhoneNumberInput,
path:"/PhoneNumberInput"},
AdditionalDetailForm:{
 component:AdditionalDetailForm,
path:"/AdditionalDetailForm"},
EducationalUserProfile:{
 component:EducationalUserProfile,
path:"/EducationalUserProfile"},
Emailnotifications2:{
 component:Emailnotifications2,
path:"/Emailnotifications2"},
Cfaibasedvideoandaudiogeneration:{
 component:Cfaibasedvideoandaudiogeneration,
path:"/Cfaibasedvideoandaudiogeneration"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},
Cfintegrationwithnuclia:{
 component:Cfintegrationwithnuclia,
path:"/Cfintegrationwithnuclia"},
Cfintegrationwithaiforpreviewandrefinement2:{
 component:Cfintegrationwithaiforpreviewandrefinement2,
path:"/Cfintegrationwithaiforpreviewandrefinement2"},
LanguageSupport:{
 component:LanguageSupport,
path:"/LanguageSupport"},
RecommendationEngine:{
 component:RecommendationEngine,
path:"/RecommendationEngine"},
Adminconsole2:{
 component:Adminconsole2,
path:"/Adminconsole2"},
MultipleCurrencySupport:{
 component:MultipleCurrencySupport,
path:"/MultipleCurrencySupport"},
Notifications:{
 component:Notifications,
path:"/Notifications"},
Reviewprompt2:{
 component:Reviewprompt2,
path:"/Reviewprompt2"},
VideoTrimmer:{
 component:VideoTrimmer,
path:"/VideoTrimmer"},
Paymentadmin2:{
 component:Paymentadmin2,
path:"/Paymentadmin2"},
Downloadableproducts:{
 component:Downloadableproducts,
path:"/Downloadableproducts"},
Contactsharing:{
 component:Contactsharing,
path:"/Contactsharing"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
Catalogue:{
 component:Catalogue,
path:"/Contributor/uploadContent"},
CataloguePortfolio:{
  component:CataloguePortfolio,
 path:"/Contributor/Portfolio"
},
Rolesandpermissions2:{
 component:Rolesandpermissions2,
path:"/Rolesandpermissions2"},
Cffilecompressionforvideos:{
 component:Cffilecompressionforvideos,
path:"/Cffilecompressionforvideos"},
UserProfileBasicBlock:{
 component:UserProfileBasicBlock,
path:"/UserProfileBasicBlock"},
Pushnotifications:{
 component:Pushnotifications,
path:"/Pushnotifications"},
Scheduling:{
 component:Scheduling,
path:"/Scheduling"},
Cfintegrationaiguidededitingforvideos2:{
 component:Cfintegrationaiguidededitingforvideos2,
path:"/Cfintegrationaiguidededitingforvideos2"},
Contactus:{
 component:Contactus,
path:"/Contactus"},
AddContactus:{
 component:AddContactus,
path:"/AddContactus"},
Settings2:{
 component:Settings2,
path:"/Settings2"},
Share:{
 component:Share,
path:"/Share"},
Hashtags:{
 component:Hashtags,
path:"/Hashtags"},
Favourites:{
 component:Favourites,
path:"/Favourites"},
AddFavourites:{
 component:AddFavourites,
path:"/AddFavourites"},
Sorting:{
 component:Sorting,
path:"/Sorting"},
PostCreation:{
 component:PostCreation,
path:"/PostCreation"},
Posts:{
 component:Posts,
path:"/Posts"},
PostDetails:{
 component:PostDetails,
path:"/PostDetails"},
RequestManagement:{
 component:RequestManagement,
path:"/RequestManagement"},
Reviews:{
 component:Reviews,
path:"/Reviews"},
AddReview:{
 component:AddReview,
path:"/AddReview"},
Cfintegrationwithaitoolforfinalizationandenhancement:{
 component:Cfintegrationwithaitoolforfinalizationandenhancement,
path:"/Cfintegrationwithaitoolforfinalizationandenhancement"},
EmailAccountLoginBlock:{
 component:EmailAccountLoginBlock,
path:"/EmailAccountLoginBlock"},
Videos:{
 component:Videos,
path:"/Videos"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
ResetPassword:{
  component:ResetPassword,
 path:"/ResetPassword"},
Chat:{
 component:Chat,
path:"/Chat"},
ViewChat:{
 component:ViewChat,
path:"/ViewChat"},
Cfintegrationwithmidjourneyforvideos:{
 component:Cfintegrationwithmidjourneyforvideos,
path:"/Cfintegrationwithmidjourneyforvideos"},
Translation:{
 component:Translation,
path:"/Translation"},
StripePayments:{
 component:StripePayments,
path:"/StripePayments"},
ImportExportData:{
 component:ImportExportData,
path:"/ImportExportData"},
TermsConditions:{
 component:TermsConditions,
path:"/TermsConditions"},
TermsConditionsDetail:{
 component:TermsConditionsDetail,
path:"/TermsConditionsDetail"},
TermsConditionsUsers:{
 component:TermsConditionsUsers,
path:"/TermsConditionsUsers"},
BulkUploading:{
 component:BulkUploading,
path:"/BulkUploading"},
MobileAccountLoginBlock:{
 component:MobileAccountLoginBlock,
path:"/MobileAccountLoginBlock"},
LandingPage:{
 component:LandingPage,
path:"/LandingPage"},
EmailAccountRegistration:{
 component:EmailAccountRegistration,
path:"/EmailAccountRegistration"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
PhotoLibrary:{
 component:PhotoLibrary,
path:"/Contributor/PhotoLibrary"},
Cfintegrationwithmidjourneyordalle2forphoto:{
 component:Cfintegrationwithmidjourneyordalle2forphoto,
path:"/Cfintegrationwithmidjourneyordalle2forphoto"},
Interactivefaqs:{
 component:Interactivefaqs,
path:"/Interactivefaqs"},
AddInteractivefaqs:{
 component:AddInteractivefaqs,
path:"/AddInteractivefaqs"},
Categoriessubcategories:{
 component:Categoriessubcategories,
path:"/Categoriessubcategories"},
Trending:{
 component:Trending,
path:"/Trending"},
UserProfileDetails:{
  component:UserProfileDetails,
 path:"/UserProfileDetails"},
Cfhiringofthecontentcreator:{
 component:Cfhiringofthecontentcreator,
path:"/Cfhiringofthecontentcreator"},
ReviewApprovalAdmin:{
 component:ReviewApprovalAdmin,
path:"/ReviewApprovalAdmin"},
ReviewApprovalBasicUser:{
 component:ReviewApprovalBasicUser,
path:"/ReviewApprovalBasicUser"},
PrivacyPolicy:{
  component:PrivacyPolicy,
 path:"/PrivacyPolicy"},

  Home: {
component:LandingPage,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },
  NavigationMenu :{
    component : NavigationMenu,
    path: '/NavigationMenu'
  },
  // AlertWeb: {
  //   component: AlertBlock,
  //   path: "*/AlertWeb",
  //   modal: true
  // },
};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View>
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
