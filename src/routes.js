import React from 'react';
import EditProductPage from "./views/product/EditProductPage";
// import AllProduct from "./views/product/AllProduct";
// import AddProductPage from "./views/product/AddProductPage";
// import ProductType from "./views/master/ProductType";
// import AddProductType from "./views/master/AddProductType";

// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'));
//
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

// const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const AllProduct = React.lazy(() => import('./views/product/AllProduct'))
const MasterPage = React.lazy(() => import('./views/master/MasterPage'))
const AddProductType = React.lazy(() => import('./views/master/AddProductType'))
const AddProductCategory = React.lazy(() => import('./views/master/AddProductCategory'))
const AddProductBrand = React.lazy(() => import('./views/master/AddProductBrand'))
const AddProductPage = React.lazy(() => import('./views/product/AddProductPage'))
const AllComboProduct = React.lazy(() => import('./views/product/AllComboProduct'))
const AllDiscountProduct = React.lazy(() => import('./views/product/AllDiscountProduct'))

const AllTransactionPage = React.lazy(() => import('./views/transaction/AllTransactionPage'))
const DoneTransactionPage = React.lazy(() => import('./views/transaction/DoneTransactionPage'))
const InputResiPage = React.lazy(() => import('./views/transaction/InputResiPage'))
const NewOrderPage = React.lazy(() => import('./views/transaction/NewOrderPage'))
const OnDeliveryPage = React.lazy(()=>import('./views/transaction/OnDeliveryPage'))
const AllBannerPage = React.lazy(() => import('./views/banner/AllBannerPage'))
const routes = {
  admin:   [
    {path: '/', exact: true, name: 'Home'},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    // {path: '/theme', name: 'Theme', component: Colors, exact: true},
    // {path: '/theme/colors', name: 'Colors', component: Colors},
    // {path: '/theme/typography', name: 'Typography', component: Typography},
    // {path: '/base', name: 'Base', component: Cards, exact: true},
    // {path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs},
    // {path: '/base/cards', name: 'Cards', component: Cards},
    // {path: '/base/carousels', name: 'Carousel', component: Carousels},
    // {path: '/base/collapses', name: 'Collapse', component: Collapses},
    // {path: '/base/forms', name: 'Forms', component: BasicForms},
    // {path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons},
    // {path: '/base/list-groups', name: 'List Groups', component: ListGroups},
    // {path: '/base/navbars', name: 'Navbars', component: Navbars},
    // {path: '/base/navs', name: 'Navs', component: Navs},
    // {path: '/base/paginations', name: 'Paginations', component: Paginations},
    // {path: '/base/popovers', name: 'Popovers', component: Popovers},
    // {path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar},
    // {path: '/base/switches', name: 'Switches', component: Switches},
    // {path: '/base/tables', name: 'Tables', component: Tables},
    // {path: '/base/tabs', name: 'Tabs', component: Tabs},
    // {path: '/base/tooltips', name: 'Tooltips', component: Tooltips},
    // {path: '/buttons', name: 'Buttons', component: Buttons, exact: true},
    // {path: '/buttons/buttons', name: 'Buttons', component: Buttons},
    // {path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns},
    // {path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups},
    // {path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons},
    // {path: '/charts', name: 'Charts', component: Charts},
    // {path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons},
    // {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons},
    // {path: '/icons/flags', name: 'Flags', component: Flags},
    // {path: '/icons/brands', name: 'Brands', component: Brands},
    // {path: '/notifications', name: 'Notifications', component: Alerts, exact: true},
    // {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
    // {path: '/notifications/badges', name: 'Badges', component: Badges},
    // {path: '/notifications/modals', name: 'Modals', component: Modals},
    // {path: '/notifications/toaster', name: 'Toaster', component: Toaster},
    // {path: '/widgets', name: 'Widgets', component: Widgets},
    {path: '/users', exact: true, name: 'Users', component: Users},
    {path: '/users/:id', exact: true, name: 'User Details', component: User},
    {path: '/pusan/products', exact: true, name: 'Semua Produk', component: AllProduct},
    {path: '/pusan/products/discount', exact: true, name: 'Semua Diskon Produk', component: AllDiscountProduct},
    {path: '/pusan/products/combo', exact: true, name: 'Semua Combo Produk', component: AllComboProduct},
    {path: '/pusan/products/add', exact: true, name: 'Tambah Produk Baru', component: AddProductPage},
    {path: '/pusan/products/edit/:id', exact: true, name: 'Edit Produk Baru', component: EditProductPage},
    {path: '/master/all', exact: true, name: 'Master Produk', component: MasterPage},
    {path: '/master/product-type/add', exact: true, name: 'Tambah Jenis Produk', component: AddProductType},
    {path: '/master/product-category/add', exact: true, name: 'Tambah Jenis Produk', component: AddProductCategory},
    {path: '/master/product-brand/add', exact: true, name: 'Tambah Jenis Produk', component: AddProductBrand},
    {path: '/transaction/all', exact: true, name: 'Semua Transacksi', component: AllTransactionPage},
    {path: '/transaction/new', exact: true, name: 'Pesanan Baru', component: NewOrderPage},
    {path: '/transaction/done', exact: true, name: 'Transaksi Selesai', component: DoneTransactionPage},
    {path: '/transaction/ready', exact: true, name: 'Pesanan Diproses', component: InputResiPage},
    {path: '/transaction/on-delivery', exact: true, name: 'Dalam Pengiriman', component: OnDeliveryPage},
    {path: '/banner/all', exact: true, name: 'Semua Banner', component: AllBannerPage}
  ],
  sales: [
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/pusan/products', exact: true, name: 'Semua Produk', component: AllProduct},
    {path: '/transaction/all', exact: true, name: 'Semua Transacksi', component: AllTransactionPage},
    {path: '/transaction/new', exact: true, name: 'Pesanan Baru', component: NewOrderPage},
    {path: '/transaction/done', exact: true, name: 'Transaksi Selesai', component: DoneTransactionPage},
    // {path: '/transaction/ready', exact: true, name: 'Pesanan Diproses', component: InputResiPage},
  ],
  gudang: [
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/pusan/products', exact: true, name: 'Semua Produk', component: AllProduct},
    {path: '/transaction/ready', exact: true, name: 'Pesanan Diproses', component: InputResiPage},
  ]

}

export default routes;
