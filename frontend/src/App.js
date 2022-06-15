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
import ReadingListScreen from './screens/ReadingListScreen'
import ReadingEditScreen from './screens/ReadingEditScreen'
import ReadingQuizScreen from './screens/ReadingQuizScreen'
import ClozetextScreen from './screens/Clozetext/ClozetextScreen'
import ClozetextListScreen from './screens/Clozetext/ClozetextListScreen'
import ClozetextEditScreen from './screens/Clozetext/ClozetextEditScreen'
import ClozetextQuizScreen from './screens/Clozetext/ClozetextQuizScreen'
import SignsScreen from './screens/Signs/SignsScreen'
import SignsListScreen from './screens/Signs/SignsListScreen'
import SignsEditScreen from './screens/Signs/SignsEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />

            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            {/* --- Grammar --- */}
            <Route path='/grammar' element={<GrammarScreen />} />
            <Route
              path='/grammar/page/:pageNumber'
              element={<GrammarScreen />}
            />
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
            <Route
              path='/admin/reading'
              element={<ReadingListScreen />}
              exact
            />
            <Route
              path='/admin/reading/page/:pageNumber'
              element={<ReadingListScreen />}
            />
            <Route
              path='/admin/reading/create'
              element={<ReadingEditScreen />}
              exact
            />
            <Route path='/admin/reading/:id' element={<ReadingEditScreen />} />
            <Route
              path='/admin/reading/search/:keyword'
              element={<ReadingListScreen />}
            />
            <Route
              path='/admin/reading/search/:keyword/page/:pageNumber'
              element={<ReadingListScreen />}
            />
            <Route
              path='/admin/reading/:readingId/question/:questionId'
              element={<ReadingQuizScreen />}
            />

            {/* Clozetext */}
            <Route path='/clozetext' element={<ClozetextScreen />} />
            <Route
              path='/clozetext/page/:pageNumber'
              element={<ClozetextScreen />}
            />
            <Route
              path='/admin/clozetext'
              element={<ClozetextListScreen />}
              exact
            />
            <Route
              path='/admin/clozetext/page/:pageNumber'
              element={<ClozetextListScreen />}
            />
            <Route
              path='/admin/clozetext/create'
              element={<ClozetextEditScreen />}
              exact
            />
            <Route
              path='/admin/clozetext/:id'
              element={<ClozetextEditScreen />}
            />
            <Route
              path='/admin/clozetext/:clozetextId/question/:questionId'
              element={<ClozetextQuizScreen />}
            />
            <Route
              path='/admin/clozetext/search/:keyword'
              element={<ClozetextListScreen />}
            />
            <Route
              path='/admin/clozetext/search/:keyword/page/:pageNumber'
              element={<ClozetextListScreen />}
            />

            {/* Signs */}
            <Route path='/signs' element={<SignsScreen />} exact />
            <Route path='/signs/page/:pageNumber' element={<SignsScreen />} />
            <Route path='/admin/signs' element={<SignsListScreen />} exact />
            <Route
              path='/admin/signs/page/:pageNumber'
              element={<SignsScreen />}
            />
            <Route
              path='/admin/signs/create'
              element={<SignsEditScreen />}
              exact
            />
            <Route path='/admin/signs/:id' element={<SignsEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
