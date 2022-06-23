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
import TransformScreen from './screens/Transform/TransformScreen'
import TransformListScreen from './screens/Transform/TransformListScreen'
import TransformEditScreen from './screens/Transform/TransformEditScreen'

import SpeechToTextScreen from './screens/Speaking/SpeechToTextScreen'
import ListeningListScreen from './screens/Listening/ListeningListScreen'
import ListeningEditScreen from './screens/Listening/ListeningEditScreen'
import ListeningQuizScreen from './screens/Listening/ListeningQuizScreen'
import ListeningScreen from './screens/Listening/ListeningScreen'
import SpeakingListScreen from './screens/Speaking/SpeakingListScreen'
import SpeakingEditScreen from './screens/Speaking/SpeakingEditScreen'
import SpeakingScreen from './screens/Speaking/SpeakingScreen'
import WritingScreen from './screens/Writing/WritingScreen'
import WritingListScreen from './screens/Writing/WritingListScreen'
import WritingEditScreen from './screens/Writing/WritingEditScreen'

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

            {/* Transform */}
            <Route path='/transform' element={<TransformScreen />} exact />
            <Route
              path='/transform/page/:pageNumber'
              element={<TransformScreen />}
            />
            <Route
              path='/admin/transform'
              element={<TransformListScreen />}
              exact
            />
            <Route
              path='/admin/transform/page/:pageNumber'
              element={<TransformListScreen />}
            />
            <Route
              path='/admin/transform/search/:keyword'
              element={<TransformListScreen />}
            />
            <Route
              path='/admin/transform/search/:keyword/page/:pageNumber'
              element={<TransformListScreen />}
            />
            <Route
              path='/admin/transform/create'
              element={<TransformEditScreen />}
              exact
            />
            <Route
              path='/admin/transform/:id'
              element={<TransformEditScreen />}
            />

            {/* Listening */}
            <Route path='/listening' element={<ListeningScreen />} />
            <Route
              path='/listening/page/:pageNumber'
              element={<ListeningScreen />}
            />
            <Route
              path='/admin/listening'
              element={<ListeningListScreen />}
              exact
            />
            <Route
              path='/admin/listening/page/:pageNumber'
              element={<ListeningListScreen />}
            />
            <Route
              path='/admin/listening/create'
              element={<ListeningEditScreen />}
              exact
            />
            <Route
              path='/admin/listening/:id'
              element={<ListeningEditScreen />}
            />
            <Route
              path='/admin/listening/:listeningId/question/:questionId'
              element={<ListeningQuizScreen />}
            />
            <Route
              path='/admin/listening/search/:keyword'
              element={<ListeningListScreen />}
            />
            <Route
              path='/admin/listening/search/:keyword/page/:pageNumber'
              element={<ListeningListScreen />}
            />

            {/* Speaking */}
            <Route path='/speaking' element={<SpeakingScreen />} />
            <Route
              path='/speaking/page/:pageNumber'
              element={<SpeakingScreen />}
            />
            <Route
              path='/admin/speaking'
              element={<SpeakingListScreen />}
              exact
            />
            <Route
              path='/admin/speaking/page/:pageNumber'
              element={<SpeakingListScreen />}
            />
            <Route
              path='/admin/speaking/create'
              element={<SpeakingEditScreen />}
              exact
            />
            <Route
              path='/admin/speaking/:id'
              element={<SpeakingEditScreen />}
            />
            <Route
              path='/admin/speaking/search/:keyword'
              element={<SpeakingListScreen />}
            />
            <Route
              path='/admin/speaking/search/:keyword/page/:pageNumber'
              element={<SpeakingListScreen />}
            />
            <Route
              path='/speaking/speechtotext'
              element={<SpeechToTextScreen />}
            />

            {/* Writing */}
            <Route path='/writing' element={<WritingScreen />} />
            <Route
              path='/writing/page/:pageNumber'
              element={<WritingScreen />}
            />
            <Route
              path='/admin/writing'
              element={<WritingListScreen />}
              exact
            />
            <Route
              path='/admin/writing/page/:pageNumber'
              element={<WritingListScreen />}
            />
            <Route
              path='/admin/writing/create'
              element={<WritingEditScreen />}
              exact
            />
            <Route path='/admin/writing/:id' element={<WritingEditScreen />} />
            <Route
              path='/admin/writing/search/:keyword'
              element={<WritingListScreen />}
            />
            <Route
              path='/admin/writing/search/:keyword/page/:pageNumber'
              element={<WritingListScreen />}
            />

            {/* DemoSpeak */}
            {/* <Route path='/speaking' element={<SpeechToText />} /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
