import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { HashRouter, Routes, Route } from "react-router-dom";
import PreLoginPage from './components/Prelogin';
import PreSignupPage from './components/Presignup';
import StuLogin from './components/StuLogin';
import CoLogin from './components/CoLogin';
import GuideLogin from './components/GuideLogin';
import StuSignup from './components/StuSignup';
import CoSignup from './components/Cosignup';
import GuideSignup from './components/GuideSignup';
import Review from './components/Review';
import Review1 from './components/Review1';
import Guide_review from './components/Guide_review';
import Review1_results from './components/Review1_results';
import Review2 from './components/Review2';
import Review2_results from './components/Review2_results';
import Review3 from './components/Review3';
import Coreview from './components/Coreview';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}><div>
   <HashRouter > 
 <Routes>
<Route path='/' element={ <Home/>}/>
<Route path='/stulogin' element={ <StuLogin/>}/>
<Route path='/cologin' element={ <CoLogin/>}/>
<Route path='/guidelogin' element={ <GuideLogin/>}/>
<Route path='/stusignup' element={ <StuSignup/>}/>
<Route path='/cosignup' element={ <CoSignup/>}/>
<Route path='/guidesignup' element={ <GuideSignup/>}/>
<Route path='/prelogin' element={ <PreLoginPage/>}/>
<Route path='/presignup' element={ <PreSignupPage/>}/>
<Route path='/review' element={ <Review/>}/>
<Route path='/review1' element={ <Review1/>}/>
<Route path='/review2' element={ <Review2/>}/>
<Route path='/review3' element={ <Review3/>}/>
<Route path='/review1_results' element={ <Review1_results/>}/>
<Route path='/review2_results' element={ <Review2_results/>}/>
<Route path='/guidereview' element={ <Guide_review/>}/>
<Route path='/coreview' element={ <Coreview/>}/>
</Routes>
<hr />
<Footer/>
</HashRouter> 
</div> 
</Provider>
  );
}

export default App;
