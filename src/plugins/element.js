import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu,
  MenuItem, Submenu, MenuItemGroup, Breadcrumb, BreadcrumbItem, Card, Row, Col,
  Table, TableColumn, Pagination, Switch, Tooltip, Dialog, MessageBox, Tag
} from 'element-ui' // { }表示按需导入

// 只写这一行，不要下面的似乎不起作用
Vue.use(Button)
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
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
// Vue.use(MessageBox)错误的引用方法，导致刷新时一直出现messagebox
Vue.component(MessageBox.name, MessageBox) // 使用这种方法引用
// Message组件需要挂载到Vue原型对象上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
