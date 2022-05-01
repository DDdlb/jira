import React from "react";
import {Link} from 'react-router-dom'
import { BoardScreen } from "screen/board";
import { Route, Routes, Navigate } from "react-router";
import { EpicScreen } from "screen/epic";

export const ProjectScreen = ()=>{
    return <div>
        <h1>Projects</h1>
        <Link to={'board'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            <Route path={'/board'} element={<BoardScreen />} />
            <Route path={'/epic'} element={<EpicScreen />} />
            <Route path={'*'} element={<Navigate to={window.location.pathname + '/board'} />}></Route>
        </Routes>
    </div>
}