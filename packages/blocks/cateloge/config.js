Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.productApiContentType = "application/json";
exports.apiMethodTypeGet = "GET";
exports.productAPiEndPoint = "catalogue/catalogues";
exports.uploadHeading= "Upload your content";
exports.dragContent = "Drag and drop your files here";
exports.or = "or"
exports.selectFiles = "select multiple files";
exports.imageSize = "Images must be .eps or .jpg format. Videos must be .mov or .Mp4 format.More";
exports.next = "Next";
exports.cancel="Cancel";
exports.yes="Yes";
exports.keywordSuggestion="Keyword suggestions ";
exports.auto="(auto applied)";
exports.needHelp= "Need Help?";
exports.noSelectedContent = "Select an items to add details";
exports.selectMulti = 'Tip: Select multiple items by holding "Shift" or "Command/Control"'
exports.submitBtn="submit";
exports.nsfw = "NSFW ";
exports.submittedDate="Date submitted:"
exports.choosecategory="Choose category";
exports.dateReview= "Date reviewed:";
exports.expireContent= "Content expires in 21 days"
exports.Content= "content"
exports.contentDetails='"This photo should not contain nudity, sexually explicit content or suggestive content" to be used for user compliance';
exports.topBannerText = "Welcome! Let's get your content approved. Select an item to add details and submit for review."
exports.learnMore = "Learn more";
exports.noSubmitHead = "Upload your content";
exports.noSubmitContent = "Get started by selecting files to submit.";
exports.startHere = "start here";
exports.noPendingHead = "you have no pending content";
exports.noPendingContent = "Upload your latest work and keep earning.";
exports.upload = "upload";
exports.submit = "submit";
exports.noReviewedHead = "No recently reviewed content";
exports.modalHead = "Thank you for Submitting Your Content, It's Under Review!";
exports.modalContent = "Our expert review team will check over your work and provide feedback in the next few days.";
exports.submitMore = "Submit more";
exports.dashboard = "Back to dashboard";
exports.getMethod = "GET";
exports.postMethod = "POST";
exports.putMethod = "PUT";
exports.deleteMethod = "DELETE";
exports.uploadContentEndPoint = "bx_block_catalogue/catalogues";
exports.showContentEndPoint = "bx_block_catalogue/catalogues/show_catalogue";
exports.deleteContentEndPint = "bx_block_catalogue/catalogues/destroy_catalogue";
exports.contentInfoEndPoint = "bx_block_catalogue/catalogues/update_catalogue";
exports.selectReviewContent = "Select an item to view details";
exports.deleteBtn = "delete";
exports.showCategoryEndPoint = "bx_block_categories/categories"
exports.deleteAllContentEndPoint = "bx_block_catalogue/catalogues/destroy_all";
exports.rejectedContent = "Understanding the reasons why your content was rejected will help you get more work approved in the future.";
exports.rejectionReason = "Rejection Reasons (1)";
exports.tradeMark = "Visible Trademark"
exports.rejectionReasons = ":Content contains visible brand names or logos.";
exports.approvedStatus = "The Image is Approved";
exports.approvedDate = "Date approved: ";
exports.retryBtn= "Retry"
exports.confirmDeleteText="Are you sure you want to delete this content?";
exports.saveDetailsEndPoint = "bx_block_catalogue/catalogues/update_saved_catalogue";
exports.errorContent = "Your upload failed because it is in wrong format."
exports.showContentEndPoint = (selectedContent)=> `bx_block_catalogue/catalogues/sorting_via_images_videos?sort=${selectedContent}`;
exports.deletedSingleEndPoint = (selectedSingleContent) => `bx_block_catalogue/catalogues/destroy_catalogue?id=[${selectedSingleContent}]`
exports.topBannerPendingText = "Your pending items will be reviewed within 5 days.We will let you know when they've been reviewed.";
exports.categoryContentEndPoint = (selectedCategryContent) => `bx_block_catalogue/catalogues/order_by_new_old?sort=${selectedCategryContent}`;
exports.reviewContentEndPoint = (selectedReviewContent) => `bx_block_catalogue/catalogues/sort_via_reviewed?sort=${selectedReviewContent}`
exports.topBannerReviewedText = "Reviewed content will be displayed here for 21 days. Content that is approved will be made available for licensing based on your opt-in ";
exports.preference = "preference.";
exports.allCountryEndPoints= "bx_block_catalogue/catalogues/list_countries"
// Customizable Area End