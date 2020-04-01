import React from 'react';
import {HashRouter,Route,Redirect} from 'react-router-dom'
import Admin from './page/Admin'
import Login from './page/Login'
import Home from './page/Home'
import City from './page/City'
// import City from './components/Table'
import Order from './page/Order'
import User from './page/User'
import Permission from './page/Permission'


function App() {
  return (
    <HashRouter>
      {/* <Redirect exact from='/' to='/login' /> */}
      <Redirect exact from='/' to='/admin' />
      {/* 登录 */}
      <Route path='/login' component={Login} />
      {/* admin */}
      <Route path='/admin' render={()=>{
        return(
          <Admin>
            <Route path='/admin/home' component={Home} />
            {/* 城市管理 */}
            <Route path='/admin/city' component={City} />
            {/* 订单管理 */}
            <Route path='/admin/order' component={Order} />
            {/* 员工管理 */}
            <Route path='/admin/user' component={User} />
             {/* 权限设置 */}
             <Route path='/admin/permission' component={Permission} />
          </Admin>
        ) 
      }} />
     
    </HashRouter>
  );
}

export default App;
