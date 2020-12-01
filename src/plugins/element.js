import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu,
  MenuItem, Submenu, MenuItemGroup, Breadcrumb, BreadcrumbItem, Card, Row, Col,
  Table, TableColumn, Pagination
} from 'element-ui' // { }表示按需导入

// 只写这一行，不要下面的似乎不起作用
Vue.use(Button, Form, FormItem, Input, Message)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
// Message组件需要挂载到Vue原型对象上
Vue.prototype.$message = Message
