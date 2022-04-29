import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import GrammarScreen from './screens/GrammarScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/Register'
import GrammarListScreen from './screens/GrammarListScreen'
import GrammarEditScreen from './screens/GrammarEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/grammar' element={<GrammarScreen />} />
            <Route
              path='/grammar/page/:pageNumber'
              element={<GrammarScreen />}
            />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/admin' element={<GrammarListScreen />} exact />
            <Route
              path='/admin/grammar/page/:pageNumber'
              element={<GrammarListScreen />}
            />
            <Route path='/admin/grammar/:id' element={<GrammarEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
