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
import ReadingScreen from './screens/ReadingScreen'

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
            <Route
              path='/admin/grammar'
              element={<GrammarListScreen />}
              exact
            />
            <Route
              path='/admin/grammar/page/:pageNumber'
              element={<GrammarListScreen />}
            />
            <Route
              path='/admin/grammar/create'
              element={<GrammarEditScreen />}
            />
            <Route path='/admin/grammar/:id' element={<GrammarEditScreen />} />
            <Route
              path='/admin/grammar/search/:keyword'
              element={<GrammarListScreen />}
            />
            <Route
              path='/admin/grammar/search/:keyword/page/:pageNumber'
              element={<GrammarListScreen />}
            />

            {/* --- Reading --- */}
            <Route path='/reading' element={<ReadingScreen />} />
            <Route
              path='/reading/page/:pageNumber'
              element={<ReadingScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
