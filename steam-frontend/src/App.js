import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import EldenRing from "./components/EldenRing";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import Users from "./Users";
import Games from "./Games"
import Purchases from "./Purchases";
import BlackMythWukong from "./components/BlackMythWukong";
import DragonsDogma2 from "./components/DragonsDogma2"
import Starfield from "./components/Starfield";
import DoomEternal from "./components/DoomEternal";
import GodOfWar from "./components/GodOfWar";
import ResidentEvil4 from "./components/ResidentEvil4";
import Sekiro from "./components/Sekiro";
import Witcher3 from "./components/Witcher3";
import Skyrim from "./components/Skyrim";
import MW3 from "./components/MW3";
import Cyberpunk2077 from "./components/Cyberpunk2077";
import CounterStrike2 from "./components/CounterStrike2";
import ApexLegends from "./components/ApexLegends";
import PUBG from "./components/PUBG";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />

                <Route path="/purchases" element={<Purchases/>} />
                <Route path="/games" element={<Games/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/elden-ring" element={<EldenRing />} />
                <Route path="/cyberpunk" element={<h1>Cyberpunk 2077 страница</h1>} />
                <Route path="/cs2" element={<h1>Counter-Strike 2 страница</h1>} />
                <Route path="/users" element={<Users />} />
              <  Route path="/black-myth-wukong" element={<BlackMythWukong />} />
                <Route path="/dragons-dogma-2" element={<DragonsDogma2 />} />
                <Route path="/starfield" element={<Starfield />} />
                <Route path="/doom-eternal" element={<DoomEternal />} />
                <Route path="/god-of-war" element={<GodOfWar />} />
                <Route path="/resident-evil-4" element={<ResidentEvil4 />} />
                <Route path="/sekiro" element={<Sekiro />} />
                <Route path="/witcher-3" element={<Witcher3 />} />
                <Route path="/skyrim" element={<Skyrim />} />
                <Route path="/mw3" element={<MW3/>} />
                <Route path="/cyberpunk-2077" element={<Cyberpunk2077 />} />
                <Route path="/counter-strike-2" element={<CounterStrike2 />} />
                <Route path="/apex-legends" element={<ApexLegends />} />
                <Route path="/pubg" element={<PUBG />} />
            </Routes>
        </Router>
    );
}

export default App;
