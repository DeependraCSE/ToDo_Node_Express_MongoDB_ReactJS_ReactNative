import { BrowserRouter,Routes, Route, Navigate, Outlet } from "react-router-dom";
import React, { Suspense} from "react";
import { Loading } from "../component/commonComonent";
import ProtectedRoute from "../component/protectedRoute";
import { ForgotPassword, Login, Register, Dashboard, ChangePassword, About, Company, Contact, 
    Features, Marketplace, Services, Profile, Setting, TaskList, Task, Logout, DeleteProfile} from "./path";
import Header from "../component/header";
import Footer from "../component/footer";

const AppMainRoute = () => {
    const LoginLazy = React.lazy(()=>import('../screens/user/login'))
    const RegisterLazy = React.lazy(()=>import('../screens/user/register'))
    const ForgotPasswordLazy = React.lazy(()=>import('../screens/user/forgotPassword'))
    const DashboardLazy = React.lazy(()=>import('../screens/user/dashboard'))
    const ProfileLazy = React.lazy(()=>import('../screens/user/profile'))
    const SettingLazy = React.lazy(()=>import('../screens/user/setting'))
    const ChangePasswordLazy = React.lazy(()=>import('../screens/user/changepassword'))
    const LogoutLazy = React.lazy(()=>import('../screens/user/logout'))
    const DeleteProfileLazy = React.lazy(()=>import('../screens/user/deleteProfile'))

    const AboutLazy = React.lazy(()=>import('../screens/company/about'))
    const CompanyLazy = React.lazy(()=>import('../screens/company/company'))
    const ContactLazy = React.lazy(()=>import('../screens/company/contact'))
    const FeaturesLazy = React.lazy(()=>import('../screens/company/features'))
    const MarketplaceLazy = React.lazy(()=>import('../screens/company/marketplace'))
    const ServicesLazy = React.lazy(()=>import('../screens/company/services'))

    const TaskListLazy = React.lazy(()=>import('../screens/task/taskList'))
    const TaskLazy = React.lazy(()=>import('../screens/task/task'))

    // Layout for authentication pages
    const AuthLayout = () => (
    <div>
        <Outlet />
    </div>
    );

    // Layout for protected application pages
    const AppLayout = () => (
    <div>
        <Header />
            <ProtectedRoute>
                <Outlet />
            </ProtectedRoute>
        <Footer />
    </div>
    );

    return(
        <div>
            <BrowserRouter>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route element={<AuthLayout/>}>
                            <Route path={Login} element={<LoginLazy/>} />
                            <Route path={Register} element={<RegisterLazy/>} />
                            <Route path={ForgotPassword} element={<ForgotPasswordLazy/>} />
                            <Route path={Logout} element={<LogoutLazy/>}/>
                        </Route>

                        {/* login required */}
                        {/* company */}
                        <Route element={<AppLayout/>}>
                            <Route path={Dashboard} element={<DashboardLazy/>} />
                            <Route path={About} element={<AboutLazy/>} />
                            <Route path={Company} element={<CompanyLazy/>} />
                            <Route path={Contact} element={<ContactLazy/>} />
                            <Route path={Features} element={<FeaturesLazy/>} />
                            <Route path={Marketplace} element={<MarketplaceLazy/>} />
                            <Route path={Services} element={<ServicesLazy/>} />
                            
                            
                            <Route path={Profile} element={<ProfileLazy/>} />
                            <Route path={ChangePassword} element={<ChangePasswordLazy/>} />
                            <Route path={Setting} element={<SettingLazy/>} />
                            <Route path={DeleteProfile} element={<DeleteProfileLazy/>}/>

                            {/* task */}
                            <Route path={TaskList} element={<TaskListLazy/>} />
                            <Route path={Task} element={<TaskLazy/>} />
                        </Route>
                        <Route path="*" element={<Navigate to={Login} replace />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}
export default AppMainRoute