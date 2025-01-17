// filepath: /d:/GithubReps/infodev/ui/src/layouts/MainLayout.tsx
import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;