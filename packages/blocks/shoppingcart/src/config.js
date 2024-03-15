Object.defineProperty(exports, '__esModule', {
    value: true
  })
  
  // Customizable Area Start
  exports.apiContentType = 'application/json'
  exports.getApiMethod = 'GET'
  exports.postApiMethod = 'POST'
  exports.deleteApiMethod = 'DELETE'
  exports.updateApiPutMethod = 'PUT'
  
  exports.getOrdersApiEndPoint = 'shopping_cart/orders'
  exports.createOrderItemApiEndPoint = 'shopping_cart/order_items'
  exports.getOrdersListApiEndPoint = 'bx_block_shopping_cart/orders/get_order_items'
  exports.deleteOrderItemApiEndPoint = 'shopping_cart/orders'
  exports.deleteOrderItemApiEndPointWeb = 'bx_block_shopping_cart/orders/remove_item'
  
  exports.getCouponApiEndPoint = '/bx_block_coupon_cg/coupon_codes'
  exports.postValidCouponCodeApiEndPoint="bx_block_coupon_cg/coupon_codes/check_coupon"
  exports.getContentFormatApiEndPoint = "bx_block_catalogue/catalogues/get_format"
  exports.getLicenseTypeApiEndPoint = "bx_block_catalogue/catalogues/get_license_type"
  exports.getContentSizeApiEndPoint = "bx_block_catalogue/catalogues/get_size"
  exports.updateOrderItemFormatApiEndPoint = "bx_block_shopping_cart/orders/order_item_update"
  exports.getCountryListApiEndPoint = "bx_block_catalogue/catalogues/list_countries"
  exports.getStateListApiEndPoint = "bx_block_shopping_cart/orders/states_name"
  exports.getDiscountedPriceApiEndPoint = "bx_block_shopping_cart/orders/discounted_order_price"
  
  exports.errorTitle = 'Error'
  exports.CountryOption=[
    { label: 'India', value: 'India' },
    { label: 'China', value: 'China' },
    { label: 'Japan', value:  'Japan' },
  ];
  exports.CancelItem="NO,KEEP"
  exports.DeleteItemBtn="YES,REMOVE"
  exports.DeleteTitle="Are you sure want to remove this item from cart?"
  exports.errorAllFieldsAreMandatory = 'All fields are mandatory.'
  // Customizable Area End
  