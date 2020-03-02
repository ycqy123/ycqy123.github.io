const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  dislay_name: state => state.user.dislay_name,
  merchant_name: state => state.user.merchant_name,
  mobile_number: state => state.user.mobile_number,
  is_active: state => state.user.is_active,
  department_name: state => state.user.department_name,
  permissions: state => state.user.permissions,
  role: state => state.user.role
}
export default getters
