import { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from './layouts';
// import { AuthContext } from '~/components/AuthProvider/index.jsx';

// function PrivateRoute({ children }) {
//     const navigate = useNavigate();
//     const { isLoggedIn, isLoading } = useContext(AuthContext);

//     useEffect(() => {
//         if (!isLoading) {
//             const checkTimeout = setTimeout(() => {
//                 if (!isLoggedIn) {
//                     navigate('/login');
//                 }
//             }, 1000);

//             return () => clearTimeout(checkTimeout);
//         }
//     }, [isLoggedIn, navigate, isLoading]);

//     if (isLoading) {
//         return null;
//     }

//     return isLoggedIn ? children : null;
// }

function App() {
    //const { isLoggedIn, isLoading } = useContext(AuthContext);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        // Render privateRoutes
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <PrivateRoute>
                                            <Page />
                                        </PrivateRoute>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;