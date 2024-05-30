import CategoriesList from "../Components/CategoryComponents/CategoriesList";
import Admin from "../Components/SettingComponents/Admin";
import Default from "../Components/SettingComponents/Default";
import EditProduct from "../Components/ProductComponents/EditProduct";
import General from "../Components/SettingComponents/General";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import ProductsList from "../Components/ProductComponents/ProductsList";
import OrdersList from "../Components/OrderComponents/OrdersList";
import EditOrder from "../Components/OrderComponents/EditOrder";
import CustomersList from "../Components/CustomerComponents/CustomersList";
import Customer from "../Components/CustomerComponents/Customer";
import AddCategory from "../Components/CategoryComponents/AddCategory";
import EditCategory from "../Components/CategoryComponents/EditCategory";
import AddProducts from "../Components/ProductComponents/AddProducts";
import PrivacyPolicy from "../Components/PagesComponent/PrivacyPolicy";
import TermsConditions from "../Components/PagesComponent/TermsConditions";
import FAQ from "../Components/PagesComponent/FAQ";
import Testimonials from "../Components/PagesComponent/Testimonials";
import ShippingPolicy from "../Components/PagesComponent/ShippingPolicy";
import RefundPolicy from "../Components/PagesComponent/RefundPolicy";
import DoctorsList from "../Components/DoctorComponents/DoctorsList";
import AddDoctor from "../Components/DoctorComponents/AddDoctor";
import EditDoctor from "../Components/DoctorComponents/EditDoctor";
import CouponList from "../Components/CouponComponents/CouponList";
import EditCoupon from "../Components/CouponComponents/EditCoupon";
import AddCoupon from "../Components/CouponComponents/AddCoupon";
import CaseStudy from "../Components/PagesComponent/CaseStudy";
import ExploreList from "../Components/ExploreComponent/ExploreList";
import EditExplore from "../Components/ExploreComponent/EditExplore";
import AddExplore from "../Components/ExploreComponent/AddExplore";
import SkinocareJourney from "../Components/PagesComponent/SkinocareJourney";
import SkinAndHair from "../Components/PagesComponent/SkinAndHair";
import FeedbackList from "../Components/FeedbackComponents/FeedbackList";
import EditFeedback from "../Components/FeedbackComponents/EditFeedback";
import Referral from "../Components/SettingComponents/Referral";
import ClearDoubts from "../Components/ClearDoubtsComponents/ClearDoubts";

// ----------------------------------DOCTORS PANEL COMPONENTS--------------------------------------
import Designations from "../DoctorComponents/Designation";
import Add from "../DoctorComponents/Doctors/Add";
import Edit from "../DoctorComponents/Doctors/Edit";
import List from "../DoctorComponents/Doctors/List";
import Symptoms from "../DoctorComponents/Regimen/Symptoms";
import Kits from "../DoctorComponents/Regimen/Kits";
import Plan from "../DoctorComponents/Regimen/Plan";
import Notification from "../Components/PagesComponent/Notification";
import UserList from "../Components/UsersComponents/UserList";
import AddUsers from "../Components/UsersComponents/AddUsers";
import EditUsers from "../Components/UsersComponents/EditUsers";
import RequestList from "../Components/RequestList/RequestList";
import BetHistory from "../Components/BetHistoryComponents/BetHistory";
import EditBalance from "../Components/UsersComponents/EditBalance";
import SegmentList from "../Components/SegmentComponents/SegmentList";
import AddSegment from "../Components/SegmentComponents/AddSegment";
import EditSegment from "../Components/SegmentComponents/EditSegment";
// import TransactionList from "../Components/UsersComponents/TransactionList";

export const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    route: "/orders",
    component: <OrdersList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ClearDoubts",
    key: "cleardoubts",
    route: "/clear-doubts",
    component: <ClearDoubts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Doctors",
    key: "doctors",
    route: "/doctors",
    component: <DoctorsList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "doctor",
    key: "doctor",
    route: "/doctors/doctor/:id",
    component: <EditDoctor />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddDoctors",
    key: "adddoctors",
    route: "/doctors/doctor",
    component: <AddDoctor />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Coupons",
    key: "coupons",
    route: "/coupons",
    component: <CouponList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "coupon",
    key: "coupon",
    route: "/coupons/coupon/:id",
    component: <EditCoupon />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddCoupons",
    key: "addcoupons",
    route: "/coupons/coupon",
    component: <AddCoupon />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedbacks",
    key: "feedbacks",
    route: "/feedbacks",
    component: <FeedbackList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "feedback",
    route: "/feedbacks/feedback/:id",
    component: <EditFeedback />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Explores",
    key: "explores",
    route: "/explores",
    component: <ExploreList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "explore",
    key: "explore",
    route: "/explores/explore/:id",
    component: <EditExplore />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddExplores",
    key: "addexplores",
    route: "/explores/explore",
    component: <AddExplore />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Order",
    key: "order",
    route: "/orders/order/:id",
    component: <EditOrder />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    component: <CustomersList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    route: "/customers/customer/:id",
    component: <Customer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Testimonials",
    key: "testimonials",
    route: "/testimonials",
    component: <Testimonials />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "FAQ",
    key: "faq",
    route: "/faq",
    component: <FAQ />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Skin O Care Journey",
    key: "skinocare-journey",
    route: "/skinocare-journey",
    component: <SkinocareJourney />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Skin & Hair",
    key: "skin&hair",
    route: "/skin&hair",
    component: <SkinAndHair />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CaseStudy",
    key: "casestudy",
    route: "/casestudy",
    component: <CaseStudy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notification",
    key: "notification",
    route: "/notification",
    component: <Notification />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Privacy",
    key: "privacy",
    route: "/privacy-policy",
    component: <PrivacyPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TermsConditions",
    key: "TermsConditions",
    route: "/terms-&-conditions",
    component: <TermsConditions />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ShippingPolicy",
    key: "ShippingPolicy",
    route: "/shipping-policy",
    component: <ShippingPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RefundPolicy",
    key: "RefundPolicy",
    route: "/refund-policy",
    component: <RefundPolicy />,
    noCollapse: true,
  },

  // ------------------------------------------DOCTORS PANEL ROUTES-----------------------------

  {
    type: "collapse",
    name: "Designations",
    key: "designations",
    route: "/doctors-panel/docs-designation",
    component: <Designations />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Doctor's List",
    key: "doctors-panel",
    route: "/doctors-panel/doctors",
    component: <List />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Add Doctor",
    key: "add-doctor",
    route: "/doctors-panel/add-doctor",
    component: <Add />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Update Doctor",
    key: "update-doctor",
    route: "/doctors-panel/update-doctor/:id",
    component: <Edit />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Symptoms",
    key: "symptoms",
    route: "/doctors-panel/regimen/symptoms",
    component: <Symptoms />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kits",
    key: "kits",
    route: "/doctors-panel/regimen/kits",
    component: <Kits />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Plan",
    key: "plan",
    route: "/doctors-panel/regimen/plan",
    component: <Plan />,
    noCollapse: true,
  },

  // ------------------------------------------GAMLEWALA PANEL ROUTES-----------------------------
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    route: "/settings",
    component: <Settings />,
    noCollapse: true,
    collapse: [
      // {
      //   type: "collapse",
      //   name: "Settings",
      //   key: "general",
      //   route: "/settings/general",
      //   component: <General />,
      //   noCollapse: true,
      // },
      {
        type: "collapse",
        name: "Admin Setings",
        key: "admin",
        route: "/settings/admin",
        component: <Admin />,
        noCollapse: true,
      },
      // {
      //   type: "collapse",
      //   name: "Referral Amount",
      //   key: "referralamount",
      //   route: "/settings/referral_amount",
      //   component: <Referral />,
      //   noCollapse: true,
      // },
      {
        type: "collapse",
        name: "Default Settings",
        key: "defaultSettings",
        route: "/settings/*",
        component: <Default />,
        noCollapse: true,
      },
    ],
  }, 
  // {
  //   type: "collapse",
  //   name: "RequestList",
  //   key: "requestList",
  //   route: "/requestList",
  //   component: <RequestList />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "BetHistory",
  //   key: "bethistory",
  //   route: "/bet-history",
  //   component: <BetHistory />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    component: <UserList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddUsers",
    key: "adduser",
    route: "/users/user",
    component: <AddUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditUser",
    key: "edituser",
    route: "/users/user/:id",
    component: <EditUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Segments",
    key: "segments",
    route: "/segments",
    component: <SegmentList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddSegment",
    key: "addsegment",
    route: "/segments/segment",
    component: <AddSegment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditSegment",
    key: "editsegment",
    route: "/segments/segment/:id",
    component: <EditSegment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    route: "/categories",
    component: <CategoriesList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddCategory",
    key: "addcategory",
    route: "/categories/category",
    component: <AddCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditCategory",
    key: "editcategory",
    route: "/categories/category/:id",
    component: <EditCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: "/products",
    component: <ProductsList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    route: "/products/product",
    component: <AddProducts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    route: "/products/product/:id",
    component: <EditProduct />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "EditBalance",
  //   key: "editbalance",
  //   route: "/users/debit-credit/:id",
  //   component: <EditBalance />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "TransactionList",
  //   key: "transactionList",
  //   route: "/users/credit-debit-list",
  //   component: <TransactionList />,
  //   noCollapse: true,
  // },
];

export const defaultRoute = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
];
