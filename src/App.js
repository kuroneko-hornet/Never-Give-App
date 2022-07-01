import { AuthProvider } from './providers/AuthProvider';
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Router from './components/Router';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Router />
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
